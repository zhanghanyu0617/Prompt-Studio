import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

// 生成易支付签名
function generateSign(params: Record<string, string>, key: string): string {
  const filtered = Object.entries(params)
    .filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
  
  const signStr = filtered.map(([k, v]) => `${k}=${v}`).join('&') + key
  return crypto.createHash('md5').update(signStr).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { plan_id, plan_name, amount, credits } = await request.json()

    // 获取当前用户
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 验证参数
    if (!plan_id || !plan_name || !amount || !credits) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    // 生成订单号
    const outTradeNo = `PS${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    
    // 创建本地订单
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_no: outTradeNo,
        plan_id,
        plan_name,
        amount: parseFloat(amount.toString()),
        credits: parseInt(credits.toString()),
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Create order error:', orderError)
      return NextResponse.json({ error: '创建订单失败' }, { status: 500 })
    }

    // 调用易支付接口
    const merchantId = process.env.PAYMENT_MERCHANT_ID!
    const merchantKey = process.env.PAYMENT_MERCHANT_KEY!
    const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/notify`
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`

    // 构建支付参数
    const paymentParams: Record<string, string> = {
      pid: merchantId,
      type: 'alipay',
      out_trade_no: outTradeNo,
      name: plan_name,
      money: amount.toString(),
      notify_url: notifyUrl,
      return_url: returnUrl,
    }

    // 生成签名
    const sign = generateSign(paymentParams, merchantKey)
    
    // 构建支付URL
    const paymentUrl = new URL('https://pay.mx88.top/submit.php')
    Object.entries(paymentParams).forEach(([key, value]) => {
      paymentUrl.searchParams.append(key, value)
    })
    paymentUrl.searchParams.append('sign', sign)
    paymentUrl.searchParams.append('sign_type', 'MD5')

    return NextResponse.json({
      success: true,
      payment_url: paymentUrl.toString(),
      order_id: order.id,
      order_no: outTradeNo,
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

// 验证易支付签名
function verifySign(params: Record<string, string>, key: string): boolean {
  const sign = params.get('sign')
  if (!sign) return false

  // 过滤掉 sign 和 sign_type
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([k]) => k !== 'sign' && k !== 'sign_type')
  )

  // 按key排序
  const sorted = Object.keys(filtered).sort().map(k => `${k}=${filtered[k]}`).join('&')
  const signStr = sorted + key
  
  const expectedSign = crypto.createHash('md5').update(signStr).digest('hex')
  return sign === expectedSign
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    // 获取支付通知参数
    const outTradeNo = params.get('out_trade_no')
    const tradeNo = params.get('trade_no')
    const tradeStatus = params.get('trade_status')
    const amount = params.get('amount')
    const sign = params.get('sign')

    console.log('Payment notification received:', { outTradeNo, tradeNo, tradeStatus, amount })

    // 验证必要参数
    if (!outTradeNo || !tradeNo || !tradeStatus || !amount) {
      console.error('Missing required parameters')
      return NextResponse.json('fail')
    }

    // 验证签名
    const merchantKey = process.env.PAYMENT_MERCHANT_KEY!
    if (!verifySign(params, merchantKey)) {
      console.error('Invalid sign')
      return NextResponse.json('fail')
    }

    // 幂等性检查：查询订单是否已处理
    const { data: existingOrder, error: queryError } = await supabaseAdmin
      .from('orders')
      .select('id, status, credits')
      .eq('order_no', outTradeNo)
      .single()

    if (queryError || !existingOrder) {
      console.error('Order not found:', outTradeNo)
      return NextResponse.json('fail')
    }

    // 如果订单已处理成功，直接返回 success
    if (existingOrder.status === 'paid') {
      console.log('Order already processed:', outTradeNo)
      return NextResponse.json('success')
    }

    // 检查支付状态
    if (tradeStatus !== 'TRADE_SUCCESS' && tradeStatus !== 'TRADE_FINISHED') {
      console.log('Payment not successful:', tradeStatus)
      return NextResponse.json('success')
    }

    // 开启事务处理
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        trade_no: tradeNo,
        paid_at: new Date().toISOString(),
        amount: parseFloat(amount),
      })
      .eq('id', existingOrder.id)

    if (updateError) {
      console.error('Update order error:', updateError)
      return NextResponse.json('fail')
    }

    // 获取订单信息
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('user_id, credits, plan_id')
      .eq('id', existingOrder.id)
      .single()

    if (orderError || !order) {
      console.error('Get order error:', orderError)
      return NextResponse.json('fail')
    }

    // 添加用户额度
    const { error: quotaError } = await supabaseAdmin.rpc('add_credits', {
      p_user_id: order.user_id,
      p_credits: order.credits,
    })

    if (quotaError) {
      console.error('Add credits error:', quotaError)
      // 回滚订单状态
      await supabaseAdmin
        .from('orders')
        .update({ status: 'pending' })
        .eq('id', existingOrder.id)
      return NextResponse.json('fail')
    }

    // 记录支付流水
    const { error: paymentError } = await supabaseAdmin
      .from('payment_transactions')
      .insert({
        order_id: existingOrder.id,
        trade_no: tradeNo,
        amount: parseFloat(amount),
        status: 'success',
        payment_method: 'alipay',
        paid_at: new Date().toISOString(),
      })

    if (paymentError) {
      console.error('Record payment error:', paymentError)
    }

    console.log('Payment processed successfully:', outTradeNo)
    return NextResponse.json('success')

  } catch (error) {
    console.error('Payment notify error:', error)
    return NextResponse.json('fail')
  }
}

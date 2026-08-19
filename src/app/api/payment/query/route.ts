import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')
    const orderNo = searchParams.get('order_no')

    if (!orderId && !orderNo) {
      return NextResponse.json({ error: '缺少订单参数' }, { status: 400 })
    }

    // 查询订单
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .or(`id.eq.${orderId},order_no.eq.${orderNo}`)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    // 查询支付流水
    const { data: transactions, error: txError } = await supabaseAdmin
      .from('payment_transactions')
      .select('*')
      .eq('order_id', order.id)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      success: true,
      order,
      transactions: txError ? [] : transactions,
    })

  } catch (error) {
    console.error('Query order error:', error)
    return NextResponse.json(
      { error: '查询订单失败' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''
    const search = searchParams.get('search') || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('orders')
      .select('*, users(email, nickname)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    // 状态筛选
    if (status) {
      query = query.eq('status', status)
    }

    // 搜索
    if (search) {
      query = query.or(`order_no.ilike.%${search}%,plan_name.ilike.%${search}%`)
    }

    const { data: orders, error: ordersError, count } = await query

    if (ordersError) throw ordersError

    // 格式化数据
    const formattedOrders = (orders || []).map(order => ({
      ...order,
      user_email: order.users?.email || '未知',
      user_nickname: order.users?.nickname || '未知',
    }))

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })

  } catch (error) {
    console.error('Orders error:', error)
    return NextResponse.json(
      { error: '获取订单列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'refund':
        // 退款
        const { error: refundError } = await supabaseAdmin
          .from('orders')
          .update({
            status: 'refunded',
            paid_at: new Date().toISOString(),
          })
          .eq('id', data.order_id)

        if (refundError) throw refundError

        // 获取订单信息
        const { data: order } = await supabaseAdmin
          .from('orders')
          .select('user_id, credits')
          .eq('id', data.order_id)
          .single()

        if (order) {
          // 扣减额度
          await supabaseAdmin.rpc('consume_text_quota', {
            p_user_id: order.user_id,
            p_amount: Math.floor(order.credits * 0.6),
          })

          await supabaseAdmin.rpc('consume_image_quota', {
            p_user_id: order.user_id,
            p_amount: Math.floor(order.credits * 0.3),
          })

          await supabaseAdmin.rpc('consume_video_quota', {
            p_user_id: order.user_id,
            p_amount: Math.ceil(order.credits * 0.1),
          })
        }

        return NextResponse.json({ success: true, message: '退款成功' })

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }

  } catch (error) {
    console.error('Order action error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

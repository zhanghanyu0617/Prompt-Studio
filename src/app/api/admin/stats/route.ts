import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // 获取用户总数
    const { count: totalUsers, error: userError } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (userError) throw userError

    // 获取图片生成总数
    const { count: totalImages, error: imageError } = await supabaseAdmin
      .from('generation_records')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'image')

    if (imageError) throw imageError

    // 获取视频生成总数
    const { count: totalVideos, error: videoError } = await supabaseAdmin
      .from('generation_records')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'video')

    if (videoError) throw videoError

    // 获取订单总数
    const { count: totalOrders, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })

    if (orderError) throw orderError

    // 获取总收入
    const { data: revenueData, error: revenueError } = await supabaseAdmin
      .from('orders')
      .select('amount')
      .eq('status', 'paid')

    if (revenueError) throw revenueError

    const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.amount), 0) || 0

    // 获取今日数据
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString()

    const { count: todayUsers } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStr)

    const { count: todayOrders } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid')
      .gte('created_at', todayStr)

    const { data: todayRevenueData } = await supabaseAdmin
      .from('orders')
      .select('amount')
      .eq('status', 'paid')
      .gte('created_at', todayStr)

    const todayRevenue = todayRevenueData?.reduce((sum, order) => sum + Number(order.amount), 0) || 0

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: totalUsers || 0,
        totalImages: totalImages || 0,
        totalVideos: totalVideos || 0,
        totalOrders: totalOrders || 0,
        totalRevenue,
        todayUsers: todayUsers || 0,
        todayOrders: todayOrders || 0,
        todayRevenue,
      },
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: '获取统计数据失败' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    // 构建查询
    let query = supabaseAdmin
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    // 搜索
    if (search) {
      query = query.or(`email.ilike.%${search}%,nickname.ilike.%${search}%`)
    }

    // 角色筛选
    if (role) {
      query = query.eq('role', role)
    }

    const { data: users, error: usersError, count } = await query

    if (usersError) throw usersError

    // 获取每个用户的额度和订单数
    const usersWithStats = await Promise.all(
      (users || []).map(async (user) => {
        // 获取额度
        const { data: quota } = await supabaseAdmin
          .from('user_quotas')
          .select('text_remaining, image_remaining, video_remaining')
          .eq('user_id', user.id)
          .single()

        // 获取订单数
        const { count: orderCount } = await supabaseAdmin
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // 获取生成记录数
        const { count: recordCount } = await supabaseAdmin
          .from('generation_records')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        return {
          ...user,
          quotas: quota || { text_remaining: 0, image_remaining: 0, video_remaining: 0 },
          order_count: orderCount || 0,
          record_count: recordCount || 0,
        }
      })
    )

    return NextResponse.json({
      success: true,
      users: usersWithStats,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })

  } catch (error) {
    console.error('Users error:', error)
    return NextResponse.json(
      { error: '获取用户列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, action, data } = body

    if (!user_id || !action) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    switch (action) {
      case 'update_quota':
        // 更新用户额度
        const { error: quotaError } = await supabaseAdmin
          .from('user_quotas')
          .update({
            text_remaining: data.text_remaining,
            image_remaining: data.image_remaining,
            video_remaining: data.video_remaining,
          })
          .eq('user_id', user_id)

        if (quotaError) throw quotaError

        // 记录审计日志
        await supabaseAdmin
          .from('audit_logs')
          .insert({
            admin_id: (await supabaseAdmin.auth.getUser()).data.user?.id,
            action: 'update_quota',
            target_type: 'user',
            target_id: user_id,
            details: { data },
          })

        return NextResponse.json({ success: true, message: '额度更新成功' })

      case 'update_role':
        // 更新用户角色
        const { error: roleError } = await supabaseAdmin
          .from('users')
          .update({ role: data.role })
          .eq('id', user_id)

        if (roleError) throw roleError

        return NextResponse.json({ success: true, message: '角色更新成功' })

      case 'delete':
        // 删除用户
        const { error: deleteError } = await supabaseAdmin
          .from('users')
          .delete()
          .eq('id', user_id)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true, message: '用户删除成功' })

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }

  } catch (error) {
    console.error('User action error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

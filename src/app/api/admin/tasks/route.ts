import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('generation_records')
      .select('*, users(email, nickname)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    // 类型筛选
    if (type) {
      query = query.eq('type', type)
    }

    // 状态筛选
    if (status) {
      query = query.eq('status', status)
    }

    const { data: tasks, error: tasksError, count } = await query

    if (tasksError) throw tasksError

    // 格式化数据
    const formattedTasks = (tasks || []).map(task => ({
      ...task,
      user_email: task.users?.email || '未知',
      user_nickname: task.users?.nickname || '未知',
    }))

    return NextResponse.json({
      success: true,
      tasks: formattedTasks,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })

  } catch (error) {
    console.error('Tasks error:', error)
    return NextResponse.json(
      { error: '获取任务列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'retry':
        // 重试失败的任务
        const { error: retryError } = await supabaseAdmin
          .from('generation_records')
          .update({
            status: 'pending',
            error_message: null,
          })
          .eq('id', data.task_id)

        if (retryError) throw retryError

        return NextResponse.json({ success: true, message: '任务已重新提交' })

      case 'cancel':
        // 取消任务
        const { error: cancelError } = await supabaseAdmin
          .from('generation_records')
          .update({
            status: 'cancelled',
          })
          .eq('id', data.task_id)

        if (cancelError) throw cancelError

        return NextResponse.json({ success: true, message: '任务已取消' })

      case 'delete':
        // 删除任务
        const { error: deleteError } = await supabaseAdmin
          .from('generation_records')
          .delete()
          .eq('id', data.task_id)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true, message: '任务已删除' })

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }

  } catch (error) {
    console.error('Task action error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

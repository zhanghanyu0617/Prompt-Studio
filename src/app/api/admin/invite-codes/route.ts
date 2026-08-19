import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('invite_codes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.ilike('code', `%${search}%`)
    }

    const { data: codes, error: codesError, count } = await query

    if (codesError) throw codesError

    return NextResponse.json({
      success: true,
      codes: codes || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })

  } catch (error) {
    console.error('Invite codes error:', error)
    return NextResponse.json(
      { error: '获取邀请码列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'create':
        // 创建邀请码
        const { data: newCode, error: createError } = await supabaseAdmin
          .from('invite_codes')
          .insert({
            code: data.code,
            max_uses: data.max_uses || 1,
            reward_quota: data.reward_quota || 50,
            is_active: data.is_active !== undefined ? data.is_active : true,
            expires_at: data.expires_at || null,
          })
          .select()
          .single()

        if (createError) throw createError

        return NextResponse.json({ success: true, code: newCode })

      case 'update':
        // 更新邀请码
        const { error: updateError } = await supabaseAdmin
          .from('invite_codes')
          .update({
            max_uses: data.max_uses,
            reward_quota: data.reward_quota,
            is_active: data.is_active,
            expires_at: data.expires_at,
          })
          .eq('id', data.id)

        if (updateError) throw updateError

        return NextResponse.json({ success: true, message: '邀请码更新成功' })

      case 'delete':
        // 删除邀请码
        const { error: deleteError } = await supabaseAdmin
          .from('invite_codes')
          .delete()
          .eq('id', data.id)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true, message: '邀请码删除成功' })

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }

  } catch (error) {
    console.error('Invite code action error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

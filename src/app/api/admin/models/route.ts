import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || ''

    let query = supabaseAdmin
      .from('models')
      .select('*')
      .order('created_at', { ascending: false })

    if (type) {
      query = query.eq('type', type)
    }

    const { data: models, error: modelsError } = await query

    if (modelsError) throw modelsError

    return NextResponse.json({
      success: true,
      models: models || [],
    })

  } catch (error) {
    console.error('Models error:', error)
    return NextResponse.json(
      { error: '获取模型列表失败' },
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
        // 创建模型
        const { data: newModel, error: createError } = await supabaseAdmin
          .from('models')
          .insert({
            name: data.name,
            provider: data.provider,
            model_id: data.model_id,
            type: data.type,
            cost_per_use: data.cost_per_use || 1,
            is_active: data.is_active ?? true,
            is_default: data.is_default || false,
            config: data.config || {},
          })
          .select()
          .single()

        if (createError) throw createError

        return NextResponse.json({ success: true, model: newModel })

      case 'update':
        // 更新模型
        const { error: updateError } = await supabaseAdmin
          .from('models')
          .update({
            name: data.name,
            provider: data.provider,
            model_id: data.model_id,
            type: data.type,
            cost_per_use: data.cost_per_use,
            is_active: data.is_active,
            is_default: data.is_default,
            config: data.config,
          })
          .eq('id', data.id)

        if (updateError) throw updateError

        return NextResponse.json({ success: true, message: '模型更新成功' })

      case 'toggle':
        // 启用/禁用模型
        const { error: toggleError } = await supabaseAdmin
          .from('models')
          .update({ is_active: data.is_active })
          .eq('id', data.id)

        if (toggleError) throw toggleError

        return NextResponse.json({ success: true, message: '模型状态更新成功' })

      case 'delete':
        // 删除模型
        const { error: deleteError } = await supabaseAdmin
          .from('models')
          .delete()
          .eq('id', data.id)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true, message: '模型删除成功' })

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }

  } catch (error) {
    console.error('Model action error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

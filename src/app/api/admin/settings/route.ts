import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: settings, error: settingsError } = await supabaseAdmin
      .from('system_settings')
      .select('*')
      .order('key')

    if (settingsError) throw settingsError

    // 转换为键值对格式
    const settingsMap = (settings || []).reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json({
      success: true,
      settings: settingsMap,
    })

  } catch (error) {
    console.error('Settings error:', error)
    return NextResponse.json(
      { error: '获取系统设置失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: '缺少设置数据' }, { status: 400 })
    }

    // 批量更新设置
    const updates = Object.entries(settings).map(([key, value]) =>
      supabaseAdmin
        .from('system_settings')
        .upsert({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value),
          updated_at: new Date().toISOString(),
        })
    )

    const results = await Promise.all(updates)
    
    for (const result of results) {
      if (result.error) {
        throw result.error
      }
    }

    return NextResponse.json({
      success: true,
      message: '设置保存成功',
    })

  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json(
      { error: '保存设置失败' },
      { status: 500 }
    )
  }
}

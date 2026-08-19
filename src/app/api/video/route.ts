import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { prompt, negative_prompt, duration, style, count = 1 } = await request.json()

    // 验证用户身份
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // 检查用户额度
    const { data: quota, error: quotaError } = await supabase
      .from('user_quotas')
      .select('video_remaining')
      .eq('user_id', user.id)
      .single()

    if (quotaError || !quota || quota.video_remaining <= 0) {
      return NextResponse.json({ error: '额度不足' }, { status: 403 })
    }

    // 创建生成记录
    const { data: record, error: recordError } = await supabase
      .from('generation_records')
      .insert({
        user_id: user.id,
        type: 'video',
        model: 'agnes-video-v2',
        prompt,
        negative_prompt,
        parameters: { duration, style, count },
        status: 'pending',
      })
      .select()
      .single()

    if (recordError) {
      console.error('Failed to create record:', recordError)
      return NextResponse.json({ error: '创建记录失败' }, { status: 500 })
    }

    try {
      // 调用 AGNES API 生成视频（异步任务）
      const response = await fetch(`${process.env.AGNES_BASE_URL}/v1/video/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AGNES_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'agnes-video-v2',
          prompt,
          negative_prompt,
          duration: duration || 5,
          style,
          n: count,
        }),
      })

      if (!response.ok) {
        throw new Error(`AGNES API error: ${response.status}`)
      }

      const data = await response.json()

      // 更新生成记录
      await supabase
        .from('generation_records')
        .update({
          task_id: data.id || data.task_id,
          status: 'processing',
        })
        .eq('id', record.id)

      // 扣减额度
      await supabase.rpc('consume_video_quota', {
        p_user_id: user.id,
        p_amount: count,
      })

      return NextResponse.json({
        success: true,
        taskId: data.id || data.task_id,
        recordId: record.id,
        status: 'processing',
      })

    } catch (apiError) {
      // 更新记录为失败
      await supabase
        .from('generation_records')
        .update({
          status: 'failed',
          error_message: apiError instanceof Error ? apiError.message : '未知错误',
        })
        .eq('id', record.id)

      throw apiError
    }

  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
      { status: 500 }
    )
  }
}

// 查询视频生成状态
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    const recordId = searchParams.get('recordId')

    if (!taskId && !recordId) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    // 查询 AGNES API 获取任务状态
    const response = await fetch(
      `${process.env.AGNES_BASE_URL}/v1/video/generations/${taskId || recordId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AGNES_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`AGNES API error: ${response.status}`)
    }

    const data = await response.json()

    // 更新数据库记录
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user && recordId) {
      await supabase
        .from('generation_records')
        .update({
          status: data.status === 'completed' ? 'completed' : 'processing',
          output: data.output ? JSON.stringify(data.output) : undefined,
        })
        .eq('id', recordId)
        .eq('user_id', user.id)
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Video status check error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
      { status: 500 }
    )
  }
}

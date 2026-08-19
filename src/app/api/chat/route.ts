import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'agnes-2.5-flash' } = await request.json()

    // 验证用户身份
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // 检查用户额度
    const { data: quota, error: quotaError } = await supabase
      .from('user_quotas')
      .select('text_remaining')
      .eq('user_id', user.id)
      .single()

    if (quotaError || !quota || quota.text_remaining <= 0) {
      return NextResponse.json({ error: '额度不足' }, { status: 403 })
    }

    // 调用 AGNES API
    const response = await fetch(`${process.env.AGNES_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AGNES_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`AGNES API error: ${response.status}`)
    }

    // 创建生成记录
    const { data: record, error: recordError } = await supabase
      .from('generation_records')
      .insert({
        user_id: user.id,
        type: 'chat',
        model,
        input_tokens: 0,
        output_tokens: 0,
        status: 'pending',
      })
      .select()
      .single()

    if (recordError) {
      console.error('Failed to create record:', recordError)
    }

    // 返回流式响应
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        let fullContent = ''
        let tokenCount = 0

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = new TextDecoder().decode(value)
            const lines = text.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6))
                  const content = data.choices?.[0]?.delta?.content || ''
                  if (content) {
                    fullContent += content
                    tokenCount++
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                  }
                } catch (e) {
                  // 忽略解析错误
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error)
        } finally {
          // 更新生成记录
          if (record) {
            await supabase
              .from('generation_records')
              .update({
                output: fullContent,
                output_tokens: tokenCount,
                status: 'completed',
              })
              .eq('id', record.id)

            // 扣减额度
            await supabase.rpc('consume_text_quota', {
              p_user_id: user.id,
              p_amount: 1,
            })
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

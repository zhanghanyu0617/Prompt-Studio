import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { prompt, negative_prompt, size, style, count = 1 } = await request.json()

    // 验证用户身份
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // 检查用户额度
    const { data: quota, error: quotaError } = await supabase
      .from('user_quotas')
      .select('image_remaining')
      .eq('user_id', user.id)
      .single()

    if (quotaError || !quota || quota.image_remaining <= 0) {
      return NextResponse.json({ error: '额度不足' }, { status: 403 })
    }

    // 创建生成记录
    const { data: record, error: recordError } = await supabase
      .from('generation_records')
      .insert({
        user_id: user.id,
        type: 'image',
        model: 'agnes-image-2.1',
        prompt,
        negative_prompt,
        parameters: { size, style, count },
        status: 'pending',
      })
      .select()
      .single()

    if (recordError) {
      console.error('Failed to create record:', recordError)
      return NextResponse.json({ error: '创建记录失败' }, { status: 500 })
    }

    try {
      // 调用 AGNES API 生成图片
      const response = await fetch(`${process.env.AGNES_BASE_URL}/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AGNES_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'agnes-image-2.1',
          prompt,
          negative_prompt,
          size: size || '1024x1024',
          style,
          n: count,
        }),
      })

      if (!response.ok) {
        throw new Error(`AGNES API error: ${response.status}`)
      }

      const data = await response.json()

      // 保存图片到 Supabase Storage
      const imageUrls = []
      for (let i = 0; i < data.data.length; i++) {
        const imageData = data.data[i]
        const imageUrl = imageData.url || imageData.b64_json
        
        if (imageUrl) {
          imageUrls.push(imageUrl)
        }
      }

      // 更新生成记录
      await supabase
        .from('generation_records')
        .update({
          output: JSON.stringify(imageUrls),
          status: 'completed',
        })
        .eq('id', record.id)

      // 扣减额度
      await supabase.rpc('consume_image_quota', {
        p_user_id: user.id,
        p_amount: count,
      })

      return NextResponse.json({
        success: true,
        images: imageUrls,
        recordId: record.id,
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
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
      { status: 500 }
    )
  }
}

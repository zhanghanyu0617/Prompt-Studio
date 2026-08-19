'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatefulButton } from '@/components/stateful-button'
import { Check, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const plans = [
  {
    id: 'basic',
    name: '基础版',
    price: 29,
    credits: 500,
    features: [
      '500 文字额度',
      '200 图片额度',
      '20 视频额度',
      '基础模型访问',
      '邮件支持',
    ],
  },
  {
    id: 'pro',
    name: '专业版',
    price: 99,
    credits: 2000,
    features: [
      '2000 文字额度',
      '800 图片额度',
      '80 视频额度',
      '所有模型访问',
      '优先队列',
      '邮件支持',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: 299,
    credits: 10000,
    features: [
      '10000 文字额度',
      '4000 图片额度',
      '400 视频额度',
      '所有模型访问',
      '最高优先级',
      '专属客服',
      'API 访问',
    ],
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handlePurchase = async (planId: string) => {
    setSelectedPlan(planId)
    
    try {
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // 查找套餐信息
      const plan = plans.find(p => p.id === planId)
      if (!plan) {
        alert('套餐不存在')
        return
      }

      // 调用支付接口
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: plan.id,
          plan_name: plan.name,
          amount: plan.price,
          credits: plan.credits,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '创建订单失败')
      }

      const data = await response.json()
      
      if (data.success && data.payment_url) {
        // 跳转到支付页面
        window.location.href = data.payment_url
      } else {
        throw new Error('获取支付链接失败')
      }

    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : '支付失败，请重试')
    } finally {
      setSelectedPlan(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">选择套餐</h1>
        <p className="text-xl text-gray-600">选择适合您的套餐，开始AI创作之旅</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-8 relative ${
              plan.popular ? 'border-2 border-primary shadow-xl' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  最受欢迎
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">¥{plan.price}</span>
                <span className="text-gray-600">/月</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{plan.credits} 额度/月</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <StatefulButton
              onClick={() => handlePurchase(plan.id)}
              text="立即购买"
              loadingText="处理中..."
              className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
              disabled={selectedPlan === plan.id}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

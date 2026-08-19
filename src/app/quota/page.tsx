'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, TrendingUp, ShoppingCart } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export default function QuotaPage() {
  const { quotas, fetchQuotas } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuotas().finally(() => setLoading(false))
  }, [fetchQuotas])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const quotaItems = [
    {
      label: '文字对话',
      remaining: quotas?.text_remaining || 0,
      total: 100,
      icon: Zap,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '图片生成',
      remaining: quotas?.image_remaining || 0,
      total: 50,
      icon: TrendingUp,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '视频生成',
      remaining: quotas?.video_remaining || 0,
      total: 10,
      icon: ShoppingCart,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">额度中心</h1>
        <p className="text-gray-600">查看和管理您的使用额度</p>
      </div>

      {/* 额度卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quotaItems.map((item, index) => {
          const percentage = (item.remaining / item.total) * 100
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.bgColor} ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {item.remaining}
                </span>
              </div>
              
              <h3 className="text-sm font-medium text-gray-600 mb-2">{item.label}</h3>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-500">
                剩余 {item.remaining} / 总计 {item.total}
              </p>
            </Card>
          )
        })}
      </div>

      {/* 使用统计 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">使用统计</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">总使用次数</p>
              <p className="text-2xl font-bold text-gray-900">
                {(quotas?.total_text_used || 0) + (quotas?.total_image_used || 0) + (quotas?.total_video_used || 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </Card>
    </div>
  )
}

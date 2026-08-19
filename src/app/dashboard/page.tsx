'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Sidebar } from '@/components/sidebar'
import { Card3D } from '@/components/3d-card'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  Sparkles,
  TrendingUp,
  Zap,
  Crown,
  Loader2
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, quotas, isLoading, fetchProfile, fetchQuotas, checkAdmin } = useAuthStore()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
      return
    }

    if (user) {
      Promise.all([
        fetchProfile(),
        fetchQuotas(),
        checkAdmin().then(setIsAdmin)
      ]).finally(() => setLoading(false))
    }
  }, [user, isLoading, router, fetchProfile, fetchQuotas, checkAdmin])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const features = [
    {
      title: 'AI 对话',
      description: '与AI进行智能对话，获取创意灵感',
      icon: MessageSquare,
      href: '/chat',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '图片生成',
      description: '根据文字描述生成精美图片',
      icon: ImageIcon,
      href: '/image',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: '视频生成',
      description: '将创意转化为动态视频内容',
      icon: Video,
      href: '/video',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  const stats = [
    {
      label: '剩余额度',
      value: quotas ? `${(quotas.text_remaining + quotas.image_remaining + quotas.video_remaining).toLocaleString()}` : '0',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: '已使用',
      value: quotas ? `${(quotas.total_text_used + quotas.total_image_used + quotas.total_video_used).toLocaleString()}` : '0',
      icon: TrendingUp,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
    {
      label: '会员等级',
      value: '免费用户',
      icon: Crown,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        {/* 顶部栏 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">工作台</h1>
              <p className="text-sm text-gray-600 mt-1">
                欢迎回来，{profile?.nickname || '用户'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin')}
                >
                  管理后台
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card3D key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </Card3D>
            ))}
          </div>

          {/* 功能入口 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">开始创作</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card3D key={index} className="p-6 cursor-pointer group" onClick={() => router.push(feature.href)}>
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card3D>
              ))}
            </div>
          </div>

          {/* 快速操作 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">快速操作</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card3D className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">升级套餐</h3>
                    <p className="text-sm text-gray-600">获取更多额度和高级功能</p>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => router.push('/pricing')}>
                  查看套餐
                </Button>
              </Card3D>

              <Card3D className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-50">
                    <Crown className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">邀请好友</h3>
                    <p className="text-sm text-gray-600">邀请好友注册获得奖励额度</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => router.push('/invite')}>
                  获取邀请码
                </Button>
              </Card3D>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

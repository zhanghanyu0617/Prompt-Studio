'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Users, Image as ImageIcon, Video, ShoppingCart, DollarSign } from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalImages: number
  totalVideos: number
  totalOrders: number
  totalRevenue: number
  todayUsers: number
  todayOrders: number
  todayRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalImages: 0,
    totalVideos: 0,
    totalOrders: 0,
    totalRevenue: 0,
    todayUsers: 0,
    todayOrders: 0,
    todayRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStats(data.stats)
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statCards = [
    {
      label: '总用户数',
      value: stats.totalUsers,
      subValue: `今日 +${stats.todayUsers}`,
      icon: Users,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '图片生成',
      value: stats.totalImages,
      icon: ImageIcon,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '视频生成',
      value: stats.totalVideos,
      icon: Video,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '订单数',
      value: stats.totalOrders,
      subValue: `今日 +${stats.todayOrders}`,
      icon: ShoppingCart,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
    {
      label: '总收入',
      value: `¥${stats.totalRevenue.toFixed(2)}`,
      subValue: `今日 +¥${stats.todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">数据总览</h2>
        <p className="text-gray-600 mt-1">系统运行状态和关键指标</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.subValue && (
                <p className="text-xs text-green-600 mt-1">{stat.subValue}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
          <div className="space-y-3">
            <a href="/admin/users" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">管理用户</p>
              <p className="text-xs text-gray-600">查看和编辑用户信息</p>
            </a>
            <a href="/admin/invite-codes" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">邀请码管理</p>
              <p className="text-xs text-gray-600">创建和管理邀请码</p>
            </a>
            <a href="/admin/orders" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-gray-900">订单管理</p>
              <p className="text-xs text-gray-600">查看和处理订单</p>
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">系统状态</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">数据库状态</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                正常
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API 服务</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                运行中
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">支付接口</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                正常
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">新用户注册</p>
                <p className="text-xs text-gray-600">2分钟前</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">订单支付成功</p>
                <p className="text-xs text-gray-600">15分钟前</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">图片生成完成</p>
                <p className="text-xs text-gray-600">1小时前</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
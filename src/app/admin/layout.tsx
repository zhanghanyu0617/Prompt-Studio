'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Sidebar } from '@/components/sidebar'
import { Card } from '@/components/ui/card'
import { Users, Shield, Settings, ShoppingCart, FolderOpen, BarChart3 } from 'lucide-react'

const adminMenuItems = [
  { name: '数据总览', href: '/admin', icon: BarChart3 },
  { name: '用户管理', href: '/admin/users', icon: Users },
  { name: '邀请码管理', href: '/admin/invite-codes', icon: Shield },
  { name: '模型管理', href: '/admin/models', icon: Settings },
  { name: '订单管理', href: '/admin/orders', icon: ShoppingCart },
  { name: '生成任务', href: '/admin/tasks', icon: FolderOpen },
  { name: '系统设置', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAuthStore()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
      return
    }

    if (user && !isLoading) {
      // 检查是否是管理员
      supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setAuthorized(true)
          } else {
            router.push('/dashboard')
          }
        })
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        {/* 顶部栏 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
              <p className="text-sm text-gray-600 mt-1">系统管理和数据监控</p>
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

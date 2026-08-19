'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  MessageSquare,
  Image as ImageIcon,
  Video,
  FolderOpen,
  Wallet,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react'

const userMenuItems = [
  { name: '工作台', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI 对话', href: '/chat', icon: MessageSquare },
  { name: '图片生成', href: '/image', icon: ImageIcon },
  { name: '视频生成', href: '/video', icon: Video },
  { name: '我的作品', href: '/gallery', icon: FolderOpen },
  { name: '额度中心', href: '/quota', icon: Wallet },
  { name: '套餐购买', href: '/pricing', icon: ShoppingCart },
  { name: '个人中心', href: '/profile', icon: User },
]

const adminMenuItems = [
  { name: '数据总览', href: '/admin', icon: LayoutDashboard },
  { name: '用户管理', href: '/admin/users', icon: User },
  { name: '邀请码管理', href: '/admin/invite-codes', icon: Shield },
  { name: '模型管理', href: '/admin/models', icon: Settings },
  { name: '订单管理', href: '/admin/orders', icon: ShoppingCart },
  { name: '生成任务', href: '/admin/tasks', icon: FolderOpen },
  { name: '系统设置', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, isAdmin, signOut } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  const menuItems = isAdmin ? adminMenuItems : userMenuItems

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="text-xl font-bold">PS</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Prompt Studio</h1>
                <p className="text-xs text-gray-600">AI创作工作台</p>
              </div>
            </Link>
          </div>

          {/* 菜单 */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* 用户信息 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-600">
                  {isAdmin ? '管理员' : '普通用户'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

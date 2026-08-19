'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Sidebar } from '@/components/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatefulButton } from '@/components/stateful-button'
import { Copy, Check, Gift } from 'lucide-react'

export default function InvitePage() {
  const router = useRouter()
  const { user, profile, isLoading } = useAuthStore()
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
      return
    }

    if (user) {
      // 获取用户的邀请码
      // TODO: 从数据库获取用户的邀请码
      setTimeout(() => {
        setInviteCode('USER' + user.id.slice(0, 8).toUpperCase())
        setLoading(false)
      }, 500)
    }
  }, [user, isLoading, router])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        {/* 顶部栏 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">邀请好友</h1>
              <p className="text-sm text-gray-600 mt-1">邀请好友注册获得奖励额度</p>
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {/* 邀请码卡片 */}
            <Card className="p-8 mb-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">您的邀请码</h2>
                <p className="text-gray-600">分享给好友，双方都能获得奖励</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-mono font-bold text-gray-900 flex-1 text-center">
                    {inviteCode}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="ml-4"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gift className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">邀请奖励</h3>
                    <p className="text-sm text-gray-600">
                      每成功邀请一位好友注册，您将获得 <span className="font-semibold text-primary">50额度</span> 奖励
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">好友奖励</h3>
                    <p className="text-sm text-gray-600">
                      好友使用您的邀请码注册，将获得 <span className="font-semibold text-primary">50额度</span> 初始奖励
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 邀请记录 */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请记录</h3>
              <div className="text-center py-8 text-gray-500">
                <p>暂无邀请记录</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

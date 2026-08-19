'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StatefulButton } from '@/components/stateful-button'

export default function RegisterPage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [inviteValid, setInviteValid] = useState<boolean | null>(null)
  const [checkingInvite, setCheckingInvite] = useState(false)

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  // 验证邀请码
  const validateInviteCode = async (code: string) => {
    if (!code.trim()) {
      setInviteValid(null)
      return
    }

    setCheckingInvite(true)
    try {
      const { data, error } = await supabase
        .from('invite_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error || !data) {
        setInviteValid(false)
      } else {
        setInviteValid(true)
      }
    } catch (err) {
      setInviteValid(false)
    } finally {
      setCheckingInvite(false)
    }
  }

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase()
    setInviteCode(code)
    
    // 防抖验证
    const timeoutId = setTimeout(() => {
      validateInviteCode(code)
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: nickname || email.split('@')[0],
            invite_code: inviteCode || null,
          },
        },
      })
      if (error) throw error

      // 如果使用了邀请码，更新邀请码使用次数
      if (inviteCode && inviteValid) {
        await supabase
          .from('invite_codes')
          .update({ used_count: supabase.raw('used_count + 1') })
          .eq('code', inviteCode.toUpperCase())
      }

      setSuccess('注册成功！请登录。')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4">
            <span className="text-3xl font-bold">PS</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">注册</h1>
          <p className="text-gray-600 mt-2">创建您的 Prompt Studio 账号</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                昵称
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="您的昵称"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邀请码（可选）
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={handleInviteCodeChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                    inviteValid === true
                      ? 'border-green-500 bg-green-50'
                      : inviteValid === false
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  placeholder="输入邀请码获得额外额度"
                />
                {checkingInvite && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  </div>
                )}
                {inviteValid === true && (
                  <div className="absolute right-3 top-2.5 text-green-600">
                    ✓
                  </div>
                )}
                {inviteValid === false && inviteCode && (
                  <div className="absolute right-3 top-2.5 text-red-600">
                    ✕
                  </div>
                )}
              </div>
              {inviteValid === true && (
                <p className="text-xs text-green-600 mt-1">邀请码有效，注册后将获得额外额度</p>
              )}
              {inviteValid === false && inviteCode && (
                <p className="text-xs text-red-600 mt-1">邀请码无效或已过期</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
                {success}
              </div>
            )}

            <StatefulButton
              type="submit"
              text="注册"
              loadingText="注册中..."
              className="w-full"
            />
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              已有账号？{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                立即登录
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const { user, profile, fetchProfile } = useAuthStore()
  const [nickname, setNickname] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile?.nickname) {
      setNickname(profile.nickname)
    }
  }, [profile])

  const handleSave = async () => {
    setSaving(true)

    try {
      const { error } = await supabase
        .from('users')
        .update({ nickname })
        .eq('id', user?.id)

      if (error) throw error
      await fetchProfile()
      alert('保存成功！')
    } catch (error) {
      console.error('Error:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">个人中心</h1>
        <p className="text-gray-600">管理您的账户信息</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              邮箱
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              昵称
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              注册时间
            </label>
            <input
              type="text"
              value={profile?.created_at ? new Date(profile.created_at).toLocaleString('zh-CN') : ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full"
          >
            {saving ? '保存中...' : '保存更改'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

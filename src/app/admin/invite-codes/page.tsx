'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield, Plus, Edit, Trash2 } from 'lucide-react'

interface InviteCode {
  id: string
  code: string
  max_uses: number
  used_count: number
  reward_quota: number
  is_active: boolean
  expires_at: string | null
  created_at: string
}

export default function AdminInviteCodesPage() {
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCode, setEditingCode] = useState<InviteCode | null>(null)
  const [formData, setFormData] = useState({
    code: '',
    max_uses: 1,
    reward_quota: 50,
    is_active: true,
    expires_at: '',
  })

  useEffect(() => {
    fetchCodes()
  }, [])

  const fetchCodes = async () => {
    try {
      const response = await fetch('/api/admin/invite-codes')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setCodes(data.codes)
        }
      }
    } catch (error) {
      console.error('Error fetching codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          data: {
            ...formData,
            expires_at: formData.expires_at || null,
          },
        }),
      })

      if (response.ok) {
        await fetchCodes()
        setShowCreateModal(false)
        setFormData({
          code: '',
          max_uses: 1,
          reward_quota: 50,
          is_active: true,
          expires_at: '',
        })
        alert('邀请码创建成功')
      }
    } catch (error) {
      console.error('Error creating code:', error)
      alert('创建失败')
    }
  }

  const handleToggle = async (code: InviteCode) => {
    try {
      const response = await fetch('/api/admin/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          data: {
            id: code.id,
            max_uses: code.max_uses,
            reward_quota: code.reward_quota,
            is_active: !code.is_active,
            expires_at: code.expires_at,
          },
        }),
      })

      if (response.ok) {
        await fetchCodes()
      }
    } catch (error) {
      console.error('Error toggling code:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个邀请码吗？')) return

    try {
      const response = await fetch('/api/admin/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          data: { id },
        }),
      })

      if (response.ok) {
        await fetchCodes()
        alert('删除成功')
      }
    } catch (error) {
      console.error('Error deleting code:', error)
      alert('删除失败')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">邀请码管理</h2>
          <p className="text-gray-600 mt-1">创建和管理邀请码</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          创建邀请码
        </Button>
      </div>

      {/* 创建邀请码弹窗 */}
      {showCreateModal && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">创建邀请码</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邀请码
              </label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="输入邀请码"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最大使用次数
                </label>
                <Input
                  type="number"
                  value={formData.max_uses}
                  onChange={(e) => setFormData({ ...formData, max_uses: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  奖励额度
                </label>
                <Input
                  type="number"
                  value={formData.reward_quota}
                  onChange={(e) => setFormData({ ...formData, reward_quota: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                过期时间（可选）
              </label>
              <Input
                type="datetime-local"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit">创建</Button>
              <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                取消
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* 邀请码列表 */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">邀请码</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">使用次数</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">奖励额度</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">过期时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">创建时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">{code.code}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {code.used_count} / {code.max_uses}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{code.reward_quota}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggle(code)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        code.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {code.is_active ? '启用' : '禁用'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {code.expires_at ? new Date(code.expires_at).toLocaleString('zh-CN') : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(code.created_at).toLocaleString('zh-CN')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(code.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
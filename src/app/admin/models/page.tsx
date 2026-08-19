'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Plus, Edit, Trash2, Power } from 'lucide-react'

interface Model {
  id: string
  name: string
  provider: string
  model_id: string
  type: string
  cost_per_use: number
  is_active: boolean
  is_default: boolean
  config: any
}

export default function AdminModelsPage() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingModel, setEditingModel] = useState<Model | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    model_id: '',
    type: 'text',
    cost_per_use: 1,
    is_active: true,
    is_default: false,
    config: {},
  })

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/admin/models')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setModels(data.models)
        }
      }
    } catch (error) {
      console.error('Error fetching models:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          data: formData,
        }),
      })

      if (response.ok) {
        await fetchModels()
        setShowCreateModal(false)
        setFormData({
          name: '',
          provider: '',
          model_id: '',
          type: 'text',
          cost_per_use: 1,
          is_active: true,
          is_default: false,
          config: {},
        })
        alert('模型创建成功')
      }
    } catch (error) {
      console.error('Error creating model:', error)
      alert('创建失败')
    }
  }

  const handleToggle = async (model: Model) => {
    try {
      const response = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          data: { id: model.id, is_active: !model.is_active },
        }),
      })

      if (response.ok) {
        await fetchModels()
      }
    } catch (error) {
      console.error('Error toggling model:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个模型吗？')) return

    try {
      const response = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          data: { id },
        }),
      })

      if (response.ok) {
        await fetchModels()
        alert('删除成功')
      }
    } catch (error) {
      console.error('Error deleting model:', error)
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
          <h2 className="text-2xl font-bold text-gray-900">模型管理</h2>
          <p className="text-gray-600 mt-1">管理AI模型配置</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加模型
        </Button>
      </div>

      {/* 创建模型弹窗 */}
      {showCreateModal && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">添加模型</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模型名称
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例如：GPT-4o"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  提供商
                </label>
                <Input
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  placeholder="例如：OpenAI"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模型ID
                </label>
                <Input
                  value={formData.model_id}
                  onChange={(e) => setFormData({ ...formData, model_id: e.target.value })}
                  placeholder="例如：gpt-4o"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  类型
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="text">文字</option>
                  <option value="image">图片</option>
                  <option value="video">视频</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                消耗额度
              </label>
              <Input
                type="number"
                value={formData.cost_per_use}
                onChange={(e) => setFormData({ ...formData, cost_per_use: parseInt(e.target.value) })}
                min="1"
                required
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

      {/* 模型列表 */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">模型名称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">提供商</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">模型ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">类型</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">消耗额度</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{model.provider}</td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-600">{model.model_id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {model.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{model.cost_per_use}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggle(model)}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        model.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      {model.is_active ? '启用' : '禁用'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(model.id)}
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
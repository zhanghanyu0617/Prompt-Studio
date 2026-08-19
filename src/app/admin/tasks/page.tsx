'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FolderOpen, Search, RefreshCw, Trash2 } from 'lucide-react'

interface Task {
  id: string
  user_email: string
  user_nickname: string
  type: string
  prompt: string
  negative_prompt: string | null
  status: string
  error_message: string | null
  credits_used: number
  created_at: string
  completed_at: string | null
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTasks()
  }, [page, search, type, status])

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search,
        type,
        status,
      })

      const response = await fetch(`/api/admin/tasks?${params}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTasks(data.tasks)
          setTotalPages(data.totalPages)
        }
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async (taskId: string) => {
    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'retry',
          data: { task_id: taskId },
        }),
      })

      if (response.ok) {
        await fetchTasks()
        alert('任务已重新提交')
      }
    } catch (error) {
      console.error('Error retrying task:', error)
      alert('重试失败')
    }
  }

  const handleCancel = async (taskId: string) => {
    if (!confirm('确定要取消这个任务吗？')) return

    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel',
          data: { task_id: taskId },
        }),
      })

      if (response.ok) {
        await fetchTasks()
        alert('任务已取消')
      }
    } catch (error) {
      console.error('Error cancelling task:', error)
      alert('取消失败')
    }
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm('确定要删除这个任务吗？')) return

    try {
      const response = await fetch('/api/admin/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          data: { task_id: taskId },
        }),
      })

      if (response.ok) {
        await fetchTasks()
        alert('删除成功')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('删除失败')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending':
        return 'bg-gray-100 text-gray-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      case 'cancelled':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'processing':
        return '处理中'
      case 'pending':
        return '等待中'
      case 'failed':
        return '失败'
      case 'cancelled':
        return '已取消'
      default:
        return status
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">生成任务</h2>
        <p className="text-gray-600 mt-1">查看所有AI生成任务</p>
      </div>

      {/* 搜索栏 */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索提示词..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="">全部类型</option>
            <option value="text">文字</option>
            <option value="image">图片</option>
            <option value="video">视频</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="">全部状态</option>
            <option value="pending">等待中</option>
            <option value="processing">处理中</option>
            <option value="completed">已完成</option>
            <option value="failed">失败</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
      </Card>

      {/* 任务列表 */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">任务ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">用户</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">类型</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">提示词</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">消耗额度</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">创建时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">{task.id.slice(0, 8)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {task.user_email}
                    {task.user_nickname && <span className="text-gray-500"> ({task.user_nickname})</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {task.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 max-w-xs truncate">
                    {task.prompt}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{task.credits_used}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(task.created_at).toLocaleString('zh-CN')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {task.status === 'failed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRetry(task.id)}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      {(task.status === 'pending' || task.status === 'processing') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancel(task.id)}
                        >
                          取消
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
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

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              上一页
            </Button>
            <span className="text-sm text-gray-600">
              第 {page} / {totalPages} 页
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              下一页
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
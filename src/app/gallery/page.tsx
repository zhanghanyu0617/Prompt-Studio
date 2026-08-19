'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Card3D } from '@/components/3d-card'
import { MessageSquare, Image as ImageIcon, Video } from 'lucide-react'

interface GenerationRecord {
  id: string
  type: 'text' | 'image' | 'video'
  prompt: string
  result_url: string | null
  status: string
  created_at: string
}

export default function GalleryPage() {
  const [records, setRecords] = useState<GenerationRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'text' | 'image' | 'video'>('all')

  // TODO: 从数据库加载生成记录
  useEffect(() => {
    // 演示数据
    setRecords([
      {
        id: '1',
        type: 'image',
        prompt: '一只可爱的猫咪',
        result_url: 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Cat',
        status: 'completed',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'video',
        prompt: '日落时分的海滩',
        result_url: null,
        status: 'processing',
        created_at: new Date().toISOString(),
      },
    ])
  }, [])

  const filteredRecords = filter === 'all' 
    ? records 
    : records.filter(r => r.type === filter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <MessageSquare className="w-5 h-5" />
      case 'image':
        return <ImageIcon className="w-5 h-5" />
      case 'video':
        return <Video className="w-5 h-5" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
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
      case 'failed':
        return '失败'
      default:
        return status
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">我的作品</h1>
        <p className="text-gray-600">查看您生成的所有作品</p>
      </div>

      {/* 筛选器 */}
      <div className="mb-6 flex gap-2">
        {['all', 'text', 'image', 'video'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === type
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {type === 'all' ? '全部' : type === 'text' ? '对话' : type === 'image' ? '图片' : '视频'}
          </button>
        ))}
      </div>

      {/* 作品列表 */}
      {filteredRecords.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <ImageIcon className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无作品</h3>
          <p className="text-gray-600">开始创作您的第一个作品吧！</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <Card3D key={record.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                {record.result_url ? (
                  <img
                    src={record.result_url}
                    alt={record.prompt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getTypeIcon(record.type)}
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {getStatusText(record.status)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-900 line-clamp-2">{record.prompt}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(record.created_at).toLocaleString('zh-CN')}
                </p>
              </div>
            </Card3D>
          ))}
        </div>
      )}
    </div>
  )
}

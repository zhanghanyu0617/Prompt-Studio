'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatefulButton } from '@/components/stateful-button'
import { Card3D } from '@/components/3d-card'
import { Loader2, Video, Download, Trash2, Sparkles, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface VideoTask {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  output?: string
  error_message?: string
}

export default function VideoPage() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [duration, setDuration] = useState(5)
  const [style, setStyle] = useState('general')
  const [count, setCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState<VideoTask[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pollingTasks, setPollingTasks] = useState<Set<string>>(new Set())
  const router = useRouter()
  const supabase = createClient()

  // 轮询任务状态
  useEffect(() => {
    const interval = setInterval(async () => {
      for (const taskId of pollingTasks) {
        try {
          const response = await fetch(`/api/video?taskId=${taskId}`)
          if (response.ok) {
            const data = await response.json()
            setTasks(prev => prev.map(task => 
              task.id === taskId 
                ? { ...task, status: data.status, output: data.output, error_message: data.error_message }
                : task
            ))
            
            if (data.status === 'completed' || data.status === 'failed') {
              setPollingTasks(prev => {
                const next = new Set(prev)
                next.delete(taskId)
                return next
              })
            }
          }
        } catch (error) {
          console.error('Poll error:', error)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [pollingTasks])

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negative_prompt: negativePrompt.trim(),
          duration,
          style,
          count,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '生成失败')
      }

      const data = await response.json()
      
      if (data.success) {
        const newTask: VideoTask = {
          id: data.taskId,
          status: 'processing',
        }
        setTasks(prev => [newTask, ...prev])
        setPollingTasks(prev => new Set(prev).add(data.taskId))
      } else {
        throw new Error('生成失败')
      }

    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : '生成失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-video-${Date.now()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleRetry = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    setPollingTasks(prev => {
      const next = new Set(prev)
      next.delete(taskId)
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">视频生成</h1>
        <p className="text-gray-600">输入文字描述，AI将为您生成视频内容</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：输入区 */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              生成参数
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  提示词 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  rows={4}
                  placeholder="描述您想要生成的视频..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  反向提示词（可选）
                </label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  rows={2}
                  placeholder="描述您不想要的内容..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    时长（秒）
                  </label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value={4}>4秒</option>
                    <option value={8}>8秒</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    风格
                  </label>
                  <select 
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="general">通用</option>
                    <option value="anime">动漫</option>
                    <option value="realistic">写实</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <StatefulButton
                onClick={handleGenerate}
                text="生成视频"
                loadingText="生成中..."
                className="w-full"
                disabled={!prompt.trim() || isLoading}
              />
            </div>
          </Card>
        </div>

        {/* 右侧：结果区 */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">生成结果</h3>
            
            {tasks.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="aspect-video flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">视频将显示在这里</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <Card3D key={task.id} className="aspect-video">
                    {task.status === 'processing' && (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                          <p className="text-gray-900 font-medium">正在生成视频...</p>
                          <p className="text-sm text-gray-600 mt-2">这可能需要几分钟时间</p>
                          <p className="text-xs text-gray-500 mt-1">任务ID: {task.id}</p>
                        </div>
                      </div>
                    )}
                    
                    {task.status === 'completed' && task.output && (
                      <div className="w-full h-full relative">
                        <video
                          src={task.output}
                          controls
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            size="sm"
                            onClick={() => handleDownload(task.output!)}
                            className="bg-white text-gray-900 hover:bg-gray-100"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {task.status === 'failed' && (
                      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
                        <div className="text-center">
                          <Video className="w-12 h-12 text-red-400 mx-auto mb-4" />
                          <p className="text-red-900 font-medium">生成失败</p>
                          <p className="text-sm text-red-600 mt-2">{task.error_message}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRetry(task.id)}
                            className="mt-4"
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            重试
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card3D>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

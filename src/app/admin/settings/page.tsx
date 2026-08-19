'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Save } from 'lucide-react'

interface SystemSetting {
  key: string
  value: any
  description: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          const settingsArray = Object.entries(data.settings).map(([key, value]) => ({
            key,
            value,
            description: getDescription(key),
          }))
          setSettings(settingsArray)
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      site_name: '网站名称',
      site_description: '网站描述',
      registration_enabled: '是否开放注册',
      invite_required: '是否需要邀请码',
      default_quota_text: '默认文字额度',
      default_quota_image: '默认图片额度',
      default_quota_video: '默认视频额度',
      maintenance_mode: '维护模式',
    }
    return descriptions[key] || key
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const settingsMap = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      }, {} as Record<string, any>)

      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsMap }),
      })

      if (response.ok) {
        alert('设置保存成功')
      } else {
        alert('保存失败')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.key === key ? { ...setting, value } : setting
      )
    )
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
          <h2 className="text-2xl font-bold text-gray-900">系统设置</h2>
          <p className="text-gray-600 mt-1">管理系统配置</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? '保存中...' : '保存设置'}
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{setting.description}</h3>
                <p className="text-xs text-gray-600 mt-1">Key: {setting.key}</p>
              </div>
              <div className="flex items-center gap-4">
                {typeof setting.value === 'boolean' ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setting.value}
                      onChange={(e) => updateSetting(setting.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                ) : (
                  <Input
                    type="text"
                    value={String(setting.value)}
                    onChange={(e) => {
                      const value = setting.key.includes('quota') || setting.key.includes('enabled') || setting.key.includes('required') || setting.key.includes('mode')
                        ? e.target.value === 'true'
                        : e.target.value
                      updateSetting(setting.key, value)
                    }}
                    className="w-64"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatefulButtonProps {
  text: string
  loadingText?: string
  successText?: string
  errorText?: string
  onClick?: () => Promise<void>
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
}

export function StatefulButton({
  text,
  loadingText = '加载中...',
  successText = '成功！',
  errorText = '失败',
  onClick,
  onSuccess,
  onError,
  className = '',
  disabled = false,
  type = 'button',
  children,
}: StatefulButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleClick = async () => {
    if (!onClick || disabled || state === 'loading') return

    setState('loading')

    try {
      await onClick()
      setState('success')
      onSuccess?.()
      
      // 2秒后重置状态
      setTimeout(() => {
        setState('idle')
      }, 2000)
    } catch (error) {
      setState('error')
      onError?.(error as Error)
      
      // 2秒后重置状态
      setTimeout(() => {
        setState('idle')
      }, 2000)
    }
  }

  const getButtonContent = () => {
    if (children) return children

    switch (state) {
      case 'loading':
        return (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              ⟳
            </motion.span>
            {loadingText}
          </span>
        )
      case 'success':
        return (
          <span className="flex items-center gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              ✓
            </motion.span>
            {successText}
          </span>
        )
      case 'error':
        return (
          <span className="flex items-center gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              ✕
            </motion.span>
            {errorText}
          </span>
        )
      default:
        return text
    }
  }

  const getButtonVariant = () => {
    switch (state) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600'
      case 'error':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return 'bg-primary hover:bg-primary/90'
    }
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled || state === 'loading'}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2',
        getButtonVariant(),
        className
      )}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {getButtonContent()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

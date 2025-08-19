'use client'

import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ThemeToggle = () => {
  const { theme, mounted, toggleTheme } = useTheme()

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
    )
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />
      case 'dark':
        return <Moon size={20} />
      case 'system':
        return <Monitor size={20} />
      default:
        return <Sun size={20} />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return '浅色模式'
      case 'dark':
        return '深色模式'
      case 'system':
        return '跟随系统'
      default:
        return '浅色模式'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm hover:shadow-md"
      style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        color: 'var(--text-primary)'
      }}
      title={`当前: ${getLabel()}, 点击切换`}
    >
      {getIcon()}
      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
        {getLabel()}
      </span>
    </button>
  )
}

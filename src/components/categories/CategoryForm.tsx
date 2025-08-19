'use client'

import { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'
import { X, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryFormProps {
  onClose: () => void
  category?: any // 编辑时传入
}

const colorOptions = [
  { name: '红色', value: 'bg-red-500' },
  { name: '橙色', value: 'bg-orange-500' },
  { name: '黄色', value: 'bg-yellow-500' },
  { name: '绿色', value: 'bg-green-500' },
  { name: '蓝色', value: 'bg-blue-500' },
  { name: '紫色', value: 'bg-purple-500' },
  { name: '粉色', value: 'bg-pink-500' },
  { name: '灰色', value: 'bg-gray-500' },
]

export const CategoryForm = ({ onClose, category }: CategoryFormProps) => {
  const { createCategory, updateCategory } = useCategories()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState(category?.name || '')
  const [color, setColor] = useState(category?.color || 'bg-blue-500')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('请输入分类名称')
      return
    }

    setIsSubmitting(true)
    try {
      if (category) {
        await updateCategory(category.id, { name: name.trim(), color })
      } else {
        await createCategory(name.trim(), color)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="instagram-card rounded-2xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {category ? '编辑分类' : '新建分类'}
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            分类名称
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="instagram-input w-full"
            placeholder="请输入分类名称"
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
            分类颜色
          </label>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => setColor(colorOption.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-100",
                  color === colorOption.value
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                )}
              >
                <div className={cn("w-6 h-6 rounded-full", colorOption.value)}></div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {colorOption.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg" style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--border-error)' 
          }}>
            <p style={{ color: '#dc2626' }} className="text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className="instagram-button flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                保存中...
              </>
            ) : (
              <>
                <Save size={16} />
                {category ? '更新' : '创建'}
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl transition-all duration-150"
            style={{ 
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-secondary)'
            }}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  )
}

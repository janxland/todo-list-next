'use client'

import { useState } from 'react'
import { Plus, X, Sparkles, Tag } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import { cn } from '@/lib/utils'

interface AddTodoFormProps {
  onAdd: (title: string, description?: string, categoryId?: string) => void
}

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const { categories } = useCategories()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onAdd(title.trim(), description.trim() || undefined, categoryId || undefined)
      setTitle('')
      setDescription('')
      setCategoryId('')
      setIsExpanded(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="instagram-card rounded-2xl p-6 hover-lift transition-all duration-150">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Plus className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="添加新任务..."
            className="instagram-input w-full pl-12 pr-4 py-4"
            disabled={isSubmitting}
          />
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-fade-in-up">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="添加描述（可选）..."
              rows={3}
              className="instagram-input w-full resize-none"
              disabled={isSubmitting}
            />

            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                选择分类（可选）
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="instagram-input w-full"
                disabled={isSubmitting}
              >
                <option value="">无分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="flex items-center gap-3 animate-fade-in-up">
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="instagram-button flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  添加中...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  添加任务
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false)
                setTitle('')
                setDescription('')
                setCategoryId('')
              }}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-150"
            >
              <X size={16} />
              取消
            </button>
          </div>
        )}

        {!isExpanded && (
          <p className="text-gray-500 text-sm text-center">
            点击输入框开始添加任务
          </p>
        )}
      </form>
    </div>
  )
}

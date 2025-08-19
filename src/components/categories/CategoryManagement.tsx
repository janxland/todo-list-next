'use client'

import { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'
import { CategoryForm } from './CategoryForm'
import { CategoryList } from './CategoryList'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Tag, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export const CategoryManagement = () => {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories()
  const [showForm, setShowForm] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="instagram-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Tag className="text-purple-500" size={24} />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>分类管理</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150",
              showForm
                ? "instagram-button text-white"
                : "hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            )}
            style={{ color: showForm ? 'white' : 'var(--text-secondary)' }}
          >
            <Plus size={16} />
            <span>新建分类</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl" style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--border-error)' 
          }}>
            <p style={{ color: '#dc2626' }}>错误: {error}</p>
          </div>
        )}

        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>• 创建和管理任务分类</p>
          <p>• 为每个分类设置颜色标识</p>
          <p>• 分类会自动应用到任务筛选</p>
        </div>
      </div>

      {showForm && (
        <CategoryForm onClose={() => setShowForm(false)} />
      )}

      <CategoryList categories={categories} />
    </div>
  )
}

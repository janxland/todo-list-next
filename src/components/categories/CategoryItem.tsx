'use client'

import { useState } from 'react'
import { Category } from '@/types/todo'
import { useCategories } from '@/hooks/useCategories'
import { CategoryForm } from './CategoryForm'
import { Edit, Trash2, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryItemProps {
  category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const { deleteCategory } = useCategories()
  const [showEditForm, setShowEditForm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`确定要删除分类"${category.name}"吗？\n删除后该分类下的任务将变为未分类状态。`)) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteCategory(category.id)
    } catch (error) {
      console.error('删除分类失败:', error)
      alert('删除分类失败，请重试')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="instagram-card rounded-2xl p-6 hover-lift transition-all duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("w-4 h-4 rounded-full", category.color)}></div>
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {category.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                创建于 {new Date(category.createdAt).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              style={{ color: 'var(--text-secondary)' }}
              title="编辑分类"
            >
              <Edit size={16} />
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-150"
              style={{ color: isDeleting ? 'var(--text-muted)' : '#dc2626' }}
              title="删除分类"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {showEditForm && (
        <CategoryForm 
          category={category} 
          onClose={() => setShowEditForm(false)} 
        />
      )}
    </>
  )
}

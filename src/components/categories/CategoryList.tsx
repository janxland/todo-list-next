'use client'

import { Category } from '@/types/todo'
import { CategoryItem } from './CategoryItem'

interface CategoryListProps {
  categories: Category[]
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  if (categories.length === 0) {
    return (
      <div className="instagram-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          暂无分类
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          创建第一个分类来组织您的任务
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

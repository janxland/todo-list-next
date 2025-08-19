'use client'

import { CategoryManagement } from '@/components/categories/CategoryManagement'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen instagram-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: '首页', href: '/' },
            { label: '分类管理', href: '/categories' }
          ]}
        />
        <CategoryManagement />
      </div>
    </div>
  )
}

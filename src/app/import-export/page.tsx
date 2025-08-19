'use client'

import { ImportExport } from '@/components/import-export'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function ImportExportPage() {
  return (
    <div className="min-h-screen instagram-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: '首页', href: '/' },
            { label: '数据管理', href: '/import-export' }
          ]}
        />
        <ImportExport />
      </div>
    </div>
  )
}

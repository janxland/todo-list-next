'use client'

import { StatsDashboard } from '@/components/stats'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export default function StatsPage() {
  return (
    <div className="min-h-screen instagram-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: '首页', href: '/' },
            { label: '统计看板', href: '/stats' }
          ]}
        />
        <StatsDashboard />
      </div>
    </div>
  )
}

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Upload, Home, Sparkles, Move, Palette, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

export const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '首页', icon: Home },
    { href: '/stats', label: '统计', icon: BarChart3 },
    { href: '/import-export', label: '数据', icon: Upload },
    { href: '/categories', label: '分类', icon: Tag },
  ]

  return (
    <div className="instagram-card rounded-2xl p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-500" size={24} />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>TodoFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>让任务管理变得简单而优雅</p>
          <ThemeToggle />
        </div>
      </div>
      
      <nav className="flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
                                             className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150",
                  isActive
                    ? "instagram-button text-white"
                    : "hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                )}
                style={{ color: isActive ? 'white' : 'var(--text-secondary)' }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

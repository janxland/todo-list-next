import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 animate-fade-in-up">
      <Link 
        href="/"
        className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
          {index === items.length - 1 ? (
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
          ) : (
            <Link 
              href={item.href}
                              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

'use client'

import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { useCategories } from '@/hooks/useCategories'
import { Navigation } from '@/components/ui/Navigation'
import { AddTodoForm } from '@/components/home/AddTodoForm'
import { TodoList } from '@/components/home/TodoList'
import { DraggableTodoList } from '@/components/home/DraggableTodoList'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Move, List } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, setTodos } = useTodos()
  const { categories } = useCategories()
  const [viewMode, setViewMode] = useState<'list' | 'drag'>('list')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen instagram-light flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen instagram-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Navigation />

        {/* 错误提示 */}
        {error && (
          <div className="instagram-card rounded-2xl p-4 mb-6 animate-fade-in-up" style={{ border: '1px solid var(--border-error)' }}>
            <p className="text-center" style={{ color: '#dc2626' }}>{error}</p>
          </div>
        )}

        {/* 添加任务 */}
        <div className="mb-8 animate-fade-in-up">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* 截止时间提醒 */}
        {(() => {
          const now = new Date()
          const overdueTodos = todos.filter(todo => 
            !todo.completed && 
            todo.dueDate && 
            new Date(todo.dueDate) < now
          )
          const todayTodos = todos.filter(todo => {
            if (!todo.dueDate || todo.completed) return false
            const dueDate = new Date(todo.dueDate)
            const today = new Date()
            return dueDate.toDateString() === today.toDateString()
          })

          if (overdueTodos.length === 0 && todayTodos.length === 0) return null

          return (
            <div className="mb-6 animate-fade-in-up">
              {overdueTodos.length > 0 && (
                <div className="instagram-card rounded-2xl p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">
                      已过期任务 ({overdueTodos.length})
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {overdueTodos.slice(0, 3).map(todo => (
                      <div key={todo.id} className="text-sm text-red-600 dark:text-red-300">
                        • {todo.title}
                      </div>
                    ))}
                    {overdueTodos.length > 3 && (
                      <div className="text-sm text-red-600 dark:text-red-300">
                        ...还有 {overdueTodos.length - 3} 个任务
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {todayTodos.length > 0 && (
                <div className="instagram-card rounded-2xl p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                      今天到期任务 ({todayTodos.length})
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {todayTodos.slice(0, 3).map(todo => (
                      <div key={todo.id} className="text-sm text-orange-600 dark:text-orange-300">
                        • {todo.title}
                      </div>
                    ))}
                    {todayTodos.length > 3 && (
                      <div className="text-sm text-orange-600 dark:text-orange-300">
                        ...还有 {todayTodos.length - 3} 个任务
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* 视图切换和分类筛选 */}
        <div className="instagram-card rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>任务管理</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-100",
                  viewMode === 'list'
                    ? "instagram-button text-white"
                    : "hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                )}
                style={{ color: viewMode === 'list' ? 'white' : 'var(--text-secondary)' }}
              >
                <List size={16} />
                <span>列表模式</span>
              </button>
              <button
                onClick={() => setViewMode('drag')}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-100",
                  viewMode === 'drag'
                    ? "instagram-button text-white"
                    : "hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                )}
                style={{ color: viewMode === 'drag' ? 'white' : 'var(--text-secondary)' }}
              >
                <Move size={16} />
                <span>拖拽模式</span>
              </button>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>分类筛选:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-3 py-1 rounded-lg text-sm transition-all duration-100",
                selectedCategory === null
                  ? "instagram-button text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              style={{ color: selectedCategory === null ? 'white' : 'var(--text-secondary)' }}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-3 py-1 rounded-lg text-sm transition-all duration-100 flex items-center gap-2",
                  selectedCategory === category.id
                    ? "text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                style={{ 
                  color: selectedCategory === category.id ? 'white' : 'var(--text-secondary)',
                  background: selectedCategory === category.id ? category.color : 'transparent'
                }}
              >
                <div className={cn("w-2 h-2 rounded-full", category.color)}></div>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 任务列表 */}
        {viewMode === 'list' ? (
          <TodoList
            todos={todos}
            selectedCategory={selectedCategory}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ) : (
          <div className="space-y-4">
            {/* 拖拽模式提示 */}
            <div className="instagram-card rounded-2xl p-4 mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Move size={20} className="text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">拖拽模式已启用</h3>
                  <div className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>顶部区域</strong>：插入到目标任务前面</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-purple-500 rounded"></div>
                      <span><strong>中间区域</strong>：与目标任务交换位置</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>底部区域</strong>：插入到目标任务后面</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DraggableTodoList
              todos={todos}
              selectedCategory={selectedCategory}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              setTodos={setTodos}
            />
          </div>
        )}
      </div>
    </div>
  )
}
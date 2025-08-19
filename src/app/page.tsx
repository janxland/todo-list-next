'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import TodoItem from '@/components/TodoItem'
import AddTodo from '@/components/AddTodo'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取所有任务
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('获取任务失败')
      }
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  // 添加任务
  const handleAddTodo = async (title: string, description?: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (!response.ok) {
        throw new Error('添加任务失败')
      }

      const newTodo = await response.json()
      setTodos(prev => [newTodo, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加任务失败')
    }
  }

  // 更新任务
  const handleUpdateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('更新任务失败')
      }

      const updatedTodo = await response.json()
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新任务失败')
    }
  }

  // 删除任务
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('删除任务失败')
      }

      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除任务失败')
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            待办事项清单
          </h1>
          <p className="text-gray-600">
            管理您的任务，提高工作效率
          </p>
        </div>

        {/* 统计信息 */}
        {totalCount > 0 && (
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-sm text-gray-600">
                    已完成: {completedCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-blue-500" size={20} />
                  <span className="text-sm text-gray-600">
                    总计: {totalCount}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                完成率: {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              关闭
            </button>
          </div>
        )}

        {/* 添加任务 */}
        <div className="mb-6">
          <AddTodo onAdd={handleAddTodo} />
        </div>

        {/* 任务列表 */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <EmptyState />
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('获取任务失败')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (title: string, description?: string, categoryId?: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, categoryId }),
      })
      if (!response.ok) throw new Error('添加任务失败')
      const newTodo = await response.json()
      setTodos(prev => [newTodo, ...prev])
      return newTodo
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '添加任务失败')
    }
  }

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      console.log('useTodos updateTodo - ID:', id, 'Data:', data)
      
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('更新任务失败')
      const updatedTodo = await response.json()
      console.log('useTodos updateTodo - Response:', updatedTodo)
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo))
      return updatedTodo
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '更新任务失败')
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('删除任务失败')
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '删除任务失败')
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
    setTodos
  }
}

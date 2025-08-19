import { useState, useEffect, useCallback } from 'react'
import { Category } from '@/types/todo'

// 全局分类状态缓存
let globalCategories: Category[] = []
let globalLoading = false
let globalError: string | null = null
let subscribers: Set<() => void> = new Set()

// 通知所有订阅者状态更新
const notifySubscribers = () => {
  subscribers.forEach(callback => callback())
}

// 获取分类数据
const fetchCategoriesData = async () => {
  if (globalLoading) return // 防止重复请求
  
  try {
    globalLoading = true
    globalError = null
    notifySubscribers()
    
    const response = await fetch('/api/categories')
    if (!response.ok) throw new Error('获取分类失败')
    const data = await response.json()
    
    globalCategories = data
    globalError = null
  } catch (err) {
    globalError = err instanceof Error ? err.message : '未知错误'
  } finally {
    globalLoading = false
    notifySubscribers()
  }
}

export const useCategories = () => {
  const [, forceUpdate] = useState({})

  // 订阅状态变化
  useEffect(() => {
    const callback = () => forceUpdate({})
    subscribers.add(callback)
    
    // 如果还没有数据，则获取
    if (globalCategories.length === 0 && !globalLoading) {
      fetchCategoriesData()
    }
    
    return () => {
      subscribers.delete(callback)
    }
  }, [])

  // 创建分类
  const createCategory = useCallback(async (name: string, color: string) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      })
      if (!response.ok) throw new Error('创建分类失败')
      const newCategory = await response.json()
      
      globalCategories = [...globalCategories, newCategory]
      notifySubscribers()
      return newCategory
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '创建分类失败')
    }
  }, [])

  // 更新分类
  const updateCategory = useCallback(async (id: string, data: Partial<Category>) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('更新分类失败')
      const updatedCategory = await response.json()
      
      globalCategories = globalCategories.map(cat => cat.id === id ? updatedCategory : cat)
      notifySubscribers()
      return updatedCategory
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '更新分类失败')
    }
  }, [])

  // 删除分类
  const deleteCategory = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('删除分类失败')
      
      globalCategories = globalCategories.filter(cat => cat.id !== id)
      notifySubscribers()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '删除分类失败')
    }
  }, [])

  // 刷新数据
  const refetch = useCallback(() => {
    fetchCategoriesData()
  }, [])

  return {
    categories: globalCategories,
    loading: globalLoading,
    error: globalError,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch
  }
}

import { useState, useEffect, useCallback } from 'react'
import { TodoStats } from '@/types/todo'

// 全局统计状态缓存
let globalStats: TodoStats | null = null
let globalLoading = false
let globalError: string | null = null
let subscribers: Set<() => void> = new Set()

// 通知所有订阅者状态更新
const notifySubscribers = () => {
  subscribers.forEach(callback => callback())
}

// 获取统计数据
const fetchStatsData = async () => {
  if (globalLoading) return // 防止重复请求
  
  try {
    globalLoading = true
    globalError = null
    notifySubscribers()
    
    const response = await fetch('/api/stats')
    if (!response.ok) throw new Error('获取统计数据失败')
    const data = await response.json()
    
    globalStats = data
    globalError = null
  } catch (err) {
    globalError = err instanceof Error ? err.message : '获取统计数据失败'
  } finally {
    globalLoading = false
    notifySubscribers()
  }
}

export const useStats = () => {
  const [, forceUpdate] = useState({})

  // 订阅状态变化
  useEffect(() => {
    const callback = () => forceUpdate({})
    subscribers.add(callback)
    
    // 如果还没有数据，则获取
    if (!globalStats && !globalLoading) {
      fetchStatsData()
    }
    
    return () => {
      subscribers.delete(callback)
    }
  }, [])

  // 刷新数据
  const refetch = useCallback(() => {
    fetchStatsData()
  }, [])

  return {
    stats: globalStats,
    loading: globalLoading,
    error: globalError,
    refetch
  }
}

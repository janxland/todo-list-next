import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 强制动态渲染，避免构建时预渲染
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // 基础统计
    const total = await prisma.todo.count()
    const completed = await prisma.todo.count({ where: { completed: true } })
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    // 按优先级统计
    const byPriority = await prisma.todo.groupBy({
      by: ['priority'],
      _count: { priority: true }
    })

    // 按分类统计
    const byCategory = await prisma.todo.groupBy({
      by: ['categoryId'],
      _count: { categoryId: true }
    })

    // 生成本周趋势数据（最近7天）
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 6)
    weekStart.setHours(0, 0, 0, 0)

    const weeklyTrend = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const count = await prisma.todo.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      })
      
      weeklyTrend.push({
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        count
      })
    }

    // 生成本月趋势数据（最近12个月）
    const monthlyTrend = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setMonth(nextDate.getMonth() + 1)
      
      const count = await prisma.todo.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      })
      
      monthlyTrend.push({
        month: date.toLocaleDateString('zh-CN', { month: 'short' }),
        count
      })
    }

    // 格式化数据
    const priorityStats = byPriority.reduce((acc, item) => {
      acc[item.priority] = item._count.priority
      return acc
    }, {} as Record<string, number>)

    const categoryStats = byCategory.reduce((acc, item) => {
      acc[item.categoryId || 'uncategorized'] = item._count.categoryId
      return acc
    }, {} as Record<string, number>)

    const stats = {
      total,
      completed,
      pending,
      completionRate,
      byPriority: priorityStats,
      byCategory: categoryStats,
      weeklyTrend,
      monthlyTrend
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

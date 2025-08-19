import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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

    // 本周趋势
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate() - 7)
    
    const weeklyTrend = await prisma.todo.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startOfWeek
        }
      },
      _count: { createdAt: true }
    })

    // 本月趋势
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const monthlyTrend = await prisma.todo.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startOfMonth
        }
      },
      _count: { createdAt: true }
    })

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
      weeklyTrend: weeklyTrend.map(item => ({
        date: item.createdAt.toISOString().split('T')[0],
        count: item._count.createdAt
      })),
      monthlyTrend: monthlyTrend.map(item => ({
        month: item.createdAt.toISOString().split('T')[0],
        count: item._count.createdAt
      }))
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

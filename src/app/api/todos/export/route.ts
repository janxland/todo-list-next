import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 转换为CSV格式
    const csvHeader = 'Title,Description,Status,Priority,Category,Created At,Updated At\n'
    const csvRows = todos.map(todo => {
      const title = `"${todo.title.replace(/"/g, '""')}"`
      const description = todo.description ? `"${todo.description.replace(/"/g, '""')}"` : ''
      const status = todo.completed ? 'Completed' : 'Pending'
      const priority = todo.priority
      const category = todo.category?.name || 'Uncategorized'
      const createdAt = todo.createdAt.toISOString()
      const updatedAt = todo.updatedAt.toISOString()
      
      return `${title},${description},${status},${priority},${category},${createdAt},${updatedAt}`
    }).join('\n')

    const csvContent = csvHeader + csvRows

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="todos-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error) {
    console.error('Error exporting todos:', error)
    return NextResponse.json(
      { error: 'Failed to export todos' },
      { status: 500 }
    )
  }
}

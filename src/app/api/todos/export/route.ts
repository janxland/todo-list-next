import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 强制动态渲染，避免构建时预渲染
export const dynamic = 'force-dynamic'

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

    // 生成 CSV 内容
    const headers = ['Title', 'Description', 'Status', 'Priority', 'Category', 'Created At']
    const csvRows = [headers.join(',')]

    todos.forEach(todo => {
      const row = [
        `"${todo.title.replace(/"/g, '""')}"`,
        `"${(todo.description || '').replace(/"/g, '""')}"`,
        todo.completed ? 'Completed' : 'Pending',
        todo.priority,
        todo.category?.name || 'Uncategorized',
        todo.createdAt.toISOString().split('T')[0]
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = csvRows.join('\n')

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

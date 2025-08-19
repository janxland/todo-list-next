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
    const headers = ['标题', '描述', '状态', '优先级', '分类', '创建时间']
    const csvRows = [headers.join(',')]

    todos.forEach(todo => {
      const row = [
        `"${todo.title.replace(/"/g, '""')}"`,
        `"${(todo.description || '').replace(/"/g, '""')}"`,
        todo.completed ? '已完成' : '待完成',
        todo.priority === 'LOW' ? '低' : todo.priority === 'MEDIUM' ? '中' : todo.priority === 'HIGH' ? '高' : '紧急',
        `"${todo.category?.name || '未分类'}"`,
        new Date(todo.createdAt).toLocaleString('zh-CN')
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = csvRows.join('\n')
    
    // 添加 BOM 头以支持中文字符
    const BOM = '\uFEFF'
    const csvWithBOM = BOM + csvContent

    return new NextResponse(csvWithBOM, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
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

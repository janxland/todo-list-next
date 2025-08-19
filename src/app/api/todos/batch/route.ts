import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ids, action, data } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Task IDs are required' },
        { status: 400 }
      )
    }

    if (!action || !['delete', 'complete', 'update'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'delete':
        result = await prisma.todo.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case 'complete':
        result = await prisma.todo.updateMany({
          where: { id: { in: ids } },
          data: { completed: true }
        })
        break

      case 'update':
        if (!data) {
          return NextResponse.json(
            { error: 'Update data is required' },
            { status: 400 }
          )
        }
        result = await prisma.todo.updateMany({
          where: { id: { in: ids } },
          data
        })
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `Successfully ${action}ed ${result.count} tasks`,
      count: result.count
    })
  } catch (error) {
    console.error('Error performing batch operation:', error)
    return NextResponse.json(
      { error: 'Failed to perform batch operation' },
      { status: 500 }
    )
  }
}

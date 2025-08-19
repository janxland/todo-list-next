import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 强制动态渲染，避免构建时预渲染
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const priority = searchParams.get('priority')
    const completed = searchParams.get('completed')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build query conditions
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (priority) {
      where.priority = priority
    }

    if (completed !== null) {
      where.completed = completed === 'true'
    }

    // Save search history
    if (search && search.trim()) {
      await prisma.searchHistory.create({
        data: { query: search.trim() }
      })
    }

    const todos = await prisma.todo.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        [sortBy]: sortOrder
      }
    })

    return NextResponse.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, categoryId } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Get max order value
    const maxOrder = await prisma.todo.aggregate({
      _max: { order: true }
    })
    const newOrder = (maxOrder._max.order || 0) + 1

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        priority: priority || 'MEDIUM',
        categoryId: categoryId || null,
        order: newOrder
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, completed, order, categoryId, dueDate } = body

    console.log('Received update request:', { id: params.id, body })
    console.log('Original categoryId:', categoryId, 'Type:', typeof categoryId)

    // 处理 categoryId：空字符串转换为 null
    const processedCategoryId = categoryId === '' ? null : categoryId
    console.log('Processed categoryId:', processedCategoryId)

    // 处理 dueDate
    let processedDueDate = undefined
    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        processedDueDate = null
      } else {
        try {
          processedDueDate = new Date(dueDate)
          if (isNaN(processedDueDate.getTime())) {
            return NextResponse.json(
              { error: 'Invalid due date format' },
              { status: 400 }
            )
          }
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid due date format' },
            { status: 400 }
          )
        }
      }
    }

    const updateData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed }),
      ...(order !== undefined && { order }),
      ...(categoryId !== undefined && { categoryId: processedCategoryId }),
      ...(dueDate !== undefined && { dueDate: processedDueDate })
    }

    console.log('Update data:', updateData)

    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: true
      }
    })

    console.log('Updated todo:', todo)

    return NextResponse.json(todo)
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const lines = text.split('\n')
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'Invalid CSV file format' },
        { status: 400 }
      )
    }

    // 跳过标题行
    const dataLines = lines.slice(1)
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i].trim()
      if (!line) continue

      try {
        // 简单的CSV解析
        const columns = line.split(',').map(col => col.replace(/^"|"$/g, ''))
        
        if (columns.length < 3) {
          results.failed++
          results.errors.push(`Line ${i + 2}: Invalid format`)
          continue
        }

        const [title, description, status, priority, categoryName] = columns
        
        if (!title) {
          results.failed++
          results.errors.push(`Line ${i + 2}: Title is required`)
          continue
        }

        // 查找或创建分类
        let categoryId = null
        if (categoryName && categoryName !== 'Uncategorized') {
          let category = await prisma.category.findFirst({
            where: { name: categoryName }
          })
          
          if (!category) {
            category = await prisma.category.create({
              data: { name: categoryName }
            })
          }
          categoryId = category.id
        }

        // 获取最大排序值
        const maxOrder = await prisma.todo.aggregate({
          _max: { order: true }
        })
        const newOrder = (maxOrder._max.order || 0) + 1

        await prisma.todo.create({
          data: {
            title: title.trim(),
            description: description?.trim() || null,
            completed: status?.toLowerCase() === 'completed',
            priority: priority || 'MEDIUM',
            categoryId,
            order: newOrder
          }
        })

        results.success++
      } catch (error) {
        results.failed++
        results.errors.push(`Line ${i + 2}: ${error.message}`)
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error importing todos:', error)
    return NextResponse.json(
      { error: 'Failed to import todos' },
      { status: 500 }
    )
  }
}

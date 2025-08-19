'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'
import { cn } from '@/lib/utils'

interface DraggableTodoListProps {
  todos: Todo[]
  selectedCategory: string | null
  onUpdate: (id: string, data: Partial<Todo>) => void
  onDelete: (id: string) => void
  setTodos: (todos: Todo[]) => void
}

export const DraggableTodoList = ({ 
  todos, 
  selectedCategory, 
  onUpdate, 
  onDelete, 
  setTodos 
}: DraggableTodoListProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | 'swap' | null>(null)

  const handleDragStart = (e: React.DragEvent, todoId: string) => {
    console.log('Drag start:', todoId)
    
    // 立即设置拖拽状态
    setIsDragging(true)
    setDragError(null)
    setDraggedId(todoId)
    setDropPosition(null)
    
    // 设置拖拽数据
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', todoId)
    
    // 创建拖拽图像
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 40
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#8b5cf6'
        ctx.fillRect(0, 0, 200, 40)
        ctx.fillStyle = 'white'
        ctx.font = '14px Arial'
        ctx.fillText('📝 拖拽中...', 10, 25)
      }
      e.dataTransfer.setDragImage(canvas, 100, 20)
    } catch (error) {
      console.warn('Failed to create drag image:', error)
      // 如果创建拖拽图像失败，使用默认的
    }
  }

  const handleDragOver = (e: React.DragEvent, todoId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    
    if (draggedId === todoId) {
      setDragOverId(null)
      setDropPosition(null)
      return
    }

    setDragOverId(todoId)
    
    // 计算拖拽位置
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const height = rect.height
    const threshold = height * 0.25 // 减少到25%，使交换区域更大

    if (y < threshold) {
      setDropPosition('before')
    } else if (y > height - threshold) {
      setDropPosition('after')
    } else {
      setDropPosition('swap')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // 只有当鼠标真正离开元素时才清除状态
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverId(null)
      setDropPosition(null)
    }
  }

  const handleDrop = async (e: React.DragEvent, targetTodoId: string) => {
    e.preventDefault()
    console.log('Drop event triggered')
    
    const draggedTodoId = e.dataTransfer.getData('text/plain')
    const currentDropPosition = dropPosition // 保存当前的 dropPosition
    
    // 清理状态
    setIsDragging(false)
    setDragOverId(null)
    setDropPosition(null)
    setDraggedId(null)
    
    console.log('Dragged ID:', draggedTodoId, 'Target ID:', targetTodoId, 'Position:', currentDropPosition)
    
    if (draggedTodoId === targetTodoId) {
      console.log('Same todo, no change needed')
      return
    }

    // 如果没有 dropPosition，默认为交换
    const effectiveDropPosition = currentDropPosition || 'swap'
    console.log(`Dropping ${draggedTodoId} ${effectiveDropPosition} ${targetTodoId}`)

    try {
      // 找到要移动的任务和目标任务的索引
      const draggedIndex = todos.findIndex(todo => todo.id === draggedTodoId)
      const targetIndex = todos.findIndex(todo => todo.id === targetTodoId)
      
      if (draggedIndex === -1 || targetIndex === -1) {
        console.log('Could not find todos in list')
        setDragError('无法找到要移动的任务')
        return
      }

      console.log(`Moving from index ${draggedIndex} to ${targetIndex}, position: ${effectiveDropPosition}`)

      // 创建新的排序数组
      const newTodos = [...todos]
      
      // 计算最终的插入位置
      let finalInsertIndex: number
      
      if (effectiveDropPosition === 'before') {
        // 插入到目标位置之前
        finalInsertIndex = targetIndex
      } else if (effectiveDropPosition === 'after') {
        // 插入到目标位置之后
        finalInsertIndex = targetIndex + 1
      } else if (effectiveDropPosition === 'swap') {
        // 交换位置：直接交换两个元素
        [newTodos[draggedIndex], newTodos[targetIndex]] = [newTodos[targetIndex], newTodos[draggedIndex]]
        
        console.log('Swapped positions:', newTodos.map((t, i) => ({ index: i, id: t.id, title: t.title })))

        // 乐观更新本地状态
        setTodos(newTodos)

        // 批量更新数据库顺序
        console.log('Updating database order...')
        const updatePromises = newTodos.map((todo, index) => 
          onUpdate(todo.id, { order: index + 1 })
        )
        
        await Promise.all(updatePromises)
        console.log('Database order updated successfully')
        return
      } else {
        console.error('Unknown drop position:', effectiveDropPosition)
        return
      }
      
      // 对于 before 和 after 操作，移除原元素并插入到新位置
      const [draggedTodo] = newTodos.splice(draggedIndex, 1)
      
      // 如果移除的元素在插入位置之前，需要调整插入位置
      if (draggedIndex < finalInsertIndex) {
        finalInsertIndex -= 1
      }
      
      // 确保插入位置在有效范围内
      finalInsertIndex = Math.max(0, Math.min(finalInsertIndex, newTodos.length))
      
      // 插入到新位置
      newTodos.splice(finalInsertIndex, 0, draggedTodo)

      console.log('New todos order:', newTodos.map((t, i) => ({ index: i, id: t.id, title: t.title })))

      // 乐观更新本地状态
      setTodos(newTodos)

      // 批量更新数据库顺序
      console.log('Updating database order...')
      const updatePromises = newTodos.map((todo, index) => 
        onUpdate(todo.id, { order: index + 1 })
      )
      
      await Promise.all(updatePromises)
      console.log('Database order updated successfully')
      
    } catch (err) {
      console.error('更新顺序失败:', err)
      setDragError('更新任务顺序失败，请重试')
      // 如果失败，重新加载页面
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const handleDragEnd = () => {
    console.log('Drag end - cleaning up state')
    setIsDragging(false)
    setDragOverId(null)
    setDraggedId(null)
    setDropPosition(null)
  }

  return (
    <div className="space-y-4">
      {/* 拖拽错误提示 */}
      {dragError && (
        <div className="instagram-card rounded-2xl p-4 mb-6 animate-fade-in-up bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-center text-red-600 dark:text-red-400">{dragError}</p>
        </div>
      )}
      
      {todos
        .filter(todo => selectedCategory === null || todo.categoryId === selectedCategory)
        .map((todo, index) => (
          <div
            key={todo.id}
            draggable={true}
            onDragStart={(e) => {
              console.log(`Starting drag for todo at index ${index}, id: ${todo.id}`)
              handleDragStart(e, todo.id)
            }}
            onDragOver={(e) => handleDragOver(e, todo.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              console.log(`Dropping on todo at index ${index}, id: ${todo.id}`)
              handleDrop(e, todo.id)
            }}
            onDragEnd={handleDragEnd}
            className={cn(
              "transition-all duration-300 ease-in-out relative cursor-move",
              draggedId === todo.id && "opacity-30 scale-95 rotate-1 shadow-lg z-10",
              dragOverId === todo.id && draggedId !== todo.id && "bg-purple-50 dark:bg-purple-900/20 border-2 border-dashed border-purple-400 rounded-2xl"
            )}
            style={{ 
              touchAction: 'none',
              userSelect: 'none'
            }}
          >
            {/* 拖拽位置指示器 */}
            {dragOverId === todo.id && draggedId !== todo.id && (
              <>
                {dropPosition === 'before' && (
                  <div className="drag-indicator drag-indicator-before" />
                )}
                {dropPosition === 'after' && (
                  <div className="drag-indicator drag-indicator-after" />
                )}
                {dropPosition === 'swap' && (
                  <div className="drag-indicator drag-indicator-swap" />
                )}
              </>
            )}
            
            <TodoItem
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isDraggable={true}
            />
          </div>
        ))}
    </div>
  )
}

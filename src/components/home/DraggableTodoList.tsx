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
    setIsDragging(true)
    setDragError(null)
    setDraggedId(todoId)
    setDropPosition(null)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', todoId)
    
    // 使用简单的拖拽图像，避免DOM操作影响
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
      // 获取筛选后的任务列表
      const filteredTodos = todos.filter(todo => selectedCategory === null || todo.categoryId === selectedCategory)
      
      // 找到拖拽的源任务和目标任务
      const draggedIndex = filteredTodos.findIndex(todo => todo.id === draggedTodoId)
      const targetIndex = filteredTodos.findIndex(todo => todo.id === targetTodoId)
      
      if (draggedIndex === -1 || targetIndex === -1) {
        console.log('Could not find todos in filtered list')
        setDragError('无法找到要移动的任务')
        return
      }

      console.log(`Moving from index ${draggedIndex} to ${targetIndex}`)

      // 创建新的排序
      const newTodos = [...todos]
      
      // 找到要移动的任务
      const draggedTodoFullIndex = newTodos.findIndex(todo => todo.id === draggedTodoId)
      const targetTodoFullIndex = newTodos.findIndex(todo => todo.id === targetTodoId)
      
      if (draggedTodoFullIndex === -1 || targetTodoFullIndex === -1) {
        console.log('Could not find todos in full list')
        setDragError('无法找到要移动的任务')
        return
      }
      
      // 移除被拖拽的任务
      const [draggedTodo] = newTodos.splice(draggedTodoFullIndex, 1)
      
      // 重新计算目标位置（因为可能有元素被移除了）
      const newTargetIndex = newTodos.findIndex(todo => todo.id === targetTodoId)
      
      // 计算最终插入位置
      let finalInsertIndex = newTargetIndex
      if (effectiveDropPosition === 'before') {
        finalInsertIndex = newTargetIndex
      } else if (effectiveDropPosition === 'after') {
        finalInsertIndex = newTargetIndex + 1
      } else if (effectiveDropPosition === 'swap') {
        finalInsertIndex = newTargetIndex
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
              draggedId === todo.id && "opacity-30 scale-95 rotate-1 shadow-lg",
              dragOverId === todo.id && draggedId !== todo.id && "bg-purple-50 dark:bg-purple-900/20 border-2 border-dashed border-purple-400 rounded-2xl"
            )}
            style={{ touchAction: 'none' }} // 防止移动端滚动干扰
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

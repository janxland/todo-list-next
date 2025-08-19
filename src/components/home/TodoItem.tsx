'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'
import { cn } from '@/lib/utils'
import { Check, Edit, Trash2, X, Save, Calendar, GripVertical } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, data: Partial<Todo>) => void
  onDelete: (id: string) => void
  isDraggable?: boolean
}

export const TodoItem = ({ todo, onUpdate, onDelete, isDraggable = false }: TodoItemProps) => {
  const { categories } = useCategories()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [editCategoryId, setEditCategoryId] = useState(todo.categoryId || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggleComplete = async () => {
    try {
      await onUpdate(todo.id, { completed: !todo.completed })
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const handleSave = async () => {
    if (!editTitle.trim()) return

    setIsSubmitting(true)
    try {
      const updateData = {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
        categoryId: editCategoryId || null
      }
      
      console.log('Sending update data:', updateData)
      console.log('editCategoryId value:', editCategoryId, 'Type:', typeof editCategoryId)
      
      await onUpdate(todo.id, updateData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditCategoryId(todo.categoryId || '')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('确定要删除这个任务吗？')) {
      try {
        await onDelete(todo.id)
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-500'
      case 'HIGH':
        return 'bg-orange-500'
      case 'MEDIUM':
        return 'bg-yellow-500'
      case 'LOW':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className={cn(
      "instagram-card rounded-2xl p-6 hover-lift transition-all duration-150",
      todo.completed && "opacity-75"
    )}>
      {isEditing ? (
        <div className="space-y-4 animate-fade-in-up">
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="instagram-input w-full"
              placeholder="任务标题"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="instagram-input w-full resize-none"
              rows={3}
              placeholder="任务描述（可选）"
            />
            
            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                选择分类（可选）
              </label>
              <select
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(e.target.value)}
                className="instagram-input w-full"
              >
                <option value="">无分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!editTitle.trim() || isSubmitting}
              className="instagram-button flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save size={16} />
                  保存
                </>
              )}
            </button>
            
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-150"
            >
              <X size={16} />
              取消
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {/* 拖拽手柄 */}
            {isDraggable && (
              <div
                className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-200"
                title="拖拽排序"
              >
                <GripVertical size={18} />
              </div>
            )}
            
            <button
              onClick={handleToggleComplete}
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-150 hover-lift",
                todo.completed
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 border-transparent"
                  : "border-gray-300 hover:border-gray-400"
              )}
            >
              {todo.completed && (
                <Check className="w-full h-full text-white p-0.5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-lg font-semibold mb-2 transition-all duration-150",
                    todo.completed && "line-through"
                  )}
                  style={{ color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {todo.title}
                  </h3>
                  
                  {todo.description && (
                    <p className="mb-3 transition-all duration-150"
                    style={{ color: todo.completed ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                      {todo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(todo.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <div className={cn("w-2 h-2 rounded-full", getPriorityColor(todo.priority))}></div>
                      <span className="capitalize">{todo.priority.toLowerCase()}</span>
                    </div>

                    {todo.category && (
                      <div className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", todo.category.color)}></div>
                        <span>{todo.category.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-150"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

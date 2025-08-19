'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'
import { cn } from '@/lib/utils'
import { Check, Edit, Trash2, X, Save } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, data: Partial<Todo>) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed })
  }

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="任务标题"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="任务描述（可选）"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Save size={16} />
              保存
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              取消
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all",
      todo.completed && "opacity-75 bg-gray-50"
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className={cn(
            "flex-shrink-0 w-5 h-5 border-2 rounded-full mt-1 transition-colors",
            todo.completed 
              ? "bg-green-500 border-green-500" 
              : "border-gray-300 hover:border-green-400"
          )}
        >
          {todo.completed && <Check size={12} className="text-white mx-auto" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-medium text-gray-900",
            todo.completed && "line-through text-gray-500"
          )}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={cn(
              "mt-1 text-gray-600",
              todo.completed && "line-through text-gray-400"
            )}>
              {todo.description}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            创建于 {new Date(todo.createdAt).toLocaleString('zh-CN')}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
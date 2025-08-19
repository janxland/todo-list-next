'use client'

import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  selectedCategory: string | null
  onUpdate: (id: string, data: Partial<Todo>) => void
  onDelete: (id: string) => void
}

export const TodoList = ({ todos, selectedCategory, onUpdate, onDelete }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos
        .filter(todo => selectedCategory === null || todo.categoryId === selectedCategory)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
    </div>
  )
}

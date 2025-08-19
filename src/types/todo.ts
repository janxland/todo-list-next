export interface Todo {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: Priority
  order: number
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
  categoryId?: string | null
  category?: Category | null
}

export interface Category {
  id: string
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
  todos?: Todo[]
}

export interface CreateTodoData {
  title: string
  description?: string
  priority?: Priority
  categoryId?: string
  dueDate?: Date
}

export interface UpdateTodoData {
  title?: string
  description?: string
  completed?: boolean
  priority?: Priority
  categoryId?: string
  order?: number
  dueDate?: Date | null
}

export interface CreateCategoryData {
  name: string
  color?: string
}

export interface UpdateCategoryData {
  name?: string
  color?: string
}

export interface SearchHistory {
  id: string
  query: string
  createdAt: Date
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface TodoStats {
  total: number
  completed: number
  pending: number
  completionRate: number
  byPriority: Record<Priority, number>
  byCategory: Record<string, number>
  weeklyTrend: Array<{ date: string; count: number }>
  monthlyTrend: Array<{ month: string; count: number }>
}

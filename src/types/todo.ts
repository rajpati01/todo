export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface TodoFilter {
  search: string
  category: string
  priority: string
  status: 'all' | 'completed' | 'pending'
}
import { Todo } from "@/types/todo"

const STORAGE_KEY = 'advanced-todos'

export const loadTodos = (): Todo[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading todos:', error)
    return []
  }
}

export const saveTodos = (todos: Todo[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos:', error)
  }
}
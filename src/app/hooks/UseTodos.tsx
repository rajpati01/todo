'use client'

import { useState, useEffect, useMemo } from 'react'
import { Todo,} from '@/types/todo'
import { loadTodos, saveTodos } from '../utils/localStorage'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    setTodos(loadTodos())
  }, [])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      completed: false
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates} : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  }), [todos])

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    stats
  }
}

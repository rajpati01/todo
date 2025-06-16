'use client'

import { useState, useEffect } from 'react'
import { Todo, TodoFilter } from '@/types/todo'
import { loadTodos, saveTodos } from '../utils/localStorage'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilter>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all'
  })

  // Load todos from localStorage on mount
  useEffect(() => {
    setTodos(loadTodos())
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id)?.completed })
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(filter.search.toLowerCase())
    const matchesCategory = filter.category === 'all' || todo.category === filter.category
    const matchesPriority = filter.priority === 'all' || todo.priority === filter.priority
    const matchesStatus = filter.status === 'all' || 
                         (filter.status === 'completed' && todo.completed) ||
                         (filter.status === 'pending' && !todo.completed)

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const categories = [...new Set(todos.map(todo => todo.category))]

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length
  }

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    categories,
    stats
  }
}
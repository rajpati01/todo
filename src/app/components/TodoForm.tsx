"use client"

import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'General',
    dueDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onAddTodo({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      completed: false,
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate || undefined
    })

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'General',
      dueDate: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Todo title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <textarea
        placeholder="Description (optional)..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Todo
      </button>
    </form>
  )
}
'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Todo>) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    category: todo.category,
    dueDate: todo.dueDate || ''
  })

  const handleUpdate = () => {
    onUpdate(todo.id, {
      title: editData.title.trim(),
      description: editData.description.trim() || undefined,
      priority: editData.priority,
      category: editData.category,
      dueDate: editData.dueDate || undefined
    })
    setIsEditing(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-300 bg-white'
    }
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  return (
    <div className={`p-4 border-l-4 rounded-lg shadow-sm ${getPriorityColor(todo.priority)} ${
      todo.completed ? 'opacity-60' : ''
    } ${isOverdue ? 'border-red-600 bg-red-100' : ''}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            rows={2}
          />
          <div className="grid grid-cols-3 gap-2">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="px-2 py-1 border rounded text-sm"
            />
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 rounded text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3 mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex gap-4">
              <span className="px-2 py-1 bg-gray-200 rounded">{todo.category}</span>
              <span className={`px-2 py-1 rounded ${
                todo.priority === 'high' ? 'bg-red-200 text-red-800' :
                todo.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {todo.priority.toUpperCase()}
              </span>
              {todo.dueDate && (
                <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
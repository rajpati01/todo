'use client'

import { useTodos } from '../hooks/UseTodos'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default function TodoAppClient() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    stats
  } = useTodos()

  return (
    <div className="space-y-4">
      <TodoForm
        onAdd={formData =>
          addTodo({ ...formData, completed: false })
        }
      />
      <TodoList
        todos={todos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onToggleComplete={toggleComplete}
      />
      <div className="text-sm text-gray-500">
        Total: {stats.total} | Completed: {stats.completed} | Pending: {stats.pending} 
      </div>
    </div>
  )
}

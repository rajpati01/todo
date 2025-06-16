import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Todo>) => void
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onUpdate 
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No todos found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
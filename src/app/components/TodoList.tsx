import { Todo } from '@/types/todo'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
  onUpdate: (id: string, updates: Partial<Todo>) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function TodoList({ todos, onUpdate, onDelete, onToggleComplete }: Props) {
  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}

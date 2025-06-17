import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

export default function TodoItem({ todo, onDelete, onToggleComplete }: Props) {
  return (
    <li
      className="
        flex justify-between items-center border p-3 rounded-md 
        shadow-sm bg-white
        transition transform hover:scale-[1.02] hover:shadow-md
        
      "
    >
      <span
        className={`flex-1 truncate ${
          todo.completed ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {todo.title}
      </span>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="
            text-sm font-medium 
            bg-yellow-400 hover:bg-yellow-500 
            transition-colors px-3 py-1 rounded-md
            focus:outline-none focus:ring-2 focus:ring-yellow-300
          "
          aria-label="Toggle completion"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="
            text-sm font-medium text-white 
            bg-red-500 hover:bg-red-600 
            transition-colors px-3 py-1 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

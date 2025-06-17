import React, { useState } from "react";

type TodoPriority = "low" | "medium" | "high";

type TodoFormProps = {
  onAdd: (todo: {
    title: string;
    description?: string;
    dueDate?: string;
    priority: TodoPriority;
  }) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title, priority });
    setTitle("");
    setPriority("medium");
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* for todo input */}
      <input
        className="border border-gray-300 rounded-md p-2 flex-1
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-300
                    transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
      />

      <button
        onClick={handleSubmit}
        className="
    bg-blue-600 text-white px-5 py-2 rounded-md
    hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
    transition-colors
  "
      >
        Add
      </button>
    </div>
  );
}

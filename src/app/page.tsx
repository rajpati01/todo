import Head from 'next/head'
import { useTodos } from './hooks/UseTodos'
import { TodoForm } from './components/TodoForm'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'
import { TodoList } from './components/TodoList'

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    categories,
    stats
  } = useTodos()

  return (
    <>
      <Head>
        <title>Advanced Todo App</title>
        <meta name="description" content="Advanced todo app with categories, priorities, and search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Advanced Todo App
            </h1>
            <p className="text-gray-600">
              Organize your tasks with categories, priorities, and due dates
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>

          {/* Add Todo Form */}
          <TodoForm onAddTodo={addTodo} />

          {/* Search and Filters */}
          <SearchBar filter={filter} onFilterChange={setFilter} />
          <CategoryFilter
            filter={filter}
            categories={categories}
            onFilterChange={setFilter}
          />

          {/* Todo List */}
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
      </div>
    </>
  )
}
import { TodoFilter } from "@/types/todo"

interface CategoryFilterProps {
  filter: TodoFilter
  categories: string[]
  onFilterChange: (filter: TodoFilter) => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  filter, 
  categories, 
  onFilterChange 
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select
          value={filter.category}
          onChange={(e) => onFilterChange({ ...filter, category: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filter.priority}
          onChange={(e) => onFilterChange({ ...filter, priority: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          value={filter.status}
          onChange={(e) => onFilterChange({ ...filter, status: e.target.value as any })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={() => onFilterChange({
            search: '',
            category: 'all',
            priority: 'all',
            status: 'all'
          })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}
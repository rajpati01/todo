import { TodoFilter } from '@/types/todo'

interface SearchBarProps {
  filter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search todos..."
        value={filter.search}
        onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
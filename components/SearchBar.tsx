import React, { useState, FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-swedish-blue animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-swedish-blue transition-colors duration-200" />
          )}
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-swedish-blue focus:ring-4 focus:ring-swedish-lightBlue transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Search for a Swedish word (e.g., fika, lagom)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute inset-y-2 right-2 px-6 bg-swedish-blue text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swedish-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          Translate
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
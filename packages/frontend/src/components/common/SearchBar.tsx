// components/SearchBar.tsx
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.ts';

interface SearchBarProps {
  onSearch: (query: string) => void;
  getClick: (value: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, getClick }) => {
  const [input, setInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(input, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = () => {
    console.log('handleClick');
    getClick(true);
  };

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        placeholder="Search organizations..."
        value={input}
        onChange={handleChange}
        onClick={handleClick}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
      />
    </div>
  );
};

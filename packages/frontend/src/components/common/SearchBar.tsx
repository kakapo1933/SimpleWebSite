// components/SearchBar.tsx
import React, { useEffect, useState } from 'react';
import { useDebounce } from "../../hooks/useDebounce.ts";

interface SearchBarProps {
  onSearch: (query: string) => void;
  getClick: (value: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  getClick
}) => {
  const [input, setInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(input, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = () => {
    console.log('handleClick');
    getClick(true);
  }

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (<div className="w-full h-full p-2">
    <input
      type="search"
      placeholder="Search organizations..."
      value={input}
      onChange={handleChange}
      onClick={handleClick}
      className="w-full h-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>);
};
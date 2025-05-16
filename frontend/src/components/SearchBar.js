import React, { useState } from 'react';

const SearchBar = ({ onSearch, onCategoryFilter }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    onCategoryFilter(category);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search descriptions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
     <select 
  value={category} 
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>
  <option value="finance">Finance</option>
  <option value="tech">Tech</option>
  <option value="health">Health</option>
</select>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
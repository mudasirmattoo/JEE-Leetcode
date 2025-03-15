import React, { useState, useEffect } from 'react';
import './SearchNavbar.css';

const SearchNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      // Implement dynamic search functionality here
      // This will run whenever searchQuery changes
      console.log('Searching for:', searchQuery);
    };

    // Add debouncing to avoid too many API calls
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="search-navbar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchNavbar;
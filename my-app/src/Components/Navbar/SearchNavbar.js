import React, { useState, useEffect } from 'react';

const SearchNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      console.log('Searching for:', searchQuery);
      // Future: fetch filtered questions based on query
    };

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
    <div className="bg-[#830202] py-4 font-quicksand">
      <div className="mx-auto px-5 w-full">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-base rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white"
          />
          {/* Optional Button if needed in future */}
          {/* <button className="bg-white text-[#830202] px-5 py-2 font-bold rounded-md transition-all hover:bg-gray-100 hover:-translate-y-1">
            Search
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchNavbar;

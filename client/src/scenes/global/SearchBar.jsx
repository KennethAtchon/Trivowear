import React, { useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Make sure to import your CSS file

const SearchBar = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const performSearch = () => {
    navigate(`/searchpage?query=${encodeURIComponent(searchQuery)}`);
    onClose(); // Close the drawer after navigation
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className={`search-bar-container ${open ? 'search-bar-open' : 'search-bar-closed'}`}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="search-input"
      />

      <button
        onClick={performSearch}
        className="search-button"
      >
        <MdSearch />
      </button>

      <button
        onClick={onClose}
        className="close-button"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default SearchBar;

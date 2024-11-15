// src/components/SearchBar.js
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search flavors, cuisines, moods..."
        className="search-bar__input"
      />
      <button className="search-bar__button">
        <FaSearch className="search-bar__icon" />
      </button>
    </div>
  );
}

export default SearchBar;

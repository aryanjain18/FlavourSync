// src/components/SearchBar.js
import React, { useEffect } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function SearchBar() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration in ms
  }, []);

  return (
    <div 
      className="search-bar"
      data-aos="fade-up" // Specify the type of animation
    >
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
AOS.init({
  duration: 1200, // 1.2 seconds
  offset: 50,     // Trigger animation 50px before the element is visible
});

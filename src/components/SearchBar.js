import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/SearchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search/tags?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${value}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.searchBar} ref={searchRef}>
      <div className={styles.searchBox}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Busca GIFOS y más"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <i className="fa fa-search"></i>
            </button>
            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClear}
              >
                <i className="fa fa-close"></i>
              </button>
            )}
          </div>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestions}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.name}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <i className="fa fa-search"></i>
                <span>{suggestion.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 
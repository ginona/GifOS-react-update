import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/SearchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
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
    setError(null);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `/api/giphy/gifs/search/tags?q=${encodeURIComponent(value)}&limit=5`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }
        const data = await response.json();
        if (data.data) {
          setSuggestions(data.data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setError('Failed to load suggestions');
        setSuggestions([]);
        setShowSuggestions(false);
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
    setError(null);
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
              placeholder="Search GIFOS and more"
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
        {error && <div className={styles.error}>{error}</div>}
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
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TrendingGifs from '../components/TrendingGifs';
import GifModal from '../components/GifModal';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `/api/giphy/gifs/search?q=${query}&limit=12`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      // Handle error silently
    }
  };

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>
          Get inspired, search, save, and create <br />
          the best <span>GIFOS</span>
        </h1>
      </section>

      <section className={styles.search}>
        <div className={styles.imageSearch}>
          <img src="/img/ilustra_header.svg" alt="search illustration" />
        </div>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className={styles.results}>
        {searchResults.length > 0 && (
          <div className={styles.containerResults}>
            <ul className={styles.searchResults}>
              {searchResults.map((gif) => (
                <li key={gif.id} onClick={() => handleGifClick(gif)}>
                  <img src={gif.images.fixed_height.url} alt={gif.title} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className={styles.trending}>
        <TrendingGifs onGifClick={handleGifClick} />
      </section>

      {isModalOpen && selectedGif && (
        <GifModal gif={selectedGif} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home; 
import React, { useState, useEffect, useRef } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/TrendingGifs.module.scss';

const TrendingGifs = ({ onGifClick }) => {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [trendingTerms, setTrendingTerms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchTrendingGifs();
    fetchTrendingTerms();
  }, []);

  const fetchTrendingGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=10`
      );
      const data = await response.json();
      setTrendingGifs(data.data);
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    }
  };

  const fetchTrendingTerms = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/trending/searches?api_key=${import.meta.env.VITE_GIPHY_API_KEY}`
      );
      const data = await response.json();
      setTrendingTerms(data.data);
    } catch (error) {
      console.error('Error fetching trending terms:', error);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < trendingGifs.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFavoriteClick = (e, gif) => {
    e.stopPropagation();
    toggleFavorite(gif);
  };

  return (
    <div className={styles.trendingSection}>
      <div className={styles.trendText}>
        <h2>Trending: </h2>
        <div className={styles.randomTrend}>
          {trendingTerms.slice(0, 3).map((term, index) => (
            <span key={index} className={styles.trendTerm}>
              {term}
              {index < Math.min(2, trendingTerms.length - 1) && ', '}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.trGifs}>
        <div className={styles.textInside}>
          <h2>Trending GIFOS</h2>
        </div>

        <div className={styles.carousel}>
          <button
            className={`${styles.slickArrow} ${styles.slickPrev}`}
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <i className="fa fa-chevron-left"></i>
          </button>

          <div className={styles.slickList}>
            <div
              className={styles.slickTrack}
              ref={trackRef}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {trendingGifs.map((gif) => (
                <div
                  key={gif.id}
                  className={styles.gifCard}
                  onClick={() => onGifClick(gif)}
                >
                  <img src={gif.images.fixed_height.url} alt={gif.title} />
                  <div className={styles.gifOverlay}>
                    <div className={styles.gifActions}>
                      <button 
                        className={`${styles.actionBtn} ${isFavorite(gif.id) ? styles.favorite : ''}`}
                        onClick={(e) => handleFavoriteClick(e, gif)}
                      >
                        <i className="fa fa-heart"></i>
                      </button>
                      <button className={styles.actionBtn}>
                        <i className="fa fa-download"></i>
                      </button>
                      <button className={styles.actionBtn}>
                        <i className="fa fa-expand"></i>
                      </button>
                    </div>
                    <div className={styles.gifInfo}>
                      <p className={styles.gifUser}>{gif.username || 'Anónimo'}</p>
                      <p className={styles.gifTitle}>{gif.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.slickArrow} ${styles.slickNext}`}
            onClick={handleNextClick}
            disabled={currentIndex >= trendingGifs.length - 3}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingGifs; 
import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useFavorites } from '../context/FavoritesContext';
import GifCard from './GifCard';
import GifModal from './GifModal';
import styles from '../styles/Favoritos.module.scss';

const Favoritos = () => {
  const { isDarkMode } = useDarkMode();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };

  const handleFavoriteClick = (e, gif) => {
    e.stopPropagation();
    toggleFavorite(gif);
  };

  const handleDownload = (e, gif) => {
    e.stopPropagation();
    window.open(gif.images.original.url, '_blank');
  };

  return (
    <div className={`${styles.favoritosContainer} ${isDarkMode ? styles.darkMode : ''}`}>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <img src="/img/icon-fav-sin-contenido.svg" alt="No favorites" />
          <p>Save your first GIFO!</p>
        </div>
      ) : (
        <div className={styles.favoritosGrid}>
          {favorites.map((gif) => (
            <GifCard
              key={gif.id}
              gif={gif}
              onGifClick={handleGifClick}
              onFavoriteClick={handleFavoriteClick}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
      {isModalOpen && selectedGif && (
        <GifModal
          gif={selectedGif}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Favoritos; 
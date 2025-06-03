import React, { useState, useEffect } from 'react';
import GifModal from '../components/GifModal';
import styles from '../styles/Favoritos.module.scss';

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };

  const removeFavorite = (gifId) => {
    const updatedFavorites = favorites.filter(gif => gif.id !== gifId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favoritos}>
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <img src="/img/icon-fav-sin-contenido.svg" alt="No hay favoritos" />
          <p>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</p>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((gif) => (
            <div key={gif.id} className={styles.gifCard}>
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => handleGifClick(gif)}
              />
              <div className={styles.gifOverlay}>
                <div className={styles.gifActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => removeFavorite(gif.id)}
                  >
                    <i className="fa fa-trash"></i>
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
      )}

      {isModalOpen && selectedGif && (
        <GifModal gif={selectedGif} onClose={closeModal} />
      )}
    </div>
  );
};

export default Favoritos; 
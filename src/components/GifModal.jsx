import React, { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/GifModal.module.scss';

const GifModal = ({ gif, onClose }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(gif.images.original.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${gif.title || 'gif'}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading GIF:', error);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(gif);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        <div className={styles.gifContainer}>
          <img src={gif.images.original.url} alt={gif.title} />
          <div className={styles.gifInfo}>
            <div className={styles.userInfo}>
              <p className={styles.username}>{gif.username || 'Anonymous'}</p>
              <p className={styles.title}>{gif.title}</p>
            </div>
            <div className={styles.actions}>
              <button 
                className={`${styles.actionBtn} ${isFavorite(gif.id) ? styles.favorite : ''}`}
                onClick={handleFavoriteClick}
              >
                <i className="fa fa-heart"></i>
              </button>
              <button 
                className={styles.actionBtn}
                onClick={handleDownload}
              >
                <i className="fa fa-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifModal; 
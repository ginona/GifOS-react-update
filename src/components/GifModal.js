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

  const handleDownload = async () => {
    try {
      const response = await fetch(gif.images.original.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gif.title || 'gif'}.gif`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
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
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        <div className={styles.modalContent}>
          <img
            src={gif.images.original.url}
            alt={gif.title}
            className={styles.modalImage}
          />
          <div className={styles.modalInfo}>
            <div className={styles.userInfo}>
              <p className={styles.username}>{gif.username || 'Anónimo'}</p>
              <h3 className={styles.title}>{gif.title}</h3>
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton} onClick={handleDownload}>
                <i className="fa fa-download"></i>
              </button>
              <button 
                className={`${styles.actionButton} ${isFavorite(gif.id) ? styles.favorite : ''}`}
                onClick={handleFavoriteClick}
              >
                <i className="fa fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifModal; 
import React from 'react';
import styles from '../styles/GifCard.module.scss';

const GifCard = ({ gif, onGifClick, onFavoriteClick, onDownload }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick(e, gif);
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDownload) {
      onDownload(e, gif);
    }
  };

  const handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onGifClick) {
      onGifClick(gif);
    }
  };

  if (!gif) {
    console.warn('GifCard received no gif prop');
    return null;
  }

  return (
    <div className={styles.gifCard}>
      <img src={gif.images.fixed_height.url} alt={gif.title} />
      <div className={styles.gifOverlay}>
        <div className={styles.gifActions}>
          <button 
            className={styles.actionBtn}
            onClick={handleFavoriteClick}
            type="button"
            aria-label="Add to favorites"
          >
            <i className="fa fa-heart"></i>
          </button>
          <button 
            className={styles.actionBtn}
            onClick={handleDownload}
            type="button"
            aria-label="Download GIF"
          >
            <i className="fa fa-download"></i>
          </button>
          <button 
            className={styles.actionBtn}
            onClick={handleExpand}
            type="button"
            aria-label="Expand GIF"
          >
            <i className="fa fa-expand"></i>
          </button>
        </div>
        <div className={styles.gifInfo}>
          <p className={styles.gifUser}>{gif.username || 'Anonymous'}</p>
          <p className={styles.gifTitle}>{gif.title}</p>
        </div>
      </div>
    </div>
  );
};

export default GifCard; 
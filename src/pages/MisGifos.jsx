import React, { useState, useEffect } from 'react';
import GifModal from '../components/GifModal';
import styles from '../styles/MisGifos.module.scss';

const MisGifos = () => {
  const [myGifs, setMyGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedGifs = localStorage.getItem('myGifs');
    if (savedGifs) {
      setMyGifs(JSON.parse(savedGifs));
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

  const deleteGif = (gifId) => {
    const updatedGifs = myGifs.filter(gif => gif.id !== gifId);
    setMyGifs(updatedGifs);
    localStorage.setItem('myGifs', JSON.stringify(updatedGifs));
  };

  return (
    <div className={styles.misGifos}>
      <h1>Mis GIFOS</h1>
      {myGifs.length === 0 ? (
        <div className={styles.emptyState}>
          <img src="/img/icon-mis-gifos-sin-contenido.svg" alt="No hay GIFs creados" />
          <p>¡Anímate a crear tu primer GIFO!</p>
        </div>
      ) : (
        <div className={styles.gifsGrid}>
          {myGifs.map((gif) => (
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
                    onClick={() => deleteGif(gif.id)}
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

export default MisGifos; 
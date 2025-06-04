import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import styles from '../styles/Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img 
            className={`${styles.logo} ${isDarkMode ? styles.hideD : styles.hideL}`} 
            src="/img/logo-mobile.svg" 
            alt="logo1" 
          />
          <img 
            className={`${styles.logo} ${isDarkMode ? styles.hideL : styles.hideD}`} 
            src="/img/logo-desktop-modo-noc.svg" 
            alt="logo2" 
          />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? styles.active : ''}
                onClick={closeMenu}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/favoritos"
                className={location.pathname === '/favoritos' ? styles.active : ''}
                onClick={closeMenu}
              >
                Favoritos
              </Link>
            </li>
            <li>
              <Link
                to="/mis-gifos"
                className={location.pathname === '/mis-gifos' ? styles.active : ''}
                onClick={closeMenu}
              >
                Mis Gifos
              </Link>
            </li>
            <li>
              <Link
                to="/crear-gifos"
                className={location.pathname === '/crear-gifos' ? styles.active : ''}
                onClick={closeMenu}
              >
                Crear Gifos
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <button 
            className={`${styles.changeBtn} ${isDarkMode ? styles.hideL : styles.hideD}`}
            onClick={toggleDarkMode}
          >
            Modo Diurno
          </button>
          <button 
            className={`${styles.changeBtn} ${isDarkMode ? styles.hideD : styles.hideL}`}
            onClick={toggleDarkMode}
          >
            Modo Nocturno
          </button>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            <i className={`fa fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
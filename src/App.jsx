import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import MisGifos from './pages/MisGifos';
import CrearGifos from './pages/CrearGifos';
import { DarkModeProvider } from './context/DarkModeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import styles from './styles/App.module.scss';

function App() {
  return (
    <DarkModeProvider>
      <FavoritesProvider>
        <Router>
          <div className={styles.app}>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/mis-gifos" element={<MisGifos />} />
                <Route path="/crear-gifos" element={<CrearGifos />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </DarkModeProvider>
  );
}

export default App; 
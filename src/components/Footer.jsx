import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.redes}>
        <div className={styles.socialMediaFooter}>
          <h4>Share on:</h4>
          <div className={styles.socialMedia}>
            <a
              href="https://www.facebook.com/Acamica.org/"
              className="fa fa-facebook-f"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href="https://twitter.com/Acamica_com"
              className="fa fa-twitter"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a
              href="https://www.instagram.com/acamica/?hl=es-la"
              className="fa fa-instagram"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© GINONA 2025 All Rights Reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer; 
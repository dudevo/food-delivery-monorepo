import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>
            © {currentYear} Restaurant Management Platform. All rights reserved.
          </p>
          <div className={styles.footerLinks}>
            <a href="/help" className={styles.footerLink}>
              Help Center
            </a>
            <a href="/terms" className={styles.footerLink}>
              Terms of Service
            </a>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.supportInfo}>
            <span className={styles.supportIcon}>🆘</span>
            <span>Need help?</span>
            <a href="tel:+1-800-RESTAURANT" className={styles.supportPhone}>
              1-800-RESTAURANT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
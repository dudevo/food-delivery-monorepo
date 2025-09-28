import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link href="/help" className={styles.link}>
            Help & Support
          </Link>
          <Link href="/safety" className={styles.link}>
            Safety
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
          <Link href="/privacy" className={styles.link}>
            Privacy
          </Link>
        </div>

        <div className={styles.support}>
          <svg className={styles.supportIcon} viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>24/7 Support</span>
        </div>

        <div className={styles.copyright}>
          © 2024 Courier App. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>© {new Date().getFullYear()} FoodDash Affiliates. All rights reserved.</span>
        <div className={styles.linkGroup}>
          <a className={styles.linkButton} href="#" aria-label="View affiliate help center">
            Help Center
          </a>
          <a className={styles.linkButton} href="#" aria-label="Email affiliate support">
            support@fooddash.com
          </a>
          <a className={styles.linkButton} href="#" aria-label="Read program terms">
            Terms
          </a>
          <a className={styles.linkButton} href="#" aria-label="Read privacy policy">
            Privacy
          </a>
        </div>
      </div>
      <span>Need urgent help? Call us 24/7 at (800) 555-0198.</span>
    </footer>
  )
}

export default Footer

import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>FoodDelivery</h3>
            <p className={styles.description}>
              Delivering delicious food from your favorite restaurants to your doorstep.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>📘</a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>🐦</a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <nav className={styles.linkList} aria-label="Footer navigation">
              <Link href="/restaurants" className={styles.link}>Restaurants</Link>
              <Link href="/cuisines" className={styles.link}>Cuisines</Link>
              <Link href="/offers" className={styles.link}>Offers</Link>
              <Link href="/become-partner" className={styles.link}>Partner with us</Link>
            </nav>
          </div>

          {/* Support */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Support</h4>
            <nav className={styles.linkList} aria-label="Support links">
              <Link href="/help" className={styles.link}>Help Center</Link>
              <Link href="/contact" className={styles.link}>Contact Us</Link>
              <Link href="/track-order" className={styles.link}>Track Order</Link>
              <Link href="/refund" className={styles.link}>Refund Policy</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Legal</h4>
            <nav className={styles.linkList} aria-label="Legal links">
              <Link href="/terms" className={styles.link}>Terms of Service</Link>
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link href="/cookies" className={styles.link}>Cookie Policy</Link>
              <Link href="/disclaimer" className={styles.link}>Disclaimer</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 FoodDelivery. All rights reserved.
          </p>
          <div className={styles.appLinks}>
            <a href="#" className={styles.appLink} aria-label="Download on App Store">
              📱 App Store
            </a>
            <a href="#" className={styles.appLink} aria-label="Get it on Google Play">
              🤖 Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
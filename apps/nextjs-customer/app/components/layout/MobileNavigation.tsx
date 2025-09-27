'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './MobileNavigation.module.scss'

interface NavItem {
  href: string
  icon: string
  label: string
  badge?: number
}

const navItems: NavItem[] = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/restaurants', icon: '🔍', label: 'Search' },
  { href: '/cart', icon: '🛒', label: 'Cart', badge: 2 },
  { href: '/orders', icon: '📋', label: 'Orders' },
  { href: '/profile', icon: '👤', label: 'Profile' }
]

export default function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className={styles.mobileNav} role="navigation" aria-label="Mobile navigation">
      <div className={styles.navItems}>
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
                {item.badge && (
                  <span className={styles.badge} aria-label={`${item.badge} items`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
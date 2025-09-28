'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  isOpen?: boolean
  isCollapsed?: boolean
  onClose?: () => void
  activeOrdersCount?: number
}

export default function Sidebar({
  isOpen = true,
  isCollapsed = false,
  onClose,
  activeOrdersCount = 0
}: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/orders/active',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 5a1 1 0 01-1 1H8a1 1 0 110-2h4a1 1 0 011 1zm-1 4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Active Orders',
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined
    },
    {
      href: '/orders/available',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Available Orders'
    },
    {
      href: '/earnings',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-6-8a6 6 0 1112 0 6 6 0 01-12 0zm4.5-3.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H10v1.849c.938.098 1.5.732 1.5 1.651s-.562 1.553-1.5 1.651V15a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5v-.849c-.938-.098-1.5-.732-1.5-1.651s.562-1.553 1.5-1.651V9.5H8a.5.5 0 01-.5-.5V8a.5.5 0 01.5-.5h.5V7a.5.5 0 01.5-.5z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Earnings'
    }
  ]

  const profileItems = [
    {
      href: '/profile',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Profile'
    },
    {
      href: '/settings',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Settings'
    }
  ]

  const sidebarClass = [
    styles.sidebar,
    isCollapsed && styles['sidebar--collapsed'],
    !isOpen && styles['sidebar--hidden']
  ].filter(Boolean).join(' ')

  const overlayClass = [
    styles.overlay,
    isOpen && styles['overlay--visible']
  ].filter(Boolean).join(' ')

  return (
    <>
      <div className={overlayClass} onClick={onClose} />
      <aside className={sidebarClass}>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const itemClass = [
              styles.navItem,
              isActive && styles['navItem--active']
            ].filter(Boolean).join(' ')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={itemClass}
                onClick={onClose}
              >
                {item.icon}
                <span className={styles.navText}>{item.label}</span>
                {item.badge && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </Link>
            )
          })}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Account</h3>
            {profileItems.map((item) => {
              const isActive = pathname === item.href
              const itemClass = [
                styles.navItem,
                isActive && styles['navItem--active']
              ].filter(Boolean).join(' ')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={itemClass}
                  onClick={onClose}
                >
                  {item.icon}
                  <span className={styles.navText}>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
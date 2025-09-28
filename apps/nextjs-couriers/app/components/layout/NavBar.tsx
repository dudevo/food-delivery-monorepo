'use client'

import { useState } from 'react'
import styles from './NavBar.module.scss'

interface NavBarProps {
  onToggleMenu?: () => void
  isOnline?: boolean
  onToggleStatus?: (online: boolean) => void
  userName?: string
}

export default function NavBar({
  onToggleMenu,
  isOnline = false,
  onToggleStatus,
  userName = "J"
}: NavBarProps) {
  const [online, setOnline] = useState(isOnline)

  const handleStatusToggle = () => {
    const newStatus = !online
    setOnline(newStatus)
    onToggleStatus?.(newStatus)
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.brand}>
        <button
          className={styles.menuButton}
          onClick={onToggleMenu}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        <div className={styles.brandMark}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM6 7a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" />
          </svg>
        </div>

        <span className={styles.brandText}>Courier</span>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.statusToggle} ${online ? styles['statusToggle--online'] : styles['statusToggle--offline']}`}
          onClick={handleStatusToggle}
          aria-label={`Go ${online ? 'offline' : 'online'}`}
        >
          <span className={styles.statusIndicator} />
          {online ? 'Online' : 'Offline'}
        </button>

        <button
          className={styles.profileButton}
          aria-label="Profile"
        >
          {userName}
        </button>
      </div>
    </nav>
  )
}
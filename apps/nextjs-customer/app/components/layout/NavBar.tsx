'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './NavBar.module.scss'

interface NavBarProps {
  currentUser?: {
    name: string
    avatar?: string
  }
}

export default function NavBar({ currentUser }: NavBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="FoodDelivery Home">
          <span className={styles.logoIcon}>🍔</span>
          <span className={styles.logoText}>FoodDelivery</span>
        </Link>

        {/* Search Bar */}
        <div className={`${styles.searchContainer} ${isSearchFocused ? styles.focused : ''}`}>
          <div className={styles.searchInput}>
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={styles.input}
              aria-label="Search restaurants"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.rightSection}>
          {/* Cart Icon */}
          <Link href="/cart" className={styles.cartButton} aria-label="Shopping cart">
            <span className={styles.cartIcon} aria-hidden="true">🛒</span>
            <span className={styles.cartBadge}>2</span>
          </Link>

          {/* User Account */}
          {currentUser ? (
            <div className={styles.userMenu}>
              <button className={styles.userButton} aria-label="User menu">
                {currentUser.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className={styles.avatar}
                  />
                ) : (
                  <span className={styles.avatarPlaceholder}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className={styles.userName}>{currentUser.name}</span>
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link href="/login" className={styles.loginButton}>
                Sign In
              </Link>
              <Link href="/signup" className={styles.signupButton}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
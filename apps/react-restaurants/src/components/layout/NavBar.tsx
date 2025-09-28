import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NavBar.module.scss';

interface NavBarProps {
  onMenuToggle: () => void;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/orders': 'Orders Management',
  '/menu': 'Menu Management',
  '/analytics': 'Analytics & Reports',
  '/profile': 'Restaurant Profile',
  '/settings': 'Settings'
};

const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  '/': [{ label: 'Dashboard' }],
  '/orders': [{ label: 'Management', path: '/' }, { label: 'Orders' }],
  '/menu': [{ label: 'Management', path: '/' }, { label: 'Menu' }],
  '/analytics': [{ label: 'Analytics' }],
  '/profile': [{ label: 'Settings', path: '/settings' }, { label: 'Profile' }],
  '/settings': [{ label: 'Settings' }]
};

export const NavBar: React.FC<NavBarProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitle = routeTitles[location.pathname] || 'Dashboard';
  const breadcrumbs = routeBreadcrumbs[location.pathname] || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
    setUserDropdownOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <button
          className={styles.menuToggle}
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          {breadcrumbs.length > 1 && (
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className={styles.breadcrumbSeparator} aria-hidden="true">
                      /
                    </span>
                  )}
                  {item.path ? (
                    <a href={item.path} className={styles.breadcrumbItem}>
                      {item.label}
                    </a>
                  ) : (
                    <span className={`${styles.breadcrumbItem} ${styles['breadcrumbItem--current']}`}>
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>

      <div className={styles.navbarRight}>
        <div className={styles.actions}>
          <button
            className={styles.notificationButton}
            aria-label="Notifications"
          >
            🔔
            {hasNotifications && (
              <span className={styles.notificationBadge} aria-hidden="true" />
            )}
          </button>

          <div className={styles.userMenu} ref={dropdownRef}>
            <button
              className={styles.userButton}
              onClick={handleUserMenuClick}
              aria-label="User menu"
              aria-expanded={userDropdownOpen}
            >
              <div className={styles.userAvatar}>
                R
              </div>
              <span className={styles.userName}>Restaurant Owner</span>
              <span aria-hidden="true">▼</span>
            </button>

            <div className={`${styles.userDropdown} ${userDropdownOpen ? styles['userDropdown--open'] : ''}`}>
              <a href="/profile" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>👤</span>
                Profile
              </a>
              <a href="/settings" className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>⚙️</span>
                Settings
              </a>
              <button onClick={handleLogout} className={styles.dropdownItem}>
                <span className={styles.dropdownIcon}>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
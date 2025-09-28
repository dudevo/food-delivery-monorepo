import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MobileNavigation.module.scss';

interface MobileNavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

const mobileNavItems: MobileNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
  { id: 'orders', label: 'Orders', icon: '📋', path: '/orders', badge: 5 },
  { id: 'menu', label: 'Menu', icon: '🍽️', path: '/menu' },
  { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
  { id: 'profile', label: 'Profile', icon: '⚙️', path: '/profile' }
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {mobileNavItems.map((item) => {
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={`${styles.mobileNavItem} ${isActive ? styles['mobileNavItem--active'] : ''}`}
          >
            <span className={styles.mobileNavIcon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={styles.mobileNavLabel}>
              {item.label}
            </span>
            {item.badge && (
              <span className={styles.badge} aria-label={`${item.badge} new items`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
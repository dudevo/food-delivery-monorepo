import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onItemClick?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'orders', label: 'Orders', icon: '📋', path: '/orders', badge: 5 },
      { id: 'menu', label: 'Menu', icon: '🍽️', path: '/menu' },
      { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { id: 'profile', label: 'Restaurant Profile', icon: '🏪', path: '/profile' },
      { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onItemClick
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <NavLink to="/" className={styles.sidebarLogo}>
          {isCollapsed ? 'R' : 'Restaurant'}
        </NavLink>
        <button
          className={styles.collapseToggle}
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        {navigationSections.map((section) => (
          <div key={section.title} className={styles.navSection}>
            {!isCollapsed && (
              <h3 className={styles.navSectionTitle}>
                {section.title}
              </h3>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles['navItem--active'] : ''}`
                }
                onClick={onItemClick}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={styles.navLabel}>
                  {item.label}
                </span>
                {item.badge && !isCollapsed && (
                  <span className={styles.badge}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};
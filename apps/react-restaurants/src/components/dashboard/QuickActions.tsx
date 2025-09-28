import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickActions.module.scss';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const quickActions: QuickAction[] = [
  { id: 'orders', label: 'View Orders', icon: '📋', href: '/orders' },
  { id: 'menu', label: 'Manage Menu', icon: '🍽️', href: '/menu' },
  { id: 'analytics', label: 'Analytics', icon: '📈', href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' }
];

export const QuickActions: React.FC = () => {
  return (
    <div className={styles.quickActions}>
      <h2 className={styles.quickActionsTitle}>
        <span>⚡</span>
        Quick Actions
      </h2>

      <div className={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <Link
            key={action.id}
            to={action.href}
            className={styles.quickActionItem}
          >
            <div className={styles.quickActionIcon}>
              {action.icon}
            </div>
            <span className={styles.quickActionLabel}>
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
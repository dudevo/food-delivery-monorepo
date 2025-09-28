import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Input';
import { SettingsSection } from '../settings/SettingsSection';
import styles from './ActivityLog.module.scss';

interface Activity {
  id: string;
  type: 'login' | 'logout' | 'profile_update' | 'password_change' | 'settings_change' | 'order_action' | 'menu_update';
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  details?: Record<string, unknown>;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'login',
    description: 'Logged in to dashboard',
    timestamp: '2024-01-15T09:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0 on macOS',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    type: 'menu_update',
    description: 'Updated "Margherita Pizza" menu item',
    timestamp: '2024-01-15T10:15:00Z',
    ipAddress: '192.168.1.100',
    details: { itemId: 'pizza-margherita', field: 'price', oldValue: '$16.99', newValue: '$17.99' }
  },
  {
    id: '3',
    type: 'order_action',
    description: 'Confirmed order #ORD-2024-001234',
    timestamp: '2024-01-15T11:22:00Z',
    ipAddress: '192.168.1.100',
    details: { orderId: 'ORD-2024-001234', action: 'confirmed' }
  },
  {
    id: '4',
    type: 'settings_change',
    description: 'Updated notification preferences',
    timestamp: '2024-01-15T14:45:00Z',
    ipAddress: '192.168.1.100',
    details: { section: 'notifications', changes: ['email_orders', 'push_notifications'] }
  },
  {
    id: '5',
    type: 'profile_update',
    description: 'Updated personal information',
    timestamp: '2024-01-14T16:30:00Z',
    ipAddress: '192.168.1.100',
    details: { fields: ['phone', 'bio'] }
  },
  {
    id: '6',
    type: 'login',
    description: 'Logged in via mobile app',
    timestamp: '2024-01-14T08:15:00Z',
    ipAddress: '192.168.1.101',
    userAgent: 'Mobile App iOS 1.2.0',
    location: 'San Francisco, CA'
  },
  {
    id: '7',
    type: 'password_change',
    description: 'Password changed successfully',
    timestamp: '2024-01-13T19:45:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0 on macOS'
  },
  {
    id: '8',
    type: 'logout',
    description: 'Logged out of dashboard',
    timestamp: '2024-01-13T18:30:00Z',
    ipAddress: '192.168.1.100'
  }
];

export const ActivityLog: React.FC = () => {
  const [activities] = useState<Activity[]>(mockActivities);
  const [filter, setFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('7days');

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return '🔑';
      case 'logout':
        return '🚪';
      case 'profile_update':
        return '👤';
      case 'password_change':
        return '🔒';
      case 'settings_change':
        return '⚙️';
      case 'order_action':
        return '📋';
      case 'menu_update':
        return '🍽️';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return 'success';
      case 'logout':
        return 'warning';
      case 'profile_update':
        return 'info';
      case 'password_change':
        return 'primary';
      case 'settings_change':
        return 'secondary';
      case 'order_action':
        return 'success';
      case 'menu_update':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const handleExportLogs = () => {
    // In a real app, this would export activity logs
    const csvContent = [
      'Timestamp,Type,Description,IP Address,Location',
      ...filteredActivities.map(activity =>
        `${activity.timestamp},${activity.type},${activity.description},${activity.ipAddress || 'N/A'},${activity.location || 'N/A'}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity-log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SettingsSection
      title="Activity Log"
      description="View your recent account activity and login history"
      actions={
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <Button variant="outline" size="sm" onClick={handleExportLogs}>
            Export Logs
          </Button>
        </div>
      }
    >
      <div className={styles.filtersSection}>
        <div className={styles.filters}>
          <Select
            label="Filter by Type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="activity-filter"
          >
            <option value="all">All Activities</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="profile_update">Profile Updates</option>
            <option value="password_change">Password Changes</option>
            <option value="settings_change">Settings Changes</option>
            <option value="order_action">Order Actions</option>
            <option value="menu_update">Menu Updates</option>
          </Select>

          <Select
            label="Time Range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            id="time-range"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </Select>
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'}
        </div>
      </div>

      <div className={styles.activityList}>
        {filteredActivities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <span className={`${styles.iconBadge} ${styles[`iconBadge--${getActivityColor(activity.type)}`]}`}>
                {getActivityIcon(activity.type)}
              </span>
            </div>

            <div className={styles.activityContent}>
              <div className={styles.activityMain}>
                <h4 className={styles.activityDescription}>{activity.description}</h4>
                <span className={styles.activityTime}>{formatTimestamp(activity.timestamp)}</span>
              </div>

              <div className={styles.activityMeta}>
                {activity.ipAddress && (
                  <span className={styles.metaItem}>
                    IP: {activity.ipAddress}
                  </span>
                )}
                {activity.location && (
                  <span className={styles.metaItem}>
                    📍 {activity.location}
                  </span>
                )}
                {activity.userAgent && (
                  <span className={styles.metaItem}>
                    🖥️ {activity.userAgent}
                  </span>
                )}
              </div>

              {activity.details && (
                <div className={styles.activityDetails}>
                  <details className={styles.detailsToggle}>
                    <summary>View Details</summary>
                    <pre className={styles.detailsContent}>
                      {JSON.stringify(activity.details, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>No activities found</h3>
            <p className={styles.emptyDescription}>
              No activities match your current filter criteria
            </p>
          </div>
        )}
      </div>
    </SettingsSection>
  );
};
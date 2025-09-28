import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { SettingsSection } from './SettingsSection';
import styles from './NotificationSettings.module.scss';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const initialNotifications: NotificationSetting[] = [
  {
    id: 'new-orders',
    label: 'New Orders',
    description: 'Get notified when new orders are placed',
    email: true,
    push: true,
    sms: true
  },
  {
    id: 'order-updates',
    label: 'Order Status Updates',
    description: 'Notifications when order status changes (confirmed, preparing, ready)',
    email: true,
    push: true,
    sms: false
  },
  {
    id: 'payment-received',
    label: 'Payment Received',
    description: 'Confirmation when payments are processed',
    email: true,
    push: false,
    sms: false
  },
  {
    id: 'daily-summary',
    label: 'Daily Summary',
    description: 'End-of-day reports with sales and order statistics',
    email: true,
    push: false,
    sms: false
  },
  {
    id: 'low-inventory',
    label: 'Low Inventory Alerts',
    description: 'Warnings when menu items are running low',
    email: true,
    push: true,
    sms: false
  },
  {
    id: 'reviews-ratings',
    label: 'Reviews & Ratings',
    description: 'New customer reviews and rating updates',
    email: true,
    push: true,
    sms: false
  },
  {
    id: 'promotions',
    label: 'Marketing & Promotions',
    description: 'Updates about new features, tips, and promotional opportunities',
    email: false,
    push: false,
    sms: false
  }
];

export const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (id: string, type: 'email' | 'push' | 'sms') => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, [type]: !notification[type] }
          : notification
      )
    );
    setHasChanges(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      alert('Notification settings updated successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setNotifications(initialNotifications);
    setHasChanges(false);
  };

  return (
    <SettingsSection
      title="Notification Preferences"
      description="Choose how you want to be notified about important restaurant activities"
      actions={
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges || isSubmitting}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <div className={styles.notificationTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Notification Type</div>
          <div className={styles.headerCell}>Email</div>
          <div className={styles.headerCell}>Push</div>
          <div className={styles.headerCell}>SMS</div>
        </div>

        {notifications.map((notification) => (
          <div key={notification.id} className={styles.tableRow}>
            <div className={styles.notificationInfo}>
              <h4 className={styles.notificationLabel}>{notification.label}</h4>
              <p className={styles.notificationDescription}>{notification.description}</p>
            </div>

            <div className={styles.toggleCell}>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notification.email}
                  onChange={() => handleToggle(notification.id, 'email')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.toggleCell}>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notification.push}
                  onChange={() => handleToggle(notification.id, 'push')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.toggleCell}>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={notification.sms}
                  onChange={() => handleToggle(notification.id, 'sms')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
};
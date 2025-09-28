import React from 'react';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import styles from './Dashboard.module.scss';

interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  time: string;
}

const recentActivities: ActivityItem[] = [
  { id: '1', icon: '📋', text: 'New order #1234 received', time: '2 minutes ago' },
  { id: '2', icon: '🍕', text: 'Pizza Margherita marked as ready', time: '5 minutes ago' },
  { id: '3', icon: '⭐', text: 'New 5-star review received', time: '10 minutes ago' },
  { id: '4', icon: '💰', text: 'Daily sales target reached', time: '1 hour ago' },
  { id: '5', icon: '🍽️', text: 'Burger Special added to menu', time: '2 hours ago' }
];

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Welcome back!</h1>
        <p className={styles.dashboardSubtitle}>
          Here's what's happening with your restaurant today.
        </p>
      </header>

      <div className={styles.metricsGrid}>
        <DashboardCard
          title="New Orders Today"
          value={24}
          icon="📋"
          iconVariant="primary"
          subtext="Since 9:00 AM"
          trend={{ value: '+12%', direction: 'positive' }}
          footerLink={{ text: 'View all orders', href: '/orders' }}
          onClick={() => window.location.href = '/orders'}
        />

        <DashboardCard
          title="Today's Revenue"
          value="$1,248"
          icon="💰"
          iconVariant="success"
          subtext="From 24 orders"
          trend={{ value: '+8%', direction: 'positive' }}
          footerLink={{ text: 'View analytics', href: '/analytics' }}
          onClick={() => window.location.href = '/analytics'}
        />

        <DashboardCard
          title="Active Menu Items"
          value={42}
          icon="🍽️"
          iconVariant="secondary"
          subtext="3 out of stock"
          trend={{ value: '+2', direction: 'positive' }}
          footerLink={{ text: 'Manage menu', href: '/menu' }}
          onClick={() => window.location.href = '/menu'}
        />

        <DashboardCard
          title="Average Rating"
          value="4.8"
          icon="⭐"
          iconVariant="warning"
          subtext="From 156 reviews"
          trend={{ value: '+0.2', direction: 'positive' }}
          footerLink={{ text: 'View reviews', href: '/analytics#reviews' }}
          onClick={() => window.location.href = '/analytics#reviews'}
        />
      </div>

      <div className={styles.actionsSection}>
        <QuickActions />
      </div>

      <div className={styles.recentActivity}>
        <div className={styles.recentActivityHeader}>
          <h2 className={styles.recentActivityTitle}>
            <span>🔔</span>
            Recent Activity
          </h2>
        </div>

        <div className={styles.recentActivityContent}>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {activity.icon}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{activity.text}</p>
                  <p className={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyActivity}>
              <div className={styles.emptyActivityIcon}>📭</div>
              <p className={styles.emptyActivityText}>
                No recent activity to show.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
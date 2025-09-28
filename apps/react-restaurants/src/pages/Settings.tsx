import React, { useState } from 'react';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { OperationalSettings } from '../components/settings/OperationalSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import styles from './Settings.module.scss';

type SettingsTab = 'general' | 'notifications' | 'operations' | 'security';

interface TabInfo {
  id: SettingsTab;
  label: string;
  icon: string;
  description: string;
}

const tabs: TabInfo[] = [
  {
    id: 'general',
    label: 'General',
    icon: '🏪',
    description: 'Restaurant information and basic settings'
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⏰',
    description: 'Hours, delivery, and pickup settings'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    description: 'Communication preferences'
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🔒',
    description: 'Password and security settings'
  }
];

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'operations':
        return <OperationalSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  const getTabInfo = (tabId: SettingsTab) => {
    return tabs.find(tab => tab.id === tabId);
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>
            Manage your restaurant's configuration and preferences
          </p>
        </div>
      </div>

      <div className={styles.settingsLayout}>
        <aside className={styles.sidebar}>
          <nav className={styles.tabNavigation}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles['tabButton--active'] : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <div className={styles.tabContent}>
                  <span className={styles.tabLabel}>{tab.label}</span>
                  <span className={styles.tabDescription}>{tab.description}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.activeTabInfo}>
              <span className={styles.activeTabIcon}>
                {getTabInfo(activeTab)?.icon}
              </span>
              <div>
                <h2 className={styles.contentTitle}>
                  {getTabInfo(activeTab)?.label}
                </h2>
                <p className={styles.contentDescription}>
                  {getTabInfo(activeTab)?.description}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.contentBody}>
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Mobile tab navigation */}
      <nav className={styles.mobileTabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.mobileTabButton} ${activeTab === tab.id ? styles['mobileTabButton--active'] : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.mobileTabIcon}>{tab.icon}</span>
            <span className={styles.mobileTabLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { PersonalInfo } from '../components/profile/PersonalInfo';
import { AccountSettings } from '../components/profile/AccountSettings';
import { ActivityLog } from '../components/profile/ActivityLog';
import styles from './Profile.module.scss';

type ProfileTab = 'personal' | 'account' | 'activity';

interface TabInfo {
  id: ProfileTab;
  label: string;
  icon: string;
  description: string;
}

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  memberSince: string;
  lastLogin: string;
}

const tabs: TabInfo[] = [
  {
    id: 'personal',
    label: 'Personal Info',
    icon: '👤',
    description: 'Manage your personal information and details'
  },
  {
    id: 'account',
    label: 'Account Settings',
    icon: '⚙️',
    description: 'Preferences, privacy, and account management'
  },
  {
    id: 'activity',
    label: 'Activity Log',
    icon: '📋',
    description: 'View your account activity and login history'
  }
];

const mockUser: User = {
  name: 'Marco Rodriguez',
  email: 'marco.rodriguez@bellacucina.com',
  role: 'Restaurant Manager',
  avatar: undefined, // Would be a URL in a real app
  memberSince: 'August 2019',
  lastLogin: '2 hours ago'
};

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [user, setUser] = useState<User>(mockUser);

  const handleAvatarChange = async (file: File) => {
    // In a real app, this would upload the file to a server
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Simulate successful upload
        const fakeUrl = URL.createObjectURL(file);
        setUser(prev => ({ ...prev, avatar: fakeUrl }));
        resolve();
      }, 1000);
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo />;
      case 'account':
        return <AccountSettings />;
      case 'activity':
        return <ActivityLog />;
      default:
        return <PersonalInfo />;
    }
  };

  const getTabInfo = (tabId: ProfileTab) => {
    return tabs.find(tab => tab.id === tabId);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>My Profile</h1>
          <p className={styles.pageSubtitle}>
            Manage your personal information, preferences, and account settings
          </p>
        </div>
      </div>

      <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />

      <div className={styles.profileLayout}>
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
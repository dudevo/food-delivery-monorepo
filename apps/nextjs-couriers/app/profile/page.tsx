'use client'

import { useState } from 'react'
import Layout from '../components/layout/Layout'
import styles from './page.module.scss'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleType: string
  licensePlate: string
  emergencyContact: string
  emergencyPhone: string
}

interface SettingsData {
  pushNotifications: boolean
  emailNotifications: boolean
  orderAlerts: boolean
  weeklyReports: boolean
  availabilityTracking: boolean
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    vehicleType: 'car',
    licensePlate: 'ABC123',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+1 (555) 987-6543'
  })

  const [settings, setSettings] = useState<SettingsData>({
    pushNotifications: true,
    emailNotifications: true,
    orderAlerts: true,
    weeklyReports: false,
    availabilityTracking: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSettingToggle = (setting: keyof SettingsData) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setIsEditing(false)
    // In a real app, this would save to the backend
    console.log('Profile saved:', profileData)
    console.log('Settings saved:', settings)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data in a real app
  }

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile & Settings</h1>
          <p className={styles.subtitle}>
            Manage your personal information and app preferences
          </p>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              {getInitials()}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className={styles.profileEmail}>{profileData.email}</p>
              <div className={styles.profileStats}>
                <div className={styles.profileStat}>
                  <h3 className={styles.profileStatValue}>4.8</h3>
                  <p className={styles.profileStatLabel}>Rating</p>
                </div>
                <div className={styles.profileStat}>
                  <h3 className={styles.profileStatValue}>247</h3>
                  <p className={styles.profileStatLabel}>Deliveries</p>
                </div>
                <div className={styles.profileStat}>
                  <h3 className={styles.profileStatValue}>98%</h3>
                  <p className={styles.profileStatLabel}>On-time</p>
                </div>
              </div>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Personal Information
              </h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={styles.input}
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={styles.input}
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                  <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM6 7a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" />
                </svg>
                Vehicle Information
              </h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="vehicleType">Vehicle Type</label>
                  <select
                    id="vehicleType"
                    className={styles.select}
                    value={profileData.vehicleType}
                    onChange={(e) => handleProfileChange('vehicleType', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="bicycle">Bicycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="licensePlate">License Plate</label>
                  <input
                    id="licensePlate"
                    type="text"
                    className={styles.input}
                    value={profileData.licensePlate}
                    onChange={(e) => handleProfileChange('licensePlate', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Emergency Contact
              </h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="emergencyContact">Contact Name</label>
                  <input
                    id="emergencyContact"
                    type="text"
                    className={styles.input}
                    value={profileData.emergencyContact}
                    onChange={(e) => handleProfileChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="emergencyPhone">Contact Phone</label>
                  <input
                    id="emergencyPhone"
                    type="tel"
                    className={styles.input}
                    value={profileData.emergencyPhone}
                    onChange={(e) => handleProfileChange('emergencyPhone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className={styles.actions}>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className={styles.settingsCard}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Notification Settings
            </h3>

            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Push Notifications</h4>
                  <p className={styles.settingDescription}>
                    Receive instant notifications for new orders and updates
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${settings.pushNotifications ? styles['toggle--active'] : ''}`}
                  onClick={() => handleSettingToggle('pushNotifications')}
                  aria-label="Toggle push notifications"
                >
                  <div className={styles.toggleHandle} />
                </button>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Email Notifications</h4>
                  <p className={styles.settingDescription}>
                    Get important updates and summaries via email
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${settings.emailNotifications ? styles['toggle--active'] : ''}`}
                  onClick={() => handleSettingToggle('emailNotifications')}
                  aria-label="Toggle email notifications"
                >
                  <div className={styles.toggleHandle} />
                </button>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Order Alerts</h4>
                  <p className={styles.settingDescription}>
                    Sound alerts when new orders become available
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${settings.orderAlerts ? styles['toggle--active'] : ''}`}
                  onClick={() => handleSettingToggle('orderAlerts')}
                  aria-label="Toggle order alerts"
                >
                  <div className={styles.toggleHandle} />
                </button>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Weekly Reports</h4>
                  <p className={styles.settingDescription}>
                    Receive weekly earnings and performance reports
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${settings.weeklyReports ? styles['toggle--active'] : ''}`}
                  onClick={() => handleSettingToggle('weeklyReports')}
                  aria-label="Toggle weekly reports"
                >
                  <div className={styles.toggleHandle} />
                </button>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Availability Tracking</h4>
                  <p className={styles.settingDescription}>
                    Automatically track your online/offline status
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${settings.availabilityTracking ? styles['toggle--active'] : ''}`}
                  onClick={() => handleSettingToggle('availabilityTracking')}
                  aria-label="Toggle availability tracking"
                >
                  <div className={styles.toggleHandle} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
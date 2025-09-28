'use client'

import { useState } from 'react'
import Layout from '../components/layout/Layout'
import styles from './page.module.scss'

interface AppPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  mapProvider: 'google' | 'mapbox'
  autoAcceptOrders: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
  showEarningsGoal: boolean
  distanceUnit: 'miles' | 'kilometers'
}

interface WorkingHours {
  [key: string]: {
    enabled: boolean
    startTime: string
    endTime: string
  }
}

interface DeliveryPreferences {
  maxDistance: number
  minOrderValue: number
  avoidTolls: boolean
  preferBikeRoutes: boolean
  acceptCashOrders: boolean
  acceptMultipleOrders: boolean
  maxSimultaneousOrders: number
}

interface SecuritySettings {
  locationSharing: boolean
  shareLocationWithCustomers: boolean
  allowPhoneCalls: boolean
  allowMessages: boolean
  requirePinForOrders: boolean
  autoLogoutAfter: number
}

export default function SettingsPage() {
  const [appPreferences, setAppPreferences] = useState<AppPreferences>({
    theme: 'system',
    language: 'en',
    mapProvider: 'google',
    autoAcceptOrders: false,
    soundEnabled: true,
    vibrationEnabled: true,
    showEarningsGoal: true,
    distanceUnit: 'miles'
  })

  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    monday: { enabled: true, startTime: '09:00', endTime: '18:00' },
    tuesday: { enabled: true, startTime: '09:00', endTime: '18:00' },
    wednesday: { enabled: true, startTime: '09:00', endTime: '18:00' },
    thursday: { enabled: true, startTime: '09:00', endTime: '18:00' },
    friday: { enabled: true, startTime: '09:00', endTime: '20:00' },
    saturday: { enabled: true, startTime: '10:00', endTime: '20:00' },
    sunday: { enabled: false, startTime: '10:00', endTime: '18:00' }
  })

  const [deliveryPreferences, setDeliveryPreferences] = useState<DeliveryPreferences>({
    maxDistance: 5,
    minOrderValue: 10,
    avoidTolls: true,
    preferBikeRoutes: false,
    acceptCashOrders: true,
    acceptMultipleOrders: true,
    maxSimultaneousOrders: 3
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    locationSharing: true,
    shareLocationWithCustomers: true,
    allowPhoneCalls: true,
    allowMessages: true,
    requirePinForOrders: false,
    autoLogoutAfter: 30
  })

  const [isSaving, setIsSaving] = useState(false)

  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  }

  const handleAppPreferenceChange = (key: keyof AppPreferences, value: string | boolean) => {
    setAppPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleWorkingHourChange = (day: string, field: string, value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
  }

  const handleDeliveryPreferenceChange = (key: keyof DeliveryPreferences, value: string | number | boolean) => {
    setDeliveryPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: string | number | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)

    // In a real app, this would save to the backend
    console.log('Settings saved:', {
      appPreferences,
      workingHours,
      deliveryPreferences,
      securitySettings
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>
            Customize your courier app experience and preferences
          </p>
        </div>

        {/* App Preferences */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              App Preferences
            </h2>
          </div>

          <div className={styles.settingsGrid}>
            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="theme">Theme</label>
              <select
                id="theme"
                className={styles.select}
                value={appPreferences.theme}
                onChange={(e) => handleAppPreferenceChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="language">Language</label>
              <select
                id="language"
                className={styles.select}
                value={appPreferences.language}
                onChange={(e) => handleAppPreferenceChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="mapProvider">Map Provider</label>
              <select
                id="mapProvider"
                className={styles.select}
                value={appPreferences.mapProvider}
                onChange={(e) => handleAppPreferenceChange('mapProvider', e.target.value)}
              >
                <option value="google">Google Maps</option>
                <option value="mapbox">Mapbox</option>
              </select>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="distanceUnit">Distance Unit</label>
              <select
                id="distanceUnit"
                className={styles.select}
                value={appPreferences.distanceUnit}
                onChange={(e) => handleAppPreferenceChange('distanceUnit', e.target.value)}
              >
                <option value="miles">Miles</option>
                <option value="kilometers">Kilometers</option>
              </select>
            </div>
          </div>

          <div className={styles.toggleList}>
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Auto-accept Orders</h4>
                <p className={styles.toggleDescription}>
                  Automatically accept orders that match your preferences
                </p>
              </div>
              <button
                className={`${styles.toggle} ${appPreferences.autoAcceptOrders ? styles['toggle--active'] : ''}`}
                onClick={() => handleAppPreferenceChange('autoAcceptOrders', !appPreferences.autoAcceptOrders)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Sound Notifications</h4>
                <p className={styles.toggleDescription}>
                  Play sounds for order notifications and alerts
                </p>
              </div>
              <button
                className={`${styles.toggle} ${appPreferences.soundEnabled ? styles['toggle--active'] : ''}`}
                onClick={() => handleAppPreferenceChange('soundEnabled', !appPreferences.soundEnabled)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Vibration</h4>
                <p className={styles.toggleDescription}>
                  Use vibration for notifications and alerts
                </p>
              </div>
              <button
                className={`${styles.toggle} ${appPreferences.vibrationEnabled ? styles['toggle--active'] : ''}`}
                onClick={() => handleAppPreferenceChange('vibrationEnabled', !appPreferences.vibrationEnabled)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Show Earnings Goal</h4>
                <p className={styles.toggleDescription}>
                  Display daily earnings goal progress on dashboard
                </p>
              </div>
              <button
                className={`${styles.toggle} ${appPreferences.showEarningsGoal ? styles['toggle--active'] : ''}`}
                onClick={() => handleAppPreferenceChange('showEarningsGoal', !appPreferences.showEarningsGoal)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Working Hours
            </h2>
          </div>

          <div className={styles.workingHours}>
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className={styles.dayRow}>
                <div className={styles.dayInfo}>
                  <span className={styles.dayLabel}>{dayLabels[day as keyof typeof dayLabels]}</span>
                  <button
                    className={`${styles.dayToggle} ${hours.enabled ? styles['dayToggle--active'] : ''}`}
                    onClick={() => handleWorkingHourChange(day, 'enabled', !hours.enabled)}
                  >
                    <div className={styles.dayToggleHandle} />
                  </button>
                </div>

                {hours.enabled && (
                  <div className={styles.timeInputs}>
                    <input
                      type="time"
                      value={hours.startTime}
                      onChange={(e) => handleWorkingHourChange(day, 'startTime', e.target.value)}
                      className={styles.timeInput}
                    />
                    <span className={styles.timeSeparator}>to</span>
                    <input
                      type="time"
                      value={hours.endTime}
                      onChange={(e) => handleWorkingHourChange(day, 'endTime', e.target.value)}
                      className={styles.timeInput}
                    />
                  </div>
                )}

                {!hours.enabled && (
                  <span className={styles.dayOff}>Day off</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Preferences */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H3zM6 7a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" />
              </svg>
              Delivery Preferences
            </h2>
          </div>

          <div className={styles.settingsGrid}>
            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="maxDistance">
                Maximum Distance ({appPreferences.distanceUnit})
              </label>
              <input
                id="maxDistance"
                type="number"
                min="1"
                max="20"
                className={styles.input}
                value={deliveryPreferences.maxDistance}
                onChange={(e) => handleDeliveryPreferenceChange('maxDistance', parseInt(e.target.value))}
              />
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="minOrderValue">Minimum Order Value ($)</label>
              <input
                id="minOrderValue"
                type="number"
                min="0"
                step="0.50"
                className={styles.input}
                value={deliveryPreferences.minOrderValue}
                onChange={(e) => handleDeliveryPreferenceChange('minOrderValue', parseFloat(e.target.value))}
              />
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="maxOrders">Max Simultaneous Orders</label>
              <select
                id="maxOrders"
                className={styles.select}
                value={deliveryPreferences.maxSimultaneousOrders}
                onChange={(e) => handleDeliveryPreferenceChange('maxSimultaneousOrders', parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>

          <div className={styles.toggleList}>
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Avoid Tolls</h4>
                <p className={styles.toggleDescription}>
                  Route around toll roads when possible
                </p>
              </div>
              <button
                className={`${styles.toggle} ${deliveryPreferences.avoidTolls ? styles['toggle--active'] : ''}`}
                onClick={() => handleDeliveryPreferenceChange('avoidTolls', !deliveryPreferences.avoidTolls)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Prefer Bike Routes</h4>
                <p className={styles.toggleDescription}>
                  Prioritize bike-friendly routes when available
                </p>
              </div>
              <button
                className={`${styles.toggle} ${deliveryPreferences.preferBikeRoutes ? styles['toggle--active'] : ''}`}
                onClick={() => handleDeliveryPreferenceChange('preferBikeRoutes', !deliveryPreferences.preferBikeRoutes)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Accept Cash Orders</h4>
                <p className={styles.toggleDescription}>
                  Allow orders that require cash payment
                </p>
              </div>
              <button
                className={`${styles.toggle} ${deliveryPreferences.acceptCashOrders ? styles['toggle--active'] : ''}`}
                onClick={() => handleDeliveryPreferenceChange('acceptCashOrders', !deliveryPreferences.acceptCashOrders)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Multiple Orders</h4>
                <p className={styles.toggleDescription}>
                  Accept multiple orders for batch deliveries
                </p>
              </div>
              <button
                className={`${styles.toggle} ${deliveryPreferences.acceptMultipleOrders ? styles['toggle--active'] : ''}`}
                onClick={() => handleDeliveryPreferenceChange('acceptMultipleOrders', !deliveryPreferences.acceptMultipleOrders)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Security & Privacy
            </h2>
          </div>

          <div className={styles.settingsGrid}>
            <div className={styles.settingGroup}>
              <label className={styles.label} htmlFor="autoLogout">Auto Logout (minutes)</label>
              <select
                id="autoLogout"
                className={styles.select}
                value={securitySettings.autoLogoutAfter}
                onChange={(e) => handleSecuritySettingChange('autoLogoutAfter', parseInt(e.target.value))}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
            </div>
          </div>

          <div className={styles.toggleList}>
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Location Sharing</h4>
                <p className={styles.toggleDescription}>
                  Share your location with the platform for order routing
                </p>
              </div>
              <button
                className={`${styles.toggle} ${securitySettings.locationSharing ? styles['toggle--active'] : ''}`}
                onClick={() => handleSecuritySettingChange('locationSharing', !securitySettings.locationSharing)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Share Location with Customers</h4>
                <p className={styles.toggleDescription}>
                  Allow customers to track your delivery progress
                </p>
              </div>
              <button
                className={`${styles.toggle} ${securitySettings.shareLocationWithCustomers ? styles['toggle--active'] : ''}`}
                onClick={() => handleSecuritySettingChange('shareLocationWithCustomers', !securitySettings.shareLocationWithCustomers)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Allow Phone Calls</h4>
                <p className={styles.toggleDescription}>
                  Allow customers and restaurants to call you
                </p>
              </div>
              <button
                className={`${styles.toggle} ${securitySettings.allowPhoneCalls ? styles['toggle--active'] : ''}`}
                onClick={() => handleSecuritySettingChange('allowPhoneCalls', !securitySettings.allowPhoneCalls)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>Allow Messages</h4>
                <p className={styles.toggleDescription}>
                  Allow customers and restaurants to send you messages
                </p>
              </div>
              <button
                className={`${styles.toggle} ${securitySettings.allowMessages ? styles['toggle--active'] : ''}`}
                onClick={() => handleSecuritySettingChange('allowMessages', !securitySettings.allowMessages)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <h4 className={styles.toggleTitle}>PIN for Orders</h4>
                <p className={styles.toggleDescription}>
                  Require PIN verification before accepting orders
                </p>
              </div>
              <button
                className={`${styles.toggle} ${securitySettings.requirePinForOrders ? styles['toggle--active'] : ''}`}
                onClick={() => handleSecuritySettingChange('requirePinForOrders', !securitySettings.requirePinForOrders)}
              >
                <div className={styles.toggleHandle} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Saving Settings...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
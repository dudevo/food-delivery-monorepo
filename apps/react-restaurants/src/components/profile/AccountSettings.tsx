import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Input';
import { SettingsSection } from '../settings/SettingsSection';
import styles from './AccountSettings.module.scss';

interface AccountPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  newsletter: boolean;
}

interface PrivacySettings {
  profileVisibility: string;
  showEmail: boolean;
  showPhone: boolean;
  allowDataCollection: boolean;
  allowPersonalization: boolean;
}

const initialAccountPreferences: AccountPreferences = {
  language: 'en',
  timezone: 'America/Los_Angeles',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12',
  currency: 'USD',
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  newsletter: true
};

const initialPrivacySettings: PrivacySettings = {
  profileVisibility: 'team',
  showEmail: false,
  showPhone: false,
  allowDataCollection: true,
  allowPersonalization: true
};

export const AccountSettings: React.FC = () => {
  const [accountPreferences, setAccountPreferences] = useState<AccountPreferences>(initialAccountPreferences);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(initialPrivacySettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setAccountPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      alert('Account settings updated successfully!');
    } catch (error) {
      console.error('Error saving account settings:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAccountPreferences(initialAccountPreferences);
    setPrivacySettings(initialPrivacySettings);
    setHasChanges(false);
  };

  const handleDownloadData = () => {
    // In a real app, this would trigger a data export
    alert('Your data export has been requested. You will receive an email with download instructions shortly.');
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'
    );
    if (confirmation) {
      const doubleConfirmation = window.prompt(
        'Type "DELETE" to confirm account deletion:'
      );
      if (doubleConfirmation === 'DELETE') {
        alert('Account deletion request submitted. Our support team will contact you within 24 hours.');
      }
    }
  };

  return (
    <div>
      <SettingsSection
        title="Preferences"
        description="Customize your account preferences and display settings"
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <Select
            label="Language"
            value={accountPreferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            id="language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="de">Deutsch</option>
          </Select>

          <Select
            label="Timezone"
            value={accountPreferences.timezone}
            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
            id="timezone"
          >
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="UTC">UTC</option>
          </Select>

          <Select
            label="Date Format"
            value={accountPreferences.dateFormat}
            onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
            id="date-format"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="DD MMM YYYY">DD MMM YYYY</option>
          </Select>

          <Select
            label="Time Format"
            value={accountPreferences.timeFormat}
            onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
            id="time-format"
          >
            <option value="12">12-hour (AM/PM)</option>
            <option value="24">24-hour</option>
          </Select>

          <Select
            label="Currency"
            value={accountPreferences.currency}
            onChange={(e) => handlePreferenceChange('currency', e.target.value)}
            id="currency"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (C$)</option>
          </Select>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Communication Preferences"
        description="Control how we communicate with you"
      >
        <div className={styles.communicationSettings}>
          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={accountPreferences.emailNotifications}
              onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Email Notifications</div>
              <div className={styles.settingDescription}>Receive important updates via email</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={accountPreferences.pushNotifications}
              onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Push Notifications</div>
              <div className={styles.settingDescription}>Get real-time notifications on your device</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={accountPreferences.marketingEmails}
              onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Marketing Emails</div>
              <div className={styles.settingDescription}>Receive promotional offers and product updates</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={accountPreferences.newsletter}
              onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Newsletter</div>
              <div className={styles.settingDescription}>Monthly newsletter with industry insights</div>
            </div>
          </label>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Privacy Settings"
        description="Control your privacy and data sharing preferences"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
          <Select
            label="Profile Visibility"
            value={privacySettings.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            helpText="Who can see your profile information"
            id="profile-visibility"
          >
            <option value="public">Public</option>
            <option value="team">Team Members Only</option>
            <option value="private">Private</option>
          </Select>
        </div>

        <div className={styles.communicationSettings}>
          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={privacySettings.showEmail}
              onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Show Email Address</div>
              <div className={styles.settingDescription}>Allow team members to see your email</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={privacySettings.showPhone}
              onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Show Phone Number</div>
              <div className={styles.settingDescription}>Allow team members to see your phone number</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={privacySettings.allowDataCollection}
              onChange={(e) => handlePrivacyChange('allowDataCollection', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Allow Analytics</div>
              <div className={styles.settingDescription}>Help us improve by sharing anonymous usage data</div>
            </div>
          </label>

          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={privacySettings.allowPersonalization}
              onChange={(e) => handlePrivacyChange('allowPersonalization', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            <div className={styles.settingContent}>
              <div className={styles.settingLabel}>Personalization</div>
              <div className={styles.settingDescription}>Customize your experience based on your activity</div>
            </div>
          </label>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Data & Account Management"
        description="Export your data or delete your account"
      >
        <div className={styles.dangerZone}>
          <div className={styles.actionGroup}>
            <div className={styles.actionInfo}>
              <h4 className={styles.actionTitle}>Download Your Data</h4>
              <p className={styles.actionDescription}>
                Export all your personal data in a machine-readable format
              </p>
            </div>
            <Button variant="outline" onClick={handleDownloadData}>
              Download Data
            </Button>
          </div>

          <div className={styles.actionGroup}>
            <div className={styles.actionInfo}>
              <h4 className={styles.actionTitle}>Delete Account</h4>
              <p className={styles.actionDescription}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="error" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};
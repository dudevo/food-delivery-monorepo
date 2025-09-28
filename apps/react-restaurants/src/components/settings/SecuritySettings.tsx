import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SettingsSection } from './SettingsSection';
import styles from './SecuritySettings.module.scss';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface TwoFactorSettings {
  isEnabled: boolean;
  method: 'sms' | 'app' | 'email';
  phoneNumber: string;
  backupCodes: string[];
}

const initialTwoFactorSettings: TwoFactorSettings = {
  isEnabled: false,
  method: 'app',
  phoneNumber: '+1 (555) 123-4567',
  backupCodes: []
};

export const SecuritySettings: React.FC = () => {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorSettings, setTwoFactorSettings] = useState<TwoFactorSettings>(initialTwoFactorSettings);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [isSubmittingTwoFactor, setIsSubmittingTwoFactor] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordForm>>({});

  const handlePasswordChange = (field: keyof PasswordForm, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear specific field error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validatePasswordForm = (): boolean => {
    const errors: Partial<PasswordForm> = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePasswordForm()) return;

    setIsSubmittingPassword(true);
    try {
      // In a real app, this would call the backend to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    setIsSubmittingTwoFactor(true);
    try {
      if (!twoFactorSettings.isEnabled) {
        // Enable 2FA - generate backup codes
        const backupCodes = Array.from({ length: 8 }, () =>
          Math.random().toString(36).substring(2, 8).toUpperCase()
        );
        setTwoFactorSettings(prev => ({
          ...prev,
          isEnabled: true,
          backupCodes
        }));
        alert('Two-factor authentication enabled! Make sure to save your backup codes.');
      } else {
        // Disable 2FA
        setTwoFactorSettings(prev => ({
          ...prev,
          isEnabled: false,
          backupCodes: []
        }));
        alert('Two-factor authentication disabled.');
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      alert('Failed to update two-factor authentication. Please try again.');
    } finally {
      setIsSubmittingTwoFactor(false);
    }
  };

  const generateNewBackupCodes = async () => {
    try {
      const backupCodes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setTwoFactorSettings(prev => ({
        ...prev,
        backupCodes
      }));
      alert('New backup codes generated! Make sure to save them.');
    } catch (error) {
      console.error('Error generating backup codes:', error);
      alert('Failed to generate new backup codes. Please try again.');
    }
  };

  return (
    <div>
      <SettingsSection
        title="Change Password"
        description="Update your account password for better security"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', maxWidth: '600px' }}>
          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
            error={passwordErrors.currentPassword}
            required
            id="current-password"
          />

          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            error={passwordErrors.newPassword}
            helpText="Must be at least 8 characters with uppercase, lowercase, and number"
            required
            id="new-password"
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            error={passwordErrors.confirmPassword}
            required
            id="confirm-password"
          />

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 'var(--spacing-sm)' }}>
            <Button
              variant="primary"
              onClick={handlePasswordSubmit}
              loading={isSubmittingPassword}
              disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
            >
              Update Password
            </Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
        actions={
          <Button
            variant={twoFactorSettings.isEnabled ? "error" : "primary"}
            size="sm"
            onClick={handleTwoFactorToggle}
            loading={isSubmittingTwoFactor}
          >
            {twoFactorSettings.isEnabled ? "Disable 2FA" : "Enable 2FA"}
          </Button>
        }
      >
        <div className={styles.twoFactorStatus}>
          <div className={styles.statusIndicator}>
            <span className={`${styles.statusDot} ${twoFactorSettings.isEnabled ? styles['statusDot--enabled'] : styles['statusDot--disabled']}`}></span>
            <span className={styles.statusText}>
              Two-factor authentication is {twoFactorSettings.isEnabled ? 'enabled' : 'disabled'}
            </span>
          </div>
        </div>

        {twoFactorSettings.isEnabled && (
          <div className={styles.twoFactorDetails}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
              <div>
                <label className={styles.methodLabel}>Authentication Method</label>
                <select
                  value={twoFactorSettings.method}
                  onChange={(e) => setTwoFactorSettings(prev => ({ ...prev, method: e.target.value as 'sms' | 'app' | 'email' }))}
                  className={styles.methodSelect}
                >
                  <option value="app">Authenticator App</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>

              {twoFactorSettings.method === 'sms' && (
                <Input
                  label="Phone Number"
                  type="tel"
                  value={twoFactorSettings.phoneNumber}
                  onChange={(e) => setTwoFactorSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  id="2fa-phone"
                />
              )}
            </div>

            {twoFactorSettings.backupCodes.length > 0 && (
              <div className={styles.backupCodes}>
                <div className={styles.backupCodesHeader}>
                  <h4 className={styles.backupCodesTitle}>Backup Codes</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNewBackupCodes}
                  >
                    Generate New Codes
                  </Button>
                </div>
                <p className={styles.backupCodesDescription}>
                  Save these backup codes in a safe place. You can use them to access your account if you lose access to your authentication method.
                </p>
                <div className={styles.codesList}>
                  {twoFactorSettings.backupCodes.map((code, index) => (
                    <code key={index} className={styles.backupCode}>{code}</code>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SettingsSection>

      <SettingsSection
        title="Login Activity"
        description="Recent login attempts and active sessions"
      >
        <div className={styles.loginActivity}>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <div className={styles.activityLocation}>San Francisco, CA</div>
              <div className={styles.activityDetails}>Current session • Chrome on macOS</div>
            </div>
            <div className={styles.activityTime}>Active now</div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <div className={styles.activityLocation}>San Francisco, CA</div>
              <div className={styles.activityDetails}>Mobile app on iPhone</div>
            </div>
            <div className={styles.activityTime}>2 hours ago</div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <div className={styles.activityLocation}>Los Angeles, CA</div>
              <div className={styles.activityDetails}>Chrome on Windows</div>
            </div>
            <div className={styles.activityTime}>3 days ago</div>
          </div>
        </div>

        <Button variant="outline" size="sm">
          View All Activity
        </Button>
      </SettingsSection>
    </div>
  );
};
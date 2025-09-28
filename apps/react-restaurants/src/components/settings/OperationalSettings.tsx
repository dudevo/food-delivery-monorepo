import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SettingsSection } from './SettingsSection';
import styles from './OperationalSettings.module.scss';

interface OperatingHours {
  [key: string]: {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  };
}

interface DeliverySettings {
  isEnabled: boolean;
  minimumOrder: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryRadius: number;
  estimatedTime: number;
}

interface PickupSettings {
  isEnabled: boolean;
  estimatedTime: number;
  instructions: string;
}

const initialOperatingHours: OperatingHours = {
  monday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
  tuesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
  wednesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
  thursday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
  friday: { isOpen: true, openTime: '11:00', closeTime: '23:00' },
  saturday: { isOpen: true, openTime: '11:00', closeTime: '23:00' },
  sunday: { isOpen: true, openTime: '12:00', closeTime: '21:00' }
};

const initialDeliverySettings: DeliverySettings = {
  isEnabled: true,
  minimumOrder: 15,
  deliveryFee: 3.99,
  freeDeliveryThreshold: 50,
  deliveryRadius: 5,
  estimatedTime: 30
};

const initialPickupSettings: PickupSettings = {
  isEnabled: true,
  estimatedTime: 15,
  instructions: 'Please call when you arrive and we\'ll bring your order to your car.'
};

export const OperationalSettings: React.FC = () => {
  const [operatingHours, setOperatingHours] = useState<OperatingHours>(initialOperatingHours);
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(initialDeliverySettings);
  const [pickupSettings, setPickupSettings] = useState<PickupSettings>(initialPickupSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const handleOperatingHoursChange = (day: string, field: string, value: string | boolean) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleDeliveryChange = (field: string, value: string | number | boolean) => {
    setDeliverySettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handlePickupChange = (field: string, value: string | number | boolean) => {
    setPickupSettings(prev => ({
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
      alert('Operational settings updated successfully!');
    } catch (error) {
      console.error('Error saving operational settings:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOperatingHours(initialOperatingHours);
    setDeliverySettings(initialDeliverySettings);
    setPickupSettings(initialPickupSettings);
    setHasChanges(false);
  };

  return (
    <div>
      <SettingsSection
        title="Operating Hours"
        description="Set your restaurant's hours for each day of the week"
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
        <div className={styles.operatingHours}>
          {Object.entries(operatingHours).map(([day, hours]) => (
            <div key={day} className={styles.dayRow}>
              <div className={styles.dayLabel}>
                {dayLabels[day as keyof typeof dayLabels]}
              </div>

              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={hours.isOpen}
                  onChange={(e) => handleOperatingHoursChange(day, 'isOpen', e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>

              {hours.isOpen ? (
                <div className={styles.timeInputs}>
                  <input
                    type="time"
                    value={hours.openTime}
                    onChange={(e) => handleOperatingHoursChange(day, 'openTime', e.target.value)}
                    className={styles.timeInput}
                  />
                  <span className={styles.timeSeparator}>to</span>
                  <input
                    type="time"
                    value={hours.closeTime}
                    onChange={(e) => handleOperatingHoursChange(day, 'closeTime', e.target.value)}
                    className={styles.timeInput}
                  />
                </div>
              ) : (
                <div className={styles.closedLabel}>Closed</div>
              )}
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Delivery Settings"
        description="Configure delivery options and pricing"
      >
        <div className={styles.serviceToggle}>
          <label className={styles.serviceCheckbox}>
            <input
              type="checkbox"
              checked={deliverySettings.isEnabled}
              onChange={(e) => handleDeliveryChange('isEnabled', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            Enable delivery service
          </label>
        </div>

        {deliverySettings.isEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
            <Input
              label="Minimum Order ($)"
              type="number"
              min="0"
              step="0.01"
              value={deliverySettings.minimumOrder}
              onChange={(e) => handleDeliveryChange('minimumOrder', parseFloat(e.target.value))}
              id="delivery-minimum"
            />

            <Input
              label="Delivery Fee ($)"
              type="number"
              min="0"
              step="0.01"
              value={deliverySettings.deliveryFee}
              onChange={(e) => handleDeliveryChange('deliveryFee', parseFloat(e.target.value))}
              id="delivery-fee"
            />

            <Input
              label="Free Delivery Threshold ($)"
              type="number"
              min="0"
              step="0.01"
              value={deliverySettings.freeDeliveryThreshold}
              onChange={(e) => handleDeliveryChange('freeDeliveryThreshold', parseFloat(e.target.value))}
              helpText="Orders above this amount get free delivery"
              id="free-delivery-threshold"
            />

            <Input
              label="Delivery Radius (miles)"
              type="number"
              min="1"
              max="20"
              value={deliverySettings.deliveryRadius}
              onChange={(e) => handleDeliveryChange('deliveryRadius', parseInt(e.target.value))}
              id="delivery-radius"
            />

            <Input
              label="Estimated Delivery Time (minutes)"
              type="number"
              min="10"
              max="120"
              value={deliverySettings.estimatedTime}
              onChange={(e) => handleDeliveryChange('estimatedTime', parseInt(e.target.value))}
              id="delivery-time"
            />
          </div>
        )}
      </SettingsSection>

      <SettingsSection
        title="Pickup Settings"
        description="Configure pickup options and instructions"
      >
        <div className={styles.serviceToggle}>
          <label className={styles.serviceCheckbox}>
            <input
              type="checkbox"
              checked={pickupSettings.isEnabled}
              onChange={(e) => handlePickupChange('isEnabled', e.target.checked)}
            />
            <span className={styles.checkmark}></span>
            Enable pickup service
          </label>
        </div>

        {pickupSettings.isEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
            <Input
              label="Estimated Pickup Time (minutes)"
              type="number"
              min="5"
              max="60"
              value={pickupSettings.estimatedTime}
              onChange={(e) => handlePickupChange('estimatedTime', parseInt(e.target.value))}
              id="pickup-time"
            />

            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="Pickup Instructions"
                value={pickupSettings.instructions}
                onChange={(e) => handlePickupChange('instructions', e.target.value)}
                helpText="Instructions for customers picking up their orders"
                id="pickup-instructions"
              />
            </div>
          </div>
        )}
      </SettingsSection>
    </div>
  );
};
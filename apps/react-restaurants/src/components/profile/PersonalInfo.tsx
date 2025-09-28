import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Select, Textarea } from '../ui/Input';
import { SettingsSection } from '../settings/SettingsSection';

interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  position: string;
  department: string;
  startDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const initialPersonalInfo: PersonalInformation = {
  firstName: 'Marco',
  lastName: 'Rodriguez',
  email: 'marco.rodriguez@bellacucina.com',
  phone: '+1 (555) 987-6543',
  dateOfBirth: '1985-03-15',
  gender: 'male',
  bio: 'Passionate restaurant manager with over 10 years of experience in the food service industry. Dedicated to providing exceptional customer service and maintaining high-quality standards.',
  position: 'Restaurant Manager',
  department: 'Operations',
  startDate: '2019-08-15',
  emergencyContact: {
    name: 'Sofia Rodriguez',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6544'
  },
  address: {
    street: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States'
  }
};

export const PersonalInfo: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInformation>(initialPersonalInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof PersonalInformation] as Record<string, unknown>),
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
    setHasChanges(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would save to the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      alert('Personal information updated successfully!');
    } catch (error) {
      console.error('Error saving personal info:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPersonalInfo(initialPersonalInfo);
    setHasChanges(false);
  };

  return (
    <div>
      <SettingsSection
        title="Personal Information"
        description="Update your personal details and contact information"
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <Input
            label="First Name"
            value={personalInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            id="first-name"
          />

          <Input
            label="Last Name"
            value={personalInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            id="last-name"
          />

          <Input
            label="Email Address"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            id="email"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            id="phone"
          />

          <Input
            label="Date of Birth"
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            id="date-of-birth"
          />

          <Select
            label="Gender"
            value={personalInfo.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            id="gender"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </Select>
        </div>

        <Textarea
          label="Bio"
          value={personalInfo.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={4}
          helpText="Tell us a bit about yourself and your role"
          id="bio"
        />
      </SettingsSection>

      <SettingsSection
        title="Work Information"
        description="Your role and employment details"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <Input
            label="Position"
            value={personalInfo.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            id="position"
          />

          <Input
            label="Department"
            value={personalInfo.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            id="department"
          />

          <Input
            label="Start Date"
            type="date"
            value={personalInfo.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            id="start-date"
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Emergency Contact"
        description="Contact information for emergencies"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <Input
            label="Contact Name"
            value={personalInfo.emergencyContact.name}
            onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
            id="emergency-name"
          />

          <Input
            label="Relationship"
            value={personalInfo.emergencyContact.relationship}
            onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
            id="emergency-relationship"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={personalInfo.emergencyContact.phone}
            onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
            id="emergency-phone"
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Address"
        description="Your home address information"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Street Address"
              value={personalInfo.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              id="address-street"
            />
          </div>

          <Input
            label="City"
            value={personalInfo.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            id="address-city"
          />

          <Input
            label="State/Province"
            value={personalInfo.address.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            id="address-state"
          />

          <Input
            label="ZIP/Postal Code"
            value={personalInfo.address.zipCode}
            onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
            id="address-zip"
          />

          <Input
            label="Country"
            value={personalInfo.address.country}
            onChange={(e) => handleInputChange('address.country', e.target.value)}
            id="address-country"
          />
        </div>
      </SettingsSection>
    </div>
  );
};
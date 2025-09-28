import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Select, Textarea } from '../ui/Input';
import { SettingsSection } from './SettingsSection';

interface RestaurantInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cuisine: string;
  priceRange: string;
  capacity: number;
}

const initialRestaurantInfo: RestaurantInfo = {
  name: 'Bella Cucina',
  description: 'Authentic Italian cuisine made with fresh, locally sourced ingredients. Experience the taste of traditional Italy in the heart of the city.',
  phone: '+1 (555) 123-4567',
  email: 'info@bellacucina.com',
  website: 'https://bellacucina.com',
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States'
  },
  cuisine: 'italian',
  priceRange: '$$',
  capacity: 60
};

export const GeneralSettings: React.FC = () => {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(initialRestaurantInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setRestaurantInfo(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof RestaurantInfo] as Record<string, unknown>),
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
      alert('Restaurant information updated successfully!');
    } catch (error) {
      console.error('Error saving restaurant info:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRestaurantInfo(initialRestaurantInfo);
    setHasChanges(false);
  };

  return (
    <div>
      <SettingsSection
        title="Restaurant Information"
        description="Manage your restaurant's basic information that appears to customers"
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
            label="Restaurant Name"
            value={restaurantInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            id="restaurant-name"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={restaurantInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            id="restaurant-phone"
          />

          <Input
            label="Email Address"
            type="email"
            value={restaurantInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            id="restaurant-email"
          />

          <Input
            label="Website"
            type="url"
            value={restaurantInfo.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            id="restaurant-website"
          />

          <Select
            label="Cuisine Type"
            value={restaurantInfo.cuisine}
            onChange={(e) => handleInputChange('cuisine', e.target.value)}
            required
            id="restaurant-cuisine"
          >
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="american">American</option>
            <option value="french">French</option>
            <option value="japanese">Japanese</option>
            <option value="thai">Thai</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="other">Other</option>
          </Select>

          <Select
            label="Price Range"
            value={restaurantInfo.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
            required
            id="restaurant-price-range"
          >
            <option value="$">$ - Budget friendly</option>
            <option value="$$">$$ - Moderate</option>
            <option value="$$$">$$$ - Upscale</option>
            <option value="$$$$">$$$$ - Fine dining</option>
          </Select>

          <Input
            label="Seating Capacity"
            type="number"
            min="1"
            value={restaurantInfo.capacity}
            onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
            required
            id="restaurant-capacity"
          />
        </div>

        <Textarea
          label="Restaurant Description"
          value={restaurantInfo.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          helpText="Describe your restaurant's atmosphere, specialties, and what makes it unique"
          id="restaurant-description"
        />
      </SettingsSection>

      <SettingsSection
        title="Address Information"
        description="Your restaurant's physical location for deliveries and customer visits"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input
              label="Street Address"
              value={restaurantInfo.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              required
              id="address-street"
            />
          </div>

          <Input
            label="City"
            value={restaurantInfo.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            required
            id="address-city"
          />

          <Input
            label="State/Province"
            value={restaurantInfo.address.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            required
            id="address-state"
          />

          <Input
            label="ZIP/Postal Code"
            value={restaurantInfo.address.zipCode}
            onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
            required
            id="address-zip"
          />

          <Input
            label="Country"
            value={restaurantInfo.address.country}
            onChange={(e) => handleInputChange('address.country', e.target.value)}
            required
            id="address-country"
          />
        </div>
      </SettingsSection>
    </div>
  );
};
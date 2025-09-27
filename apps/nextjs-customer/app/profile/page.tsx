'use client'

import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import styles from './page.module.scss'

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: null
}

const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false
  }
]

const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '1234',
    brand: 'Mastercard',
    isDefault: false
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments'>('profile')
  const [userInfo, setUserInfo] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // In a real app, save to API
    setIsEditing(false)
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>Manage your account settings and preferences</p>
        </div>

        <div className={styles.content}>
          <nav className={styles.sidebar}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
            >
              👤 Profile Information
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`${styles.navItem} ${activeTab === 'addresses' ? styles.active : ''}`}
            >
              📍 Delivery Addresses
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`${styles.navItem} ${activeTab === 'payments' ? styles.active : ''}`}
            >
              💳 Payment Methods
            </button>
          </nav>

          <div className={styles.mainContent}>
            {activeTab === 'profile' && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Profile Information</h2>
                  <Button
                    variant={isEditing ? "primary" : "outline"}
                    size="sm"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                <div className={styles.profileForm}>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                      {userInfo.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={userInfo.avatar} alt="Profile" />
                      ) : (
                        <span className={styles.avatarPlaceholder}>
                          {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
                        </span>
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <div className={styles.formGrid}>
                    <Input
                      label="First Name"
                      value={userInfo.firstName}
                      onChange={handleInputChange('firstName')}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Last Name"
                      value={userInfo.lastName}
                      onChange={handleInputChange('lastName')}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={userInfo.email}
                      onChange={handleInputChange('email')}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={userInfo.phone}
                      onChange={handleInputChange('phone')}
                      disabled={!isEditing}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Delivery Addresses</h2>
                  <Button variant="primary" size="sm">
                    Add New Address
                  </Button>
                </div>

                <div className={styles.itemList}>
                  {mockAddresses.map(address => (
                    <div key={address.id} className={styles.addressCard}>
                      <div className={styles.addressInfo}>
                        <div className={styles.addressHeader}>
                          <h3 className={styles.addressLabel}>{address.label}</h3>
                          {address.isDefault && (
                            <span className={styles.defaultBadge}>Default</span>
                          )}
                        </div>
                        <p className={styles.addressText}>
                          {address.address}<br />
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      <div className={styles.addressActions}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Payment Methods</h2>
                  <Button variant="primary" size="sm">
                    Add Payment Method
                  </Button>
                </div>

                <div className={styles.itemList}>
                  {mockPaymentMethods.map(payment => (
                    <div key={payment.id} className={styles.paymentCard}>
                      <div className={styles.paymentInfo}>
                        <div className={styles.paymentHeader}>
                          <div className={styles.cardBrand}>
                            💳 {payment.brand} •••• {payment.last4}
                          </div>
                          {payment.isDefault && (
                            <span className={styles.defaultBadge}>Default</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.paymentActions}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
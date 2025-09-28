'use client'

import { useState } from 'react'
import styles from './OrderDetailPanel.module.scss'

interface Customer {
  name: string
  phone: string
  avatar?: string
}

interface Location {
  name: string
  address: string
}

interface OrderDetailPanelProps {
  orderId: string
  restaurantName: string
  customer: Customer
  pickup: Location
  dropoff: Location
  specialInstructions?: string
  status: 'assigned' | 'pickup' | 'enroute' | 'delivered'
  onStatusChange?: (newStatus: string) => void
}

export default function OrderDetailPanel({
  orderId,
  restaurantName,
  customer,
  pickup,
  dropoff,
  specialInstructions,
  status,
  onStatusChange
}: OrderDetailPanelProps) {
  const [currentStatus, setCurrentStatus] = useState(status)

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus as any)
    onStatusChange?.(newStatus)
  }

  const getActionButton = () => {
    switch (currentStatus) {
      case 'assigned':
        return (
          <button
            className={`${styles.actionButton} ${styles.primaryButton}`}
            onClick={() => handleStatusChange('pickup')}
          >
            Arrived at Restaurant
          </button>
        )
      case 'pickup':
        return (
          <button
            className={`${styles.actionButton} ${styles.primaryButton}`}
            onClick={() => handleStatusChange('enroute')}
          >
            Picked Up Order
          </button>
        )
      case 'enroute':
        return (
          <button
            className={`${styles.actionButton} ${styles.primaryButton}`}
            onClick={() => handleStatusChange('delivered')}
          >
            Mark as Delivered
          </button>
        )
      case 'delivered':
        return (
          <button
            className={`${styles.actionButton} ${styles.primaryButton}`}
            disabled
          >
            Order Completed
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{restaurantName}</h2>
        <p className={styles.subtitle}>Order Details</p>
        <div className={styles.orderId}>#{orderId}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            Pickup Location
          </h3>
          <div className={styles.locationCard}>
            <div className={styles.locationHeader}>
              <svg className={styles.locationIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
              </svg>
              <span className={styles.locationLabel}>Restaurant</span>
            </div>
            <div className={styles.locationName}>{pickup.name}</div>
            <div className={styles.locationAddress}>{pickup.address}</div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433c.099.051.192.097.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            Delivery Location
          </h3>
          <div className={styles.locationCard}>
            <div className={styles.locationHeader}>
              <svg className={styles.locationIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433c.099.051.192.097.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              <span className={styles.locationLabel}>Customer</span>
            </div>
            <div className={styles.locationName}>{dropoff.name}</div>
            <div className={styles.locationAddress}>{dropoff.address}</div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.107 10.5a.75.75 0 00-1.214 1.007l1.643 2.25a.75.75 0 001.214-.093l3.857-5.408z" clipRule="evenodd" />
            </svg>
            Navigation
          </h3>
          <div className={styles.mapPlaceholder}>
            🗺️ Map integration would go here
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Customer Information
          </h3>
          <div className={styles.customerInfo}>
            <div className={styles.customerAvatar}>
              {customer.avatar || customer.name.charAt(0)}
            </div>
            <div className={styles.customerDetails}>
              <div className={styles.customerName}>{customer.name}</div>
              <div className={styles.customerPhone}>{customer.phone}</div>
            </div>
            <button className={styles.callButton} aria-label="Call customer">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </button>
          </div>
        </div>

        {specialInstructions && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              Special Instructions
            </h3>
            <div className={styles.specialInstructions}>
              {specialInstructions}
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.actionButtons}>
          {getActionButton()}
          <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import styles from './page.module.scss'

// Mock data for available orders
const mockAvailableOrders = [
  {
    id: 'AVL-001',
    restaurantName: "Mario's Italian",
    subtitle: 'Ready for pickup in 5 min',
    pickup: {
      label: 'Restaurant',
      address: '456 Italian Way, Little Italy, NY 10013',
      icon: null
    },
    dropoff: {
      label: 'Customer',
      address: '789 Broadway, Apt 12C, NY 10014',
      icon: null
    },
    earnings: '15.25',
    distance: '1.5 mi',
    estimatedTime: '18 min',
    priority: 'normal' as const
  },
  {
    id: 'AVL-002',
    restaurantName: 'Sushi Express',
    subtitle: 'Order ready now',
    pickup: {
      label: 'Restaurant',
      address: '321 Sushi St, Japan Town, NY 10015',
      icon: null
    },
    dropoff: {
      label: 'Customer',
      address: '654 Park Ave, Tower B, NY 10016',
      icon: null
    },
    earnings: '22.50',
    distance: '2.1 mi',
    estimatedTime: '25 min',
    priority: 'high' as const
  },
  {
    id: 'AVL-003',
    restaurantName: 'Taco Fiesta',
    subtitle: 'Preparing order',
    pickup: {
      label: 'Restaurant',
      address: '987 Taco Blvd, Mexican Quarter, NY 10017',
      icon: null
    },
    dropoff: {
      label: 'Customer',
      address: '123 College St, Dorm 4, NY 10018',
      icon: null
    },
    earnings: '11.75',
    distance: '0.8 mi',
    estimatedTime: '12 min',
    priority: 'normal' as const
  },
  {
    id: 'AVL-004',
    restaurantName: 'Healthy Bowls',
    subtitle: 'Large order - High pay',
    pickup: {
      label: 'Restaurant',
      address: '555 Health Ave, Wellness Center, NY 10019',
      icon: null
    },
    dropoff: {
      label: 'Office Building',
      address: '777 Corporate Plaza, Floor 15, NY 10020',
      icon: null
    },
    earnings: '28.00',
    distance: '3.2 mi',
    estimatedTime: '35 min',
    priority: 'high' as const
  }
]

type FilterType = 'all' | 'high-pay' | 'nearby' | 'quick'

export default function AvailableOrdersPage() {
  const [orders, setOrders] = useState(mockAvailableOrders)
  const [filter, setFilter] = useState<FilterType>('all')
  const [isLoading, setIsLoading] = useState(false)

  const filteredOrders = orders.filter(order => {
    switch (filter) {
      case 'high-pay':
        return parseFloat(order.earnings) >= 20
      case 'nearby':
        return parseFloat(order.distance) <= 2
      case 'quick':
        return parseInt(order.estimatedTime) <= 20
      default:
        return true
    }
  })

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleAcceptOrder = (orderId: string) => {
    // Remove the accepted order from available orders
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
    // In a real app, this would make an API call to accept the order
    console.log(`Accepted order: ${orderId}`)
  }

  const handleDeclineOrder = (orderId: string) => {
    // Remove the declined order from available orders
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
    console.log(`Declined order: ${orderId}`)
  }

  // Simple AvailableOrderCard component
  const AvailableOrderCard = ({ order }: { order: typeof mockAvailableOrders[0] }) => (
    <div
      style={{
        background: 'var(--color-surface)',
        border: `2px solid ${order.priority === 'high' ? 'var(--color-warning)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      {order.priority === 'high' && (
        <div style={{
          position: 'absolute',
          top: '-1px',
          right: '-1px',
          background: 'var(--color-warning)',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0 var(--radius-lg) 0 var(--radius-md)',
          fontSize: '0.625rem',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          High Pay
        </div>
      )}

      <div>
        <h3 style={{ margin: 0, marginBottom: '0.25rem', fontWeight: 600 }}>{order.restaurantName}</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{order.subtitle}</p>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.75rem', fontFamily: 'monospace' }}>#{order.id}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-sm)',
          background: 'var(--color-background)',
          borderRadius: 'var(--radius-md)'
        }}>
          <svg style={{ width: '16px', height: '16px', color: 'var(--color-text-muted)', marginTop: '0.125rem' }} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.125rem' }}>
              {order.pickup.label}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
              {order.pickup.address}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-sm)',
          background: 'var(--color-background)',
          borderRadius: 'var(--radius-md)'
        }}>
          <svg style={{ width: '16px', height: '16px', color: 'var(--color-text-muted)', marginTop: '0.125rem' }} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433c.099.051.192.097.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.125rem' }}>
              {order.dropoff.label}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
              {order.dropoff.address}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 'var(--spacing-sm)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-success)', fontSize: '1.125rem' }}>
            ${order.earnings}
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            {order.distance}
          </span>
        </div>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {order.estimatedTime}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
        <button
          onClick={() => handleDeclineOrder(order.id)}
          style={{
            flex: '1',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Decline
        </button>
        <button
          onClick={() => handleAcceptOrder(order.id)}
          style={{
            flex: '2',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'var(--color-primary)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Accept Order
        </button>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Available Orders</h1>
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles['filterButton--active'] : ''}`}
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'high-pay' ? styles['filterButton--active'] : ''}`}
              onClick={() => setFilter('high-pay')}
            >
              High Pay
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'nearby' ? styles['filterButton--active'] : ''}`}
              onClick={() => setFilter('nearby')}
            >
              Nearby
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'quick' ? styles['filterButton--active'] : ''}`}
              onClick={() => setFilter('quick')}
            >
              Quick Delivery
            </button>
            <button
              className={styles.refreshButton}
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh orders"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3 className={styles.statValue}>{filteredOrders.length}</h3>
            <p className={styles.statLabel}>Available</p>
          </div>
          <div className={styles.stat}>
            <h3 className={styles.statValue}>
              ${filteredOrders.reduce((sum, order) => sum + parseFloat(order.earnings), 0).toFixed(2)}
            </h3>
            <p className={styles.statLabel}>Total Value</p>
          </div>
          <div className={styles.stat}>
            <h3 className={styles.statValue}>
              {filteredOrders.filter(order => order.priority === 'high').length}
            </h3>
            <p className={styles.statLabel}>High Priority</p>
          </div>
        </div>

        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <svg className={styles.spinner} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
              Refreshing orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
              </svg>
              <h2 className={styles.emptyTitle}>
                {filter === 'all' ? 'No Available Orders' : 'No Orders Match Filter'}
              </h2>
              <p className={styles.emptyDescription}>
                {filter === 'all'
                  ? 'There are no orders available in your area right now. Check back soon or try refreshing.'
                  : `No orders match the "${filter}" filter. Try adjusting your filters or check back later.`
                }
              </p>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {filteredOrders.map((order) => (
                <AvailableOrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
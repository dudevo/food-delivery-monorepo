'use client'

import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import OrderDetailPanel from '../../components/orders/OrderDetailPanel'
import styles from './page.module.scss'

// Import shared components
// import OrderCard from '@repo/ui/order-card'
// import StatusBadge from '@repo/ui/status-badge'

// Mock data - in a real app, this would come from an API
const mockActiveOrders = [
  {
    id: 'ORD-001',
    restaurantName: "Tony's Pizza",
    subtitle: 'Ready for pickup',
    customer: {
      name: 'John Smith',
      phone: '+1 (555) 123-4567'
    },
    pickup: {
      name: "Tony's Pizza",
      address: '123 Main St, Downtown, NY 10001'
    },
    dropoff: {
      name: 'John Smith',
      address: '456 Oak Ave, Apt 3B, NY 10002'
    },
    earnings: '12.50',
    distance: '2.3 mi',
    estimatedTime: '15 min',
    status: 'assigned' as const,
    specialInstructions: 'Please ring the doorbell twice. Leave at door if no answer.'
  },
  {
    id: 'ORD-002',
    restaurantName: 'Burger Palace',
    subtitle: 'Order being prepared',
    customer: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543'
    },
    pickup: {
      name: 'Burger Palace',
      address: '789 Food Court, Mall Plaza, NY 10003'
    },
    dropoff: {
      name: 'Sarah Johnson',
      address: '321 Pine St, Building A, NY 10004'
    },
    earnings: '18.75',
    distance: '1.8 mi',
    estimatedTime: '12 min',
    status: 'pickup' as const,
    specialInstructions: 'Customer prefers contactless delivery. Call when you arrive.'
  }
]

export default function ActiveOrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    mockActiveOrders.length > 0 ? mockActiveOrders[0].id : null
  )
  const [orders, setOrders] = useState(mockActiveOrders)

  const selectedOrder = orders.find(order => order.id === selectedOrderId)

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId)
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus as any }
          : order
      )
    )
  }

  // Simple OrderCard component (in a real app, this would use the shared component)
  const OrderCard = ({ order, isSelected, onSelect }: any) => (
    <div
      className={`order-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(order.id)}
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
        <div>
          <h3 style={{ margin: 0, marginBottom: '0.25rem', fontWeight: 600 }}>{order.restaurantName}</h3>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{order.subtitle}</p>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.75rem', fontFamily: 'monospace' }}>#{order.id}</p>
        </div>
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          background: order.status === 'assigned' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          color: order.status === 'assigned' ? '#d97706' : '#2563eb'
        }}>
          {order.status}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>${order.earnings}</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{order.distance} • {order.estimatedTime}</span>
      </div>
    </div>
  )

  return (
    <Layout activeOrdersCount={orders.length}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Active Orders</h1>
          <div className={styles.statusBadge}>
            <span className={styles.statusIndicator} />
            {orders.length} Active
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.ordersList}>
            {orders.length === 0 ? (
              <div className={styles.emptyState}>
                <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375z" clipRule="evenodd" />
                </svg>
                <h2 className={styles.emptyTitle}>No Active Orders</h2>
                <p className={styles.emptyDescription}>
                  You don't have any active orders right now. Check the Available Orders section to find new deliveries.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isSelected={selectedOrderId === order.id}
                  onSelect={handleOrderSelect}
                />
              ))
            )}
          </div>

          <div className={styles.detailPanel}>
            {selectedOrder ? (
              <OrderDetailPanel
                orderId={selectedOrder.id}
                restaurantName={selectedOrder.restaurantName}
                customer={selectedOrder.customer}
                pickup={selectedOrder.pickup}
                dropoff={selectedOrder.dropoff}
                specialInstructions={selectedOrder.specialInstructions}
                status={selectedOrder.status}
                onStatusChange={(newStatus) => handleStatusChange(selectedOrder.id, newStatus)}
              />
            ) : (
              <div className={styles.detailPanelPlaceholder}>
                <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15.75a3 3 0 01-3-3V4.875C18 3.839 17.16 3 16.125 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
                  <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                </svg>
                <h3 className={styles.placeholderTitle}>Select an Order</h3>
                <p className={styles.placeholderDescription}>
                  Choose an order from the list to view its details and manage the delivery.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from '../components/ui/Button'
import styles from './page.module.scss'

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    restaurant: 'Mama\'s Italian Kitchen',
    items: ['Spaghetti Carbonara', 'Margherita Pizza'],
    total: 52.97,
    status: 'delivered',
    orderTime: '2024-01-15T18:30:00Z',
    deliveryTime: '2024-01-15T19:05:00Z',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop'
  },
  {
    id: 'ORD-002',
    restaurant: 'Tokyo Sushi Express',
    items: ['California Roll', 'Salmon Nigiri', 'Miso Soup'],
    total: 34.50,
    status: 'out_for_delivery',
    orderTime: '2024-01-16T12:15:00Z',
    estimatedDelivery: '2024-01-16T12:45:00Z',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=80&h=80&fit=crop',
    courier: {
      name: 'Alex Rodriguez',
      phone: '+1 (555) 987-6543',
      vehicle: 'Honda Civic - License: ABC123'
    }
  }
]

const statusConfig = {
  placed: { label: 'Order Placed', icon: '📋', color: 'blue' },
  confirmed: { label: 'Confirmed', icon: '✅', color: 'green' },
  preparing: { label: 'Preparing', icon: '👨‍🍳', color: 'orange' },
  ready: { label: 'Ready for Pickup', icon: '📦', color: 'purple' },
  out_for_delivery: { label: 'Out for Delivery', icon: '🚚', color: 'blue' },
  delivered: { label: 'Delivered', icon: '✅', color: 'green' }
}

export default function OrdersPage() {
  const activeOrder = mockOrders.find(order => order.status !== 'delivered')
  const orderHistory = mockOrders.filter(order => order.status === 'delivered')

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Orders</h1>
          <p className={styles.subtitle}>Track your current orders and view order history</p>
        </div>

        {/* Active Order Tracking */}
        {activeOrder && (
          <div className={styles.activeOrderSection}>
            <h2 className={styles.sectionTitle}>Current Order</h2>
            <div className={styles.activeOrder}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderImage}>
                    <Image
                      src={activeOrder.image}
                      alt={activeOrder.restaurant}
                      width={60}
                      height={60}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.orderDetails}>
                    <h3 className={styles.restaurantName}>{activeOrder.restaurant}</h3>
                    <p className={styles.orderNumber}>Order #{activeOrder.id}</p>
                    <p className={styles.orderTime}>
                      Ordered at {formatTime(activeOrder.orderTime)}
                    </p>
                  </div>
                </div>
                <div className={styles.orderStatus}>
                  <div className={`${styles.statusBadge} ${styles[statusConfig[activeOrder.status as keyof typeof statusConfig].color]}`}>
                    <span className={styles.statusIcon}>
                      {statusConfig[activeOrder.status as keyof typeof statusConfig].icon}
                    </span>
                    {statusConfig[activeOrder.status as keyof typeof statusConfig].label}
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className={styles.timeline}>
                <div className={`${styles.timelineStep} ${styles.completed}`}>
                  <div className={styles.timelineIcon}>📋</div>
                  <div className={styles.timelineContent}>
                    <h4>Order Placed</h4>
                    <p>{formatTime(activeOrder.orderTime)}</p>
                  </div>
                </div>
                <div className={`${styles.timelineStep} ${styles.completed}`}>
                  <div className={styles.timelineIcon}>✅</div>
                  <div className={styles.timelineContent}>
                    <h4>Order Confirmed</h4>
                    <p>Restaurant accepted your order</p>
                  </div>
                </div>
                <div className={`${styles.timelineStep} ${styles.completed}`}>
                  <div className={styles.timelineIcon}>👨‍🍳</div>
                  <div className={styles.timelineContent}>
                    <h4>Preparing Your Food</h4>
                    <p>Chef is working on your order</p>
                  </div>
                </div>
                <div className={`${styles.timelineStep} ${activeOrder.status === 'out_for_delivery' ? styles.active : ''}`}>
                  <div className={styles.timelineIcon}>🚚</div>
                  <div className={styles.timelineContent}>
                    <h4>Out for Delivery</h4>
                    <p>
                      {activeOrder.status === 'out_for_delivery'
                        ? `ETA: ${formatTime(activeOrder.estimatedDelivery!)}`
                        : 'Waiting for courier pickup'
                      }
                    </p>
                  </div>
                </div>
                <div className={styles.timelineStep}>
                  <div className={styles.timelineIcon}>🏠</div>
                  <div className={styles.timelineContent}>
                    <h4>Delivered</h4>
                    <p>Enjoy your meal!</p>
                  </div>
                </div>
              </div>

              {/* Courier Info */}
              {activeOrder.courier && (
                <div className={styles.courierInfo}>
                  <h4 className={styles.courierTitle}>Your Courier</h4>
                  <div className={styles.courierDetails}>
                    <div className={styles.courierName}>
                      🚗 {activeOrder.courier.name}
                    </div>
                    <div className={styles.courierVehicle}>
                      {activeOrder.courier.vehicle}
                    </div>
                    <a
                      href={`tel:${activeOrder.courier.phone}`}
                      className={styles.courierPhone}
                    >
                      📞 Call Courier
                    </a>
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapIcon}>🗺️</div>
                  <p>Real-time tracking map would appear here</p>
                  <p className={styles.mapNote}>
                    Track your delivery in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order History */}
        <div className={styles.historySection}>
          <h2 className={styles.sectionTitle}>Order History</h2>
          {orderHistory.length > 0 ? (
            <div className={styles.orderList}>
              {orderHistory.map(order => (
                <div key={order.id} className={styles.historyOrder}>
                  <div className={styles.orderImage}>
                    <Image
                      src={order.image}
                      alt={order.restaurant}
                      width={60}
                      height={60}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.orderInfo}>
                    <h3 className={styles.restaurantName}>{order.restaurant}</h3>
                    <p className={styles.orderItems}>
                      {order.items.join(', ')}
                    </p>
                    <p className={styles.orderDate}>
                      {formatDate(order.orderTime)} • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className={styles.orderActions}>
                    <div className={`${styles.statusBadge} ${styles.green}`}>
                      ✅ Delivered
                    </div>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyHistory}>
              <div className={styles.emptyIcon}>📋</div>
              <h3 className={styles.emptyTitle}>No previous orders</h3>
              <p className={styles.emptyDescription}>
                Your order history will appear here after you place your first order.
              </p>
              <Link href="/restaurants">
                <Button variant="primary">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
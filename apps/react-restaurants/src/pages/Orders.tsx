import React, { useState } from 'react';
import { OrderTabs } from '../components/orders/OrderTabs';
import { OrderDetailPanel } from '../components/orders/OrderDetailPanel';
import { type OrderStatus } from '../components/orders/OrderCard';
import styles from './Orders.module.scss';

// Mock data types
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: string;
}

interface Customer {
  name: string;
  phone: string;
  address?: string;
  email?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  specialInstructions?: string;
  urgent?: boolean;
}

interface DetailedOrder extends Order {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  estimatedDelivery?: string;
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: string;
    isCurrent: boolean;
  }>;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '1234',
    customer: { name: 'John Doe', phone: '+1 (555) 123-4567' },
    items: [
      { id: '1', name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      { id: '2', name: 'Caesar Salad', quantity: 1, price: 12.99 }
    ],
    total: 31.98,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    urgent: true,
    specialInstructions: 'Extra cheese on pizza, no croutons in salad'
  },
  {
    id: '2',
    orderNumber: '1235',
    customer: { name: 'Jane Smith', phone: '+1 (555) 987-6543' },
    items: [
      { id: '3', name: 'Chicken Burger', quantity: 2, price: 15.99 },
      { id: '4', name: 'French Fries', quantity: 1, price: 6.99 }
    ],
    total: 38.97,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    orderNumber: '1236',
    customer: { name: 'Mike Johnson', phone: '+1 (555) 456-7890' },
    items: [
      { id: '5', name: 'Pasta Carbonara', quantity: 1, price: 16.99 }
    ],
    total: 16.99,
    status: 'preparing',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    orderNumber: '1237',
    customer: { name: 'Sarah Wilson', phone: '+1 (555) 654-3210' },
    items: [
      { id: '6', name: 'Fish & Chips', quantity: 1, price: 19.99 },
      { id: '7', name: 'Soft Drink', quantity: 2, price: 2.99 }
    ],
    total: 25.97,
    status: 'ready',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  }
];

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
    visible: boolean;
  } | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      showNotification('success', 'Status Updated', `Order #${orders.find(o => o.id === orderId)?.orderNumber} marked as ${newStatus}`);
    } catch {
      showNotification('error', 'Update Failed', 'Failed to update order status');
    }
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseDetails = () => {
    setSelectedOrderId(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    showNotification('success', 'Refreshed', 'Orders updated successfully');
  };

  const showNotification = (type: 'success' | 'error', title: string, message: string) => {
    setNotification({ type, title, message, visible: true });
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, visible: false } : null);
      setTimeout(() => setNotification(null), 300);
    }, 3000);
  };

  const getDetailedOrder = (orderId: string): DetailedOrder | null => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    // Mock detailed order data
    return {
      ...order,
      customer: {
        ...order.customer,
        address: '123 Main St, Anytown, AT 12345',
        email: 'customer@example.com'
      },
      subtotal: order.total * 0.85,
      tax: order.total * 0.10,
      deliveryFee: order.total * 0.05,
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      statusHistory: [
        { status: 'pending' as OrderStatus, timestamp: order.createdAt, isCurrent: order.status === 'pending' },
        { status: 'confirmed' as OrderStatus, timestamp: new Date(new Date(order.createdAt).getTime() + 5 * 60 * 1000).toISOString(), isCurrent: order.status === 'confirmed' },
        { status: 'preparing' as OrderStatus, timestamp: new Date(new Date(order.createdAt).getTime() + 10 * 60 * 1000).toISOString(), isCurrent: order.status === 'preparing' },
        { status: 'ready' as OrderStatus, timestamp: new Date(new Date(order.createdAt).getTime() + 20 * 60 * 1000).toISOString(), isCurrent: order.status === 'ready' },
      ].filter(item => {
        const itemTime = new Date(item.timestamp).getTime();
        return itemTime <= Date.now();
      })
    };
  };

  const selectedOrder = selectedOrderId ? getDetailedOrder(selectedOrderId) : null;

  const orderStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    total: orders.length
  };

  return (
    <div className={styles.ordersPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          📋 Orders Management
        </h1>
        <div className={styles.pageActions}>
          <button
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <span className={`${styles.refreshIcon} ${refreshing ? styles['refreshIcon--spinning'] : ''}`}>
              🔄
            </span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </header>

      <div className={styles.orderStats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <p className={styles.statValue}>{orderStats.pending}</p>
          <p className={styles.statLabel}>Pending</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👨‍🍳</div>
          <p className={styles.statValue}>{orderStats.preparing}</p>
          <p className={styles.statLabel}>Preparing</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔔</div>
          <p className={styles.statValue}>{orderStats.ready}</p>
          <p className={styles.statLabel}>Ready</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <p className={styles.statValue}>{orderStats.total}</p>
          <p className={styles.statLabel}>Total Today</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.ordersSection}>
          <OrderTabs
            orders={orders}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewDetails}
            loading={loading}
          />
        </div>

        {selectedOrder && (
          <div className={styles.detailSection}>
            <OrderDetailPanel
              order={selectedOrder}
              onClose={handleCloseDetails}
            />
          </div>
        )}
      </div>

      {notification && (
        <div className={`${styles.notification} ${notification.visible ? styles['notification--visible'] : ''} ${styles[`notification--${notification.type}`]}`}>
          <span className={styles.notificationIcon}>
            {notification.type === 'success' ? '✅' : '❌'}
          </span>
          <div className={styles.notificationContent}>
            <p className={styles.notificationTitle}>{notification.title}</p>
            <p className={styles.notificationMessage}>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
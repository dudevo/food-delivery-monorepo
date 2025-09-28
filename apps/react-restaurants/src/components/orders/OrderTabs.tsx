import React, { useState } from 'react';
import { OrderCard, type OrderStatus } from './OrderCard';
import styles from './OrderTabs.module.scss';

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

interface TabConfig {
  id: OrderStatus;
  label: string;
  icon: string;
}

interface OrderTabsProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onViewDetails: (orderId: string) => void;
  loading?: boolean;
}

const tabs: TabConfig[] = [
  { id: 'pending', label: 'Pending', icon: '⏳' },
  { id: 'confirmed', label: 'Confirmed', icon: '✅' },
  { id: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { id: 'ready', label: 'Ready', icon: '🔔' },
  { id: 'completed', label: 'Completed', icon: '✨' },
  { id: 'cancelled', label: 'Cancelled', icon: '❌' }
];

const emptyMessages: Record<OrderStatus, { title: string; description: string; icon: string }> = {
  pending: {
    title: 'No pending orders',
    description: 'New orders will appear here when customers place them.',
    icon: '📋'
  },
  confirmed: {
    title: 'No confirmed orders',
    description: 'Orders you accept will appear here.',
    icon: '✅'
  },
  preparing: {
    title: 'No orders in preparation',
    description: 'Orders being prepared will show up here.',
    icon: '👨‍🍳'
  },
  ready: {
    title: 'No orders ready',
    description: 'Completed orders waiting for pickup will appear here.',
    icon: '🔔'
  },
  completed: {
    title: 'No completed orders',
    description: 'Successfully delivered orders will show up here.',
    icon: '✨'
  },
  cancelled: {
    title: 'No cancelled orders',
    description: 'Cancelled orders will appear here.',
    icon: '❌'
  }
};

export const OrderTabs: React.FC<OrderTabsProps> = ({
  orders,
  onStatusChange,
  onViewDetails,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('pending');

  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
  };

  const getTabCount = (status: OrderStatus): number => {
    return getOrdersByStatus(status).length;
  };

  const hasUrgentOrders = (status: OrderStatus): boolean => {
    return getOrdersByStatus(status).some(order => order.urgent);
  };

  const filteredOrders = getOrdersByStatus(activeTab);

  return (
    <div className={styles.orderTabs}>
      <div className={styles.tabsList} role="tablist">
        {tabs.map((tab) => {
          const count = getTabCount(tab.id);
          const isActive = activeTab === tab.id;
          const hasUrgent = hasUrgentOrders(tab.id);

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              className={`${styles.tab} ${isActive ? styles['tab--active'] : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={styles.tabLabel}>
                <p className={styles.tabTitle}>
                  <span aria-hidden="true">{tab.icon}</span>{' '}
                  {tab.label}
                </p>
                <span
                  className={`${styles.tabCount} ${hasUrgent ? styles['tabCount--urgent'] : ''}`}
                  aria-label={`${count} ${tab.label.toLowerCase()} orders`}
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className={styles.tabContent}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner} aria-label="Loading orders..." />
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className={styles.ordersGrid}>
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">
              {emptyMessages[activeTab].icon}
            </div>
            <h3 className={styles.emptyTitle}>
              {emptyMessages[activeTab].title}
            </h3>
            <p className={styles.emptyDescription}>
              {emptyMessages[activeTab].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { type OrderStatus } from './OrderCard';
import styles from './OrderDetailPanel.module.scss';

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

interface StatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  isCurrent: boolean;
}

interface DetailedOrder {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery?: string;
  specialInstructions?: string;
  statusHistory: StatusHistoryItem[];
}

interface OrderDetailPanelProps {
  order: DetailedOrder;
  onClose: () => void;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending Confirmation',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({
  order,
  onClose
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>Order #{order.orderNumber}</h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close order details"
        >
          ✕
        </button>
      </div>

      <div className={styles.detailContent}>
        {/* Order Meta Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            📋 Order Information
          </h3>
          <div className={styles.orderMeta}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Status</p>
              <p className={`${styles.metaValue} ${styles['metaValue--status']} ${order.status}`}>
                {statusLabels[order.status]}
              </p>
            </div>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Order Time</p>
              <p className={styles.metaValue}>{formatTime(order.createdAt)}</p>
            </div>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Order Number</p>
              <p className={styles.metaValue}>#{order.orderNumber}</p>
            </div>
            {order.estimatedDelivery && (
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Estimated Delivery</p>
                <p className={styles.metaValue}>{formatTime(order.estimatedDelivery)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            👤 Customer Information
          </h3>
          <div className={styles.customerDetails}>
            <div className={styles.customerField}>
              <p className={styles.fieldLabel}>Name</p>
              <p className={styles.fieldValue}>{order.customer.name}</p>
            </div>
            <div className={styles.customerField}>
              <p className={styles.fieldLabel}>Phone</p>
              <p className={styles.fieldValue}>{order.customer.phone}</p>
            </div>
            {order.customer.email && (
              <div className={styles.customerField}>
                <p className={styles.fieldLabel}>Email</p>
                <p className={styles.fieldValue}>{order.customer.email}</p>
              </div>
            )}
            {order.customer.address && (
              <div className={styles.customerField}>
                <p className={styles.fieldLabel}>Address</p>
                <p className={styles.fieldValue}>{order.customer.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            🍽️ Order Items ({order.items.length})
          </h3>
          <ul className={styles.itemsList}>
            {order.items.map((item) => (
              <li key={item.id} className={styles.itemsListItem}>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  {item.customizations && (
                    <p className={styles.itemCustomizations}>
                      {item.customizations}
                    </p>
                  )}
                </div>
                <div className={styles.itemPricing}>
                  <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            💰 Order Summary
          </h3>
          <div className={styles.orderSummary}>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Subtotal</p>
              <p className={styles.summaryValue}>{formatPrice(order.subtotal)}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Tax</p>
              <p className={styles.summaryValue}>{formatPrice(order.tax)}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Delivery Fee</p>
              <p className={styles.summaryValue}>{formatPrice(order.deliveryFee)}</p>
            </div>
            <div className={`${styles.summaryRow} ${styles['summaryRow--total']}`}>
              <p className={styles.summaryLabel}>Total</p>
              <p className={styles.summaryValue}>{formatPrice(order.total)}</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              📝 Special Instructions
            </h3>
            <p className={styles.specialNote}>
              {order.specialInstructions}
            </p>
          </div>
        )}

        {/* Status History */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            📈 Order Progress
          </h3>
          <ul className={styles.statusHistory}>
            {order.statusHistory.map((item, index) => (
              <li key={index} className={styles.historyItem}>
                <div className={`${styles.historyIcon} ${item.isCurrent ? styles['historyIcon--current'] : ''}`}>
                  {item.isCurrent ? '●' : '○'}
                </div>
                <div className={styles.historyContent}>
                  <p className={styles.historyStatus}>
                    {statusLabels[item.status]}
                  </p>
                  <p className={styles.historyTime}>
                    {formatTime(item.timestamp)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
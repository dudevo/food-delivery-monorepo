import React from 'react';
import { Button } from '../ui/Button';
import styles from './OrderCard.module.scss';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

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

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onViewDetails: (orderId: string) => void;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

const getStatusActions = (status: OrderStatus): OrderStatus[] => {
  switch (status) {
    case 'pending':
      return ['confirmed', 'cancelled'];
    case 'confirmed':
      return ['preparing', 'cancelled'];
    case 'preparing':
      return ['ready'];
    case 'ready':
      return ['completed'];
    default:
      return [];
  }
};

const getActionLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'Accept Order';
    case 'preparing':
      return 'Start Preparing';
    case 'ready':
      return 'Mark Ready';
    case 'completed':
      return 'Mark Completed';
    case 'cancelled':
      return 'Cancel Order';
    default:
      return statusLabels[status];
  }
};

const getActionVariant = (status: OrderStatus): 'primary' | 'success' | 'error' => {
  switch (status) {
    case 'cancelled':
      return 'error';
    case 'completed':
    case 'ready':
      return 'success';
    default:
      return 'primary';
  }
};

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onStatusChange,
  onViewDetails
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const availableActions = getStatusActions(order.status);

  return (
    <div className={styles.orderCard}>
      {order.urgent && (
        <div className={styles.urgentIndicator} title="Urgent order" />
      )}

      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <h3 className={styles.orderNumber}>Order #{order.orderNumber}</h3>
          <p className={styles.orderTime}>{formatTime(order.createdAt)}</p>
        </div>
        <span className={`${styles.orderStatus} ${styles[`orderStatus--${order.status}`]}`}>
          {statusLabels[order.status]}
        </span>
      </div>

      <div className={styles.customerInfo}>
        <h4 className={styles.customerName}>
          👤 {order.customer.name}
        </h4>
        <p className={styles.customerPhone}>📞 {order.customer.phone}</p>
      </div>

      <div className={styles.orderItems}>
        <h5 className={styles.orderItemsTitle}>Items ({order.items.length})</h5>
        {order.items.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.name}</p>
              {item.customizations && (
                <p className={styles.itemCustomizations}>{item.customizations}</p>
              )}
            </div>
            <span className={styles.itemQuantity}>×{item.quantity}</span>
            <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>

      {order.specialInstructions && (
        <div className={styles.specialInstructions}>
          <p className={styles.instructionsLabel}>Special Instructions</p>
          <p className={styles.instructionsText}>{order.specialInstructions}</p>
        </div>
      )}

      <div className={styles.orderTotal}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalAmount}>{formatPrice(order.total)}</span>
      </div>

      <div className={styles.orderActions}>
        {availableActions.map((action) => (
          <Button
            key={action}
            variant={getActionVariant(action)}
            size="sm"
            className={styles.actionButton}
            onClick={() => onStatusChange(order.id, action)}
          >
            {getActionLabel(action)}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className={styles.actionButton}
          onClick={() => onViewDetails(order.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
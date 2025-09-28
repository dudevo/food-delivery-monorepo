import React from 'react';
import styles from './MenuItemCard.module.scss';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  preparationTime: number;
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  stats?: {
    ordersToday: number;
    totalOrders: number;
    rating: number;
    reviews: number;
  };
}

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (itemId: string) => void;
  onToggleAvailability: (itemId: string) => void;
  showStats?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onToggleAvailability,
  showStats = true
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const cardClassName = [
    styles.menuItemCard,
    !item.isAvailable && styles['menuItemCard--unavailable']
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClassName}>
      <div className={styles.cardHeader}>
        <div className={styles.itemImage}>
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <span>🍽️</span>
          )}
        </div>

        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemDescription}>{item.description}</p>

          <div className={styles.itemMeta}>
            <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
            <span className={styles.itemCategory}>{item.category}</span>
            <span className={`${styles.availabilityBadge} ${styles[`availabilityBadge--${item.isAvailable ? 'available' : 'unavailable'}`]}`}>
              {item.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
      </div>

      {showStats && item.stats && (
        <div className={styles.itemStats}>
          <div className={styles.statItem}>
            <svg className={styles.statIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
            </svg>
            <span>Today: </span>
            <span className={styles.statValue}>{item.stats.ordersToday}</span>
          </div>

          <div className={styles.statItem}>
            <svg className={styles.statIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            <span className={styles.statValue}>{item.stats.rating.toFixed(1)}</span>
            <span>({item.stats.reviews})</span>
          </div>

          <div className={styles.statItem}>
            <svg className={styles.statIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
            </svg>
            <span className={styles.statValue}>{item.preparationTime}min</span>
          </div>
        </div>
      )}

      <div className={styles.cardActions}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(item)}
        >
          Edit
        </button>

        <button
          className={`${styles.actionButton} ${item.isAvailable ? '' : styles['actionButton--primary']}`}
          onClick={() => onToggleAvailability(item.id)}
        >
          {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
        </button>

        <button
          className={`${styles.actionButton} ${styles['actionButton--danger']}`}
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
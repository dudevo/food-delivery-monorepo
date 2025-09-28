import React from 'react';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  subtext?: string;
  trend?: {
    value: string;
    direction: 'positive' | 'negative' | 'neutral';
  };
  footerLink?: {
    text: string;
    href: string;
  };
  onClick?: () => void;
  onQuickAction?: () => void;
  quickActionIcon?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  iconVariant = 'primary',
  subtext,
  trend,
  footerLink,
  onClick,
  onQuickAction,
  quickActionIcon = '⋯'
}) => {
  const isClickable = !!onClick;

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleQuickActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAction) {
      onQuickAction();
    }
  };

  return (
    <div
      className={`${styles.dashboardCard} ${isClickable ? styles['dashboardCard--clickable'] : ''}`}
      onClick={handleCardClick}
    >
      {onQuickAction && (
        <button
          className={styles.quickAction}
          onClick={handleQuickActionClick}
          aria-label="Quick actions"
        >
          {quickActionIcon}
        </button>
      )}

      <div className={`${styles.cardIcon} ${styles[`cardIcon--${iconVariant}`]}`}>
        {icon}
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>

      <div className={styles.cardValue}>{value}</div>

      {(subtext || trend) && (
        <div className={styles.cardSubtext}>
          {subtext && <span>{subtext}</span>}
          {trend && (
            <span className={`${styles.trendIndicator} ${styles[`trendIndicator--${trend.direction}`]}`}>
              {trend.direction === 'positive' && '↗'}
              {trend.direction === 'negative' && '↘'}
              {trend.direction === 'neutral' && '→'}
              {trend.value}
            </span>
          )}
        </div>
      )}

      {footerLink && (
        <div className={styles.cardFooter}>
          <a href={footerLink.href} className={styles.footerLink}>
            {footerLink.text}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </div>
  );
};
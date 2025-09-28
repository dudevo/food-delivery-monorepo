import React from 'react';
import styles from './MetricsCard.module.scss';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtext?: string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  progress?: {
    value: number;
    max: number;
    label?: string;
  };
  footer?: {
    text: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  onClick?: () => void;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  subtext,
  trend,
  variant = 'default',
  progress,
  footer,
  onClick
}) => {
  const cardClassName = [
    styles.metricsCard,
    variant !== 'default' && styles[`metricsCard--${variant}`]
  ].filter(Boolean).join(' ');

  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up':
        return (
          <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'neutral':
      default:
        return (
          <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  const progressPercentage = progress ? (progress.value / progress.max) * 100 : 0;

  return (
    <div className={cardClassName} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          {icon}
        </div>
        {trend && (
          <div className={`${styles.cardTrend} ${styles[`cardTrend--${trend.direction}`]}`}>
            {getTrendIcon()}
            {trend.value > 0 && trend.direction !== 'neutral' && (trend.direction === 'up' ? '+' : '-')}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.metricValue}>{formatValue(value)}</h3>
        <p className={styles.metricLabel}>{title}</p>
        {subtext && <p className={styles.metricSubtext}>{subtext}</p>}

        {progress && (
          <>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            {progress.label && (
              <p className={styles.metricSubtext}>
                {progress.label}: {progress.value} / {progress.max}
              </p>
            )}
          </>
        )}
      </div>

      {footer && (
        <div className={styles.cardFooter}>
          <span className={styles.footerText}>{footer.text}</span>
          {footer.action && (
            <button
              className={styles.footerAction}
              onClick={(e) => {
                e.stopPropagation();
                footer.action!.onClick();
              }}
            >
              {footer.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
import React, { type ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'flat';
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardSubtitleProps {
  children: ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  clickable = false,
  className = '',
  onClick
}) => {
  const classNames = [
    styles.card,
    styles[`card--${variant}`],
    clickable && styles['card--clickable'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => (
  <div className={`${styles.cardHeader} ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = ''
}) => (
  <div className={`${styles.cardContent} ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => (
  <div className={`${styles.cardFooter} ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = ''
}) => (
  <h3 className={`${styles.cardTitle} ${className}`}>
    {children}
  </h3>
);

export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  className = ''
}) => (
  <p className={`${styles.cardSubtitle} ${className}`}>
    {children}
  </p>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = ''
}) => (
  <p className={`${styles.cardDescription} ${className}`}>
    {children}
  </p>
);
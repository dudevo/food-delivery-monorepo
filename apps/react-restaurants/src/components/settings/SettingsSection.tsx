import React, { type ReactNode } from 'react';
import styles from './SettingsSection.module.scss';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
  actions
}) => {
  return (
    <section className={styles.settingsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {description && (
            <p className={styles.sectionDescription}>{description}</p>
          )}
        </div>
        {actions && (
          <div className={styles.sectionActions}>
            {actions}
          </div>
        )}
      </div>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </section>
  );
};
import type { NavigationProps } from '../../types/navigation'
import styles from './BottomNav.module.scss'

const BottomNav = ({ items, activeKey, onChange }: NavigationProps) => {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile Navigation">
      <div className={styles.navList}>
        {items.map(({ key, label, icon: Icon, badge, ariaLabel }) => (
          <button
            key={key}
            type="button"
            className={`${styles.navButton} ${activeKey === key ? styles.navButtonActive : ''}`.trim()}
            onClick={() => onChange(key)}
            aria-label={ariaLabel || label}
            aria-current={activeKey === key ? 'page' : undefined}
          >
            <span className={styles.iconWrapper} aria-hidden="true">
              <Icon size={18} />
            </span>
            <span>{label}</span>
            {badge ? <span className={styles.badge}>{badge}</span> : null}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav

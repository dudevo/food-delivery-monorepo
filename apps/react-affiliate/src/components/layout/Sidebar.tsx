import { Button } from '@repo/ui/button'
import { Headset } from 'lucide-react'
import type { NavigationProps } from '../../types/navigation'
import styles from './Sidebar.module.scss'

interface SidebarProps extends NavigationProps {
  onOpenSupport: () => void
}

const Sidebar = ({ items, activeKey, onChange, onOpenSupport }: SidebarProps) => {
  return (
    <aside className={styles.sidebar} aria-label="Section Navigation">
      <span className={styles.title}>Menu</span>
      <div className={styles.navList} role="list">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={`${styles.navButton} ${activeKey === key ? styles.navButtonActive : ''}`.trim()}
            onClick={() => onChange(key)}
            aria-current={activeKey === key ? 'page' : undefined}
          >
            <span className={styles.navButtonIcon} aria-hidden="true">
              <Icon size={18} />
            </span>
            {label}
          </button>
        ))}
      </div>

      <div className={styles.supportCard} role="group" aria-label="Need help?">
        <span className={styles.supportCardTitle}>Need help?</span>
        <p className={styles.supportCardDescription}>
          Our affiliate success team is online 24/7 to support your campaigns.
        </p>
        <Button variant="outline" size="sm" onClick={onOpenSupport} aria-label="Contact support">
          <Headset size={18} aria-hidden="true" />
          Contact Support
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
export type { SidebarProps }

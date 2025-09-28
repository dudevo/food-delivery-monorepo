import { Button } from '@repo/ui/button'
import { Bell, MessageCircle, Plus } from 'lucide-react'
import type { NavigationProps } from '../../types/navigation'
import styles from './NavBar.module.scss'

interface NavBarProps extends NavigationProps {
  onCreateLink: () => void
  onOpenSupport: () => void
}

const NavBar = ({ items, activeKey, onChange, onCreateLink, onOpenSupport }: NavBarProps) => {
  return (
    <nav className={styles.navBar} aria-label="Primary Navigation">
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          FD
        </span>
        <span>FoodDash Affiliates</span>
      </div>

      <div className={styles.navList} role="menubar">
        {items.map(({ key, label, icon: Icon, badge, ariaLabel }) => (
          <button
            key={key}
            type="button"
            role="menuitemradio"
            aria-checked={activeKey === key}
            aria-label={ariaLabel || label}
            className={`${styles.navButton} ${activeKey === key ? styles.navButtonActive : ''}`.trim()}
            onClick={() => onChange(key)}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
            {badge ? <span className={styles.badge}>{badge}</span> : null}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <Button variant="outline" size="sm" onClick={onOpenSupport} aria-label="Open support chat">
          <MessageCircle size={18} aria-hidden="true" />
          Support
        </Button>
        <Button size="sm" onClick={onCreateLink} aria-label="Create new affiliate link">
          <Plus size={18} aria-hidden="true" />
          Create Link
        </Button>
        <button
          type="button"
          className={styles.avatarButton}
          aria-label="View notifications"
        >
          <Bell size={18} aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
export type { NavBarProps }

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './MobileNavigation.module.scss'

interface MobileNavigationProps {
  activeOrdersCount?: number
}

export default function MobileNavigation({ activeOrdersCount = 0 }: MobileNavigationProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/orders/active',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm0 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Orders',
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined
    },
    {
      href: '/earnings',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .668.35 1.299.968 1.772.365.279.796.472 1.282.545v1.191a.75.75 0 001.5 0v-1.191c.486-.073.917-.266 1.282-.545.618-.473.968-1.104.968-1.772 0-.668-.35-1.299-.968-1.772a3.836 3.836 0 00-1.282-.545V9.756c.824.153 1.5.881 1.5 1.994a.75.75 0 001.5 0c0-.829-.4-1.612-1.112-2.178-.502-.4-1.102-.647-1.72-.756V6z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Earnings'
    },
    {
      href: '/profile',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Profile'
    },
    {
      href: '/settings',
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.279 5.57a1.875 1.875 0 00-2.28.602L2.845 7.83a1.875 1.875 0 00-.233 2.249l.706 1.086c.078.115.078.26.004.378a7.625 7.625 0 000 1.138c.074.118.074.263-.004.378l-.706 1.086a1.875 1.875 0 00.233 2.249l1.154 1.657a1.875 1.875 0 002.28.602l1.038-.32c.116-.043.284-.032.45.083.312.23.65.414.986.57.182.088.277.228.297.348l.178 1.071c.151.904.933 1.567 1.85 1.567h2.844c.917 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.115-.26.297-.347.336-.157.674-.34.986-.571.166-.115.334-.126.45-.083l1.038.32a1.875 1.875 0 002.28-.602l1.154-1.657a1.875 1.875 0 00.233-2.249l-.706-1.086c-.078-.115-.078-.26-.004-.378a7.625 7.625 0 000-1.138c-.074-.118-.074-.263.004-.378l.706-1.086a1.875 1.875 0 00-.233-2.249L19.155 4.172a1.875 1.875 0 00-2.28-.602l-1.038.32c-.116.043-.284.032-.45-.083a7.493 7.493 0 00-.986-.57c-.182-.088-.277-.228-.297-.348L13.926 3.817c-.151-.904-.933-1.567-1.85-1.567h-2.844zM15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Settings'
    }
  ]

  return (
    <nav className={styles.mobileNav}>
      <div className={styles.navList}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const itemClass = [
            styles.navItem,
            isActive && styles['navItem--active']
          ].filter(Boolean).join(' ')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={itemClass}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className={styles.badge}>{item.badge}</span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
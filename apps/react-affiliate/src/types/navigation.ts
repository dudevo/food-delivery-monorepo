import type { LucideIcon } from 'lucide-react'

export type RouteKey = 'dashboard' | 'links' | 'earnings' | 'profile'

export interface NavigationItem {
  key: RouteKey
  label: string
  icon: LucideIcon
  badge?: number
  ariaLabel?: string
}

export interface NavigationProps {
  items: NavigationItem[]
  activeKey: RouteKey
  onChange: (key: RouteKey) => void
}

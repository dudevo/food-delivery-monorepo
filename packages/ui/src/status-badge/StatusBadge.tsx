import type { HTMLAttributes } from 'react'
import './status-badge.css'

type StatusType = 'online' | 'offline' | 'pickup' | 'enroute' | 'delivered' | 'pending' | 'active'
type StatusSize = 'sm' | 'md' | 'lg'

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusType
  size?: StatusSize
  showIndicator?: boolean
}

const StatusBadge = ({
  status,
  size = 'md',
  showIndicator = true,
  children,
  className = '',
  ...props
}: StatusBadgeProps) => {
  const badgeClass = [
    'ui-status-badge',
    `ui-status-badge--${status}`,
    size !== 'md' && `ui-status-badge--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <span className={badgeClass} {...props}>
      {showIndicator && <span className="ui-status-badge__indicator" aria-hidden="true" />}
      {children}
    </span>
  )
}

export type { StatusBadgeProps, StatusType, StatusSize }
export default StatusBadge
import type { HTMLAttributes, ReactNode } from 'react'
import './order-card.css'

interface OrderLocation {
  label: string
  address: string
  icon?: ReactNode
}

interface OrderCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  orderId: string
  title: string
  subtitle?: string
  status?: ReactNode
  pickup: OrderLocation
  dropoff: OrderLocation
  earnings?: string
  distance?: string
  estimatedTime?: string
  specialInstructions?: string
  footer?: ReactNode
  compact?: boolean
  selected?: boolean
  onSelect?: () => void
}

const OrderCard = ({
  orderId,
  title,
  subtitle,
  status,
  pickup,
  dropoff,
  earnings,
  distance,
  estimatedTime,
  specialInstructions,
  footer,
  compact = false,
  selected = false,
  onSelect,
  className = '',
  onClick,
  ...props
}: OrderCardProps) => {
  const cardClass = [
    'ui-order-card',
    compact && 'ui-order-card--compact',
    selected && 'ui-order-card--selected',
    className
  ].filter(Boolean).join(' ')

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onSelect) {
      onSelect()
    }
    if (onClick) {
      onClick(e)
    }
  }

  const defaultPickupIcon = (
    <svg viewBox="0 0 20 20" fill="currentColor" className="ui-order-card__location-icon">
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
    </svg>
  )

  const defaultDropoffIcon = (
    <svg viewBox="0 0 20 20" fill="currentColor" className="ui-order-card__location-icon">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433c.099.051.192.097.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
    </svg>
  )

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      {...props}
    >
      <div className="ui-order-card__header">
        <div>
          <h3 className="ui-order-card__title">{title}</h3>
          {subtitle && <p className="ui-order-card__subtitle">{subtitle}</p>}
          <div className="ui-order-card__order-id">#{orderId}</div>
        </div>
        {status}
      </div>

      <div className="ui-order-card__content">
        <div className="ui-order-card__locations">
          <div className="ui-order-card__location">
            {pickup.icon || defaultPickupIcon}
            <div className="ui-order-card__location-info">
              <div className="ui-order-card__location-label">{pickup.label}</div>
              <div className="ui-order-card__location-address">{pickup.address}</div>
            </div>
          </div>

          <div className="ui-order-card__location">
            {dropoff.icon || defaultDropoffIcon}
            <div className="ui-order-card__location-info">
              <div className="ui-order-card__location-label">{dropoff.label}</div>
              <div className="ui-order-card__location-address">{dropoff.address}</div>
            </div>
          </div>
        </div>

        {specialInstructions && (
          <div className="ui-order-card__special-instructions">
            <span className="ui-order-card__special-instructions-label">Special Instructions:</span>
            {specialInstructions}
          </div>
        )}
      </div>

      {(earnings || distance || estimatedTime) && (
        <div className="ui-order-card__meta">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {earnings && (
              <div className="ui-order-card__earnings">
                ${earnings}
              </div>
            )}
            {distance && (
              <div className="ui-order-card__distance">
                {distance}
              </div>
            )}
          </div>
          {estimatedTime && (
            <div className="ui-order-card__time">
              {estimatedTime}
            </div>
          )}
        </div>
      )}

      {footer && <div className="ui-order-card__footer">{footer}</div>}
    </div>
  )
}

export type { OrderCardProps, OrderLocation }
export default OrderCard
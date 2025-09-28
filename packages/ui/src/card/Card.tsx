import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode
  subtitle?: ReactNode
  badge?: ReactNode
  footer?: ReactNode
  bleed?: ReactNode
}

const Card = ({
  title,
  subtitle,
  badge,
  footer,
  bleed,
  children,
  className = '',
  ...props
}: CardProps) => {
  const headerExists = title || subtitle || badge

  const rootClass = ['ui-card', className].filter(Boolean).join(' ')

  return (
    <section className={rootClass} {...props}>
      {headerExists && (
        <header className="ui-card__header">
          <div>
            {title && <h3 className="ui-card__title">{title}</h3>}
            {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
          </div>
          {badge && <span className="ui-card__badge">{badge}</span>}
        </header>
      )}

      {bleed && <div className="ui-card__bleed">{bleed}</div>}

      <div className="ui-card__content">{children}</div>

      {footer && <footer className="ui-card__footer">{footer}</footer>}
    </section>
  )
}

export type { CardProps }
export default Card

import type { HTMLAttributes, ReactNode } from 'react'
import './ChartPlaceholder.css'

interface ChartPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode
  assistiveText?: ReactNode
  description?: ReactNode
  emptyLabel?: string
}

const ChartPlaceholder = ({
  title,
  assistiveText,
  description,
  emptyLabel = 'Chart will render here',
  className = '',
  ...props
}: ChartPlaceholderProps) => {
  return (
    <section
      role="img"
      aria-label={typeof title === 'string' ? title : undefined}
      className={['ui-chart-placeholder', className].filter(Boolean).join(' ')}
      {...props}
    >
      {(title || assistiveText) && (
        <header className="ui-chart-placeholder__header">
          {title && <h4 className="ui-chart-placeholder__title">{title}</h4>}
          {assistiveText && (
            <span className="ui-chart-placeholder__assistive-text">{assistiveText}</span>
          )}
        </header>
      )}

      <div
        className="ui-chart-placeholder__canvas"
        aria-hidden="true"
      >
        {emptyLabel}
      </div>

      {description && <p className="ui-chart-placeholder__description">{description}</p>}
    </section>
  )
}

export type { ChartPlaceholderProps }
export default ChartPlaceholder

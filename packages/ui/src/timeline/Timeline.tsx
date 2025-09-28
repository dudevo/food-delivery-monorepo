import type { HTMLAttributes, ReactNode } from 'react'
import './timeline.css'

type TimelineItemStatus = 'completed' | 'active' | 'pending'

interface TimelineItemProps {
  status: TimelineItemStatus
  title: string
  description?: string
  timestamp?: string
  icon?: ReactNode
}

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  items: TimelineItemProps[]
  orientation?: 'vertical' | 'horizontal'
}

const Timeline = ({
  items,
  orientation = 'vertical',
  className = '',
  ...props
}: TimelineProps) => {
  const timelineClass = [
    'ui-timeline',
    orientation === 'horizontal' && 'ui-timeline--horizontal',
    className
  ].filter(Boolean).join(' ')

  const getDefaultIcon = (status: TimelineItemStatus): ReactNode => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'active':
        return '●'
      case 'pending':
        return '○'
      default:
        return '○'
    }
  }

  return (
    <div className={timelineClass} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`ui-timeline__item ui-timeline__item--${item.status}`}
        >
          <div className="ui-timeline__indicator">
            {item.icon || getDefaultIcon(item.status)}
          </div>
          <div className="ui-timeline__content">
            <div className="ui-timeline__title">{item.title}</div>
            {item.description && (
              <div className="ui-timeline__description">{item.description}</div>
            )}
            {item.timestamp && (
              <div className="ui-timeline__timestamp">{item.timestamp}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export type { TimelineProps, TimelineItemProps, TimelineItemStatus }
export default Timeline
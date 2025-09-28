import { Card } from '@repo/ui/card'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import styles from './DashboardCard.module.scss'

interface DashboardCardProps {
  title: string
  value: string
  helper?: string
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
    label?: string
  }
}

const DashboardCard = ({ title, value, helper, icon: Icon, trend }: DashboardCardProps) => {
  const TrendIcon = trend?.isPositive ? ArrowUpRight : ArrowDownRight
  const trendClass = trend?.isPositive ? styles.trendPositive : styles.trendNegative

  return (
    <Card className={styles.card} aria-label={`${title} card`}>
      <div className={styles.header}>
        <div>
          <span className={styles.title}>{title}</span>
          <p className={styles.value}>{value}</p>
        </div>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={22} />
        </span>
      </div>

      {trend ? (
        <span className={`${styles.trend} ${trendClass}`.trim()}>
          <TrendIcon size={16} aria-hidden="true" />
          {trend.value}
          {trend.label ? <span aria-hidden="true">· {trend.label}</span> : null}
        </span>
      ) : null}

      {helper ? <p className={styles.helper}>{helper}</p> : null}
    </Card>
  )
}

export default DashboardCard
export type { DashboardCardProps }

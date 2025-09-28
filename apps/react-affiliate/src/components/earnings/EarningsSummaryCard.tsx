import { Card } from '@repo/ui/card'
import type { LucideIcon } from 'lucide-react'
import styles from './EarningsSummaryCard.module.scss'

interface EarningsSummaryCardProps {
  label: string
  value: string
  statusHighlight: string
  statusCaption: string
  icon: LucideIcon
}

const EarningsSummaryCard = ({
  label,
  value,
  statusHighlight,
  statusCaption,
  icon: Icon
}: EarningsSummaryCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <Icon size={20} aria-hidden="true" />
      </div>
      <span className={styles.value}>{value}</span>
      <span className={styles.status}>
        <strong>{statusHighlight}</strong> {statusCaption}
      </span>
    </Card>
  )
}

export default EarningsSummaryCard
export type { EarningsSummaryCardProps }

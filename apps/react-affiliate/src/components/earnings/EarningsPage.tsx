import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { PiggyBank, ShieldCheck, Wallet, WalletMinimal } from 'lucide-react'
import EarningsSummaryCard from './EarningsSummaryCard'
import PayoutHistoryTable from './PayoutHistoryTable'
import type { PayoutHistoryRow } from './PayoutHistoryTable'
import styles from './EarningsPage.module.scss'

interface EarningsPageProps {
  payouts: PayoutHistoryRow[]
  onRequestPayout: () => void
}

const EarningsPage = ({ payouts, onRequestPayout }: EarningsPageProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.summaryGrid}>
        <EarningsSummaryCard
          label="Total earned"
          value="$24,860"
          statusHighlight="+18%"
          statusCaption="vs previous 30 days"
          icon={PiggyBank}
        />
        <EarningsSummaryCard
          label="Available balance"
          value="$3,420"
          statusHighlight="Ready to withdraw"
          statusCaption="Funds clear within 1 business day"
          icon={Wallet}
        />
        <EarningsSummaryCard
          label="Pending payouts"
          value="$1,240"
          statusHighlight="2 transfers"
          statusCaption="Scheduled for this week"
          icon={WalletMinimal}
        />
      </div>

      <Card className={styles.requestCard} title="Request payout">
        <p className={styles.description}>
          Withdraw available balance instantly to your connected payout method. The minimum transfer amount is $100.
        </p>
        <Button onClick={onRequestPayout} aria-label="Request new payout">
          Initiate payout
        </Button>
      </Card>

      <Card
        className={styles.tableCard}
        title="Payout history"
        subtitle="Track the status of past transfers"
        badge={<ShieldCheck size={16} aria-hidden="true" />}
      >
        <PayoutHistoryTable data={payouts} />
      </Card>
    </div>
  )
}

export default EarningsPage
export type { EarningsPageProps }

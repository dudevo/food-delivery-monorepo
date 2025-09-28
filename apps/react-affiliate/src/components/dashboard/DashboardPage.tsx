import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { ChartPlaceholder } from '@repo/ui/chart-placeholder'
import {
  ArrowRight,
  ChartLine,
  Gift,
  Link2,
  MousePointerClick,
  UsersRound,
  Wallet
} from 'lucide-react'
import DashboardCard from './DashboardCard'
import styles from './DashboardPage.module.scss'

interface DashboardPageProps {
  onCreateLink: () => void
  onViewReports: () => void
}

const summaryCards = [
  {
    title: 'Total Clicks',
    value: '34,210',
    helper: 'Across all live campaigns',
    icon: MousePointerClick,
    trend: { value: '+12.4%', isPositive: true, label: 'vs last week' }
  },
  {
    title: 'Sign-ups',
    value: '1,942',
    helper: 'Qualified customer sign-ups',
    icon: UsersRound,
    trend: { value: '+6.8%', isPositive: true, label: 'conversion' }
  },
  {
    title: 'Conversions',
    value: '1,125',
    helper: 'Orders placed via your links',
    icon: Gift,
    trend: { value: '+3.1%', isPositive: true, label: 'week over week' }
  },
  {
    title: 'Earnings',
    value: '$8,640',
    helper: 'Paid + pending commissions',
    icon: Wallet,
    trend: { value: '+18.2%', isPositive: true, label: 'month to date' }
  }
]

const activityTimeline = [
  {
    time: '09:45',
    description: 'New customer order via "Spring Feast" campaign'
  },
  {
    time: '08:10',
    description: 'Payout of $540 sent to your Stripe account'
  },
  {
    time: 'Yesterday',
    description: '3 new restaurants approved your co-marketing request'
  }
]

const DashboardPage = ({ onCreateLink, onViewReports }: DashboardPageProps) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.summaryGrid}>
        {summaryCards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <div className={styles.chartRow}>
        <Card
          title="Referral performance"
          subtitle="Track reach, conversions, and earnings trends"
          bleed={
            <ChartPlaceholder
              title="Weekly performance"
              assistiveText="Week 36"
              emptyLabel="Referral trend chart placeholder"
              description="Hook in a chart library to plot conversions & revenue"
            />
          }
        >
          <p>
            Your campaigns are steadily rising. Consider doubling down on the "Midweek Boost" promo
            where conversion rates peaked yesterday.
          </p>
        </Card>

        <Card className={styles.quickActions}>
          <div>
            <h3 className={styles.quickActionsTitle}>Quick actions</h3>
            <p className={styles.quickActionsDescription}>
              Keep momentum going with these shortcuts.
            </p>
          </div>
          <div className={styles.quickActionsList}>
            <Button onClick={onCreateLink} fullWidth aria-label="Create a new affiliate link">
              <Link2 size={18} aria-hidden="true" />
              Generate new link
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onViewReports}
              aria-label="View detailed reports"
            >
              <ChartLine size={18} aria-hidden="true" />
              View detailed reports
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => window.open('#', '_blank')}
              aria-label="Share best performing campaign"
            >
              <ArrowRight size={18} aria-hidden="true" />
              Share best-performing campaign
            </Button>
          </div>
        </Card>
      </div>

      <div className={styles.insightsGrid}>
        <Card title="Audience insights" subtitle="Top cities engaging with your content">
          <ul>
            <li>San Francisco · 32% of gross orders</li>
            <li>Seattle · Highest AOV this week</li>
            <li>Austin · +18% conversion after lunch promos</li>
          </ul>
        </Card>
        <Card title="Campaign alerts" subtitle="Optimization suggestions">
          <ul>
            <li>"Weekend Bundle" CTR dipped 4%. Refresh hero imagery.</li>
            <li>Enable SMS notifications to capture mobile visitors.</li>
            <li>2 pending co-branded assets. Approve to publish.</li>
          </ul>
        </Card>
        <Card title="Activity timeline" subtitle="Latest milestones">
          <div className={styles.timeline}>
            {activityTimeline.map((item) => (
              <div key={item.description} className={styles.timelineItem}>
                <span className={styles.timelineTimestamp}>{item.time}</span>
                <span className={styles.timelineDescription}>{item.description}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
export type { DashboardPageProps }

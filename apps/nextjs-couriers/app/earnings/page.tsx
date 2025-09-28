'use client'

import { useState } from 'react'
import Layout from '../components/layout/Layout'
import styles from './page.module.scss'

// Mock earnings data
const mockEarningsData = {
  today: {
    total: 127.50,
    orders: 8,
    hours: 6.5,
    tips: 23.50
  },
  week: {
    total: 612.75,
    orders: 42,
    hours: 31.5,
    tips: 128.25
  },
  month: {
    total: 2641.20,
    orders: 178,
    hours: 134.5,
    tips: 562.40
  }
}

const mockDeliveryHistory = [
  {
    id: 'DEL-001',
    restaurantName: "Tony's Pizza",
    orderId: 'ORD-1234',
    completedAt: '2024-01-15 18:30',
    earnings: 15.25,
    tips: 3.50,
    distance: '2.1 mi',
    duration: '18 min'
  },
  {
    id: 'DEL-002',
    restaurantName: 'Burger Palace',
    orderId: 'ORD-1235',
    completedAt: '2024-01-15 17:45',
    earnings: 12.75,
    tips: 5.00,
    distance: '1.8 mi',
    duration: '15 min'
  },
  {
    id: 'DEL-003',
    restaurantName: 'Sushi Express',
    orderId: 'ORD-1236',
    completedAt: '2024-01-15 16:20',
    earnings: 22.50,
    tips: 7.00,
    distance: '3.2 mi',
    duration: '25 min'
  },
  {
    id: 'DEL-004',
    restaurantName: 'Healthy Bowls',
    orderId: 'ORD-1237',
    completedAt: '2024-01-15 15:10',
    earnings: 18.75,
    tips: 4.25,
    distance: '2.7 mi',
    duration: '22 min'
  },
  {
    id: 'DEL-005',
    restaurantName: 'Taco Fiesta',
    orderId: 'ORD-1238',
    completedAt: '2024-01-15 14:30',
    earnings: 11.50,
    tips: 2.50,
    distance: '1.2 mi',
    duration: '12 min'
  }
]

type Period = 'today' | 'week' | 'month'

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('today')
  const [isPayoutLoading, setIsPayoutLoading] = useState(false)

  const currentData = mockEarningsData[selectedPeriod]

  const handlePayoutRequest = async () => {
    setIsPayoutLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsPayoutLoading(false)
    // In a real app, this would trigger a payout request
    alert('Payout request submitted! You should receive your earnings within 1-2 business days.')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Earnings</h1>
          <button
            className={styles.payoutButton}
            onClick={handlePayoutRequest}
            disabled={isPayoutLoading || currentData.total < 20}
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zM3 5v6h14V5H3z" />
              <path d="M1 12a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2z" />
            </svg>
            {isPayoutLoading ? 'Processing...' : 'Request Payout'}
          </button>
        </div>

        <div className={styles.summaryCards}>
          <div className={`${styles.summaryCard} ${styles['summaryCard--primary']}`}>
            <div className={styles.summaryCardHeader}>
              <svg className={styles.summaryCardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .668.35 1.299.968 1.772.365.279.796.472 1.282.545v1.191a.75.75 0 001.5 0v-1.191c.486-.073.917-.266 1.282-.545.618-.473.968-1.104.968-1.772 0-.668-.35-1.299-.968-1.772a3.836 3.836 0 00-1.282-.545V9.756c.824.153 1.5.881 1.5 1.994a.75.75 0 001.5 0c0-.829-.4-1.612-1.112-2.178-.502-.4-1.102-.647-1.72-.756V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className={styles.summaryCardValue}>${currentData.total.toFixed(2)}</h2>
            <p className={styles.summaryCardLabel}>Total Earnings</p>
            <div className={`${styles.summaryCardChange} ${styles['summaryCardChange--positive']}`}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              +12.5% from last {selectedPeriod}
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryCardHeader}>
              <svg className={styles.summaryCardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className={styles.summaryCardValue}>{currentData.orders}</h2>
            <p className={styles.summaryCardLabel}>Orders Completed</p>
            <div className={`${styles.summaryCardChange} ${styles['summaryCardChange--positive']}`}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              +{Math.round(currentData.orders * 0.08)} orders
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryCardHeader}>
              <svg className={styles.summaryCardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className={styles.summaryCardValue}>{currentData.hours}h</h2>
            <p className={styles.summaryCardLabel}>Hours Worked</p>
            <div className={`${styles.summaryCardChange} ${styles['summaryCardChange--positive']}`}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              ${(currentData.total / currentData.hours).toFixed(2)}/hour
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryCardHeader}>
              <svg className={styles.summaryCardIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25a.75.75 0 01.75-.75zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <h2 className={styles.summaryCardValue}>${currentData.tips.toFixed(2)}</h2>
            <p className={styles.summaryCardLabel}>Tips Earned</p>
            <div className={`${styles.summaryCardChange} ${styles['summaryCardChange--positive']}`}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {((currentData.tips / currentData.total) * 100).toFixed(1)}% of earnings
            </div>
          </div>
        </div>

        <div className={styles.historySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Delivery History</h2>
            <div className={styles.periodTabs}>
              <button
                className={`${styles.periodTab} ${selectedPeriod === 'today' ? styles['periodTab--active'] : ''}`}
                onClick={() => setSelectedPeriod('today')}
              >
                Today
              </button>
              <button
                className={`${styles.periodTab} ${selectedPeriod === 'week' ? styles['periodTab--active'] : ''}`}
                onClick={() => setSelectedPeriod('week')}
              >
                This Week
              </button>
              <button
                className={`${styles.periodTab} ${selectedPeriod === 'month' ? styles['periodTab--active'] : ''}`}
                onClick={() => setSelectedPeriod('month')}
              >
                This Month
              </button>
            </div>
          </div>

          <div className={styles.historyTable}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Order</th>
                  <th className={styles.tableHeaderCell}>Completed</th>
                  <th className={styles.tableHeaderCell}>Distance</th>
                  <th className={styles.tableHeaderCell}>Duration</th>
                  <th className={styles.tableHeaderCell}>Tips</th>
                  <th className={styles.tableHeaderCell}>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {mockDeliveryHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className={styles.emptyHistory}>
                        <svg className={styles.emptyHistoryIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375z" clipRule="evenodd" />
                        </svg>
                        <h3 className={styles.emptyHistoryTitle}>No Deliveries Yet</h3>
                        <p className={styles.emptyHistoryDescription}>
                          Complete your first delivery to start tracking your earnings history.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  mockDeliveryHistory.map((delivery) => (
                    <tr key={delivery.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <div className={styles.orderInfo}>
                          <div className={styles.orderName}>{delivery.restaurantName}</div>
                          <div className={styles.orderId}>#{delivery.orderId}</div>
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        {formatDate(delivery.completedAt)}
                      </td>
                      <td className={styles.tableCell}>
                        {delivery.distance}
                      </td>
                      <td className={styles.tableCell}>
                        {delivery.duration}
                      </td>
                      <td className={styles.tableCell}>
                        ${delivery.tips.toFixed(2)}
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.earnings}>
                          ${delivery.earnings.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
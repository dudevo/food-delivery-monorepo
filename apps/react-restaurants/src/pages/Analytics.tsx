import React, { useState } from 'react';
import { MetricsCard } from '../components/analytics/MetricsCard';
import { Chart } from '../components/analytics/Chart';
import styles from './Analytics.module.scss';

// Mock data for analytics
const mockData = {
  metrics: {
    revenue: 12847.50,
    orders: 342,
    avgOrderValue: 37.58,
    customerSatisfaction: 4.6,
    deliveryTime: 28,
    topMenuItem: 'Margherita Pizza'
  },
  revenueData: [
    { label: 'Mon', value: 1850 },
    { label: 'Tue', value: 2200 },
    { label: 'Wed', value: 1900 },
    { label: 'Thu', value: 2400 },
    { label: 'Fri', value: 2800 },
    { label: 'Sat', value: 3200 },
    { label: 'Sun', value: 2650 }
  ],
  orderData: [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 52 },
    { label: 'Wed', value: 48 },
    { label: 'Thu', value: 61 },
    { label: 'Fri', value: 73 },
    { label: 'Sat', value: 89 },
    { label: 'Sun', value: 67 }
  ],
  menuPerformance: [
    { label: 'Margherita Pizza', value: 89, color: 'var(--primary)' },
    { label: 'Caesar Salad', value: 67, color: 'var(--secondary)' },
    { label: 'Grilled Salmon', value: 45, color: 'var(--success)' },
    { label: 'Chocolate Brownie', value: 78, color: 'var(--warning)' },
    { label: 'Craft Beer', value: 56, color: 'var(--info)' }
  ],
  customerData: [
    { label: 'New', value: 35, color: 'var(--primary)' },
    { label: 'Returning', value: 65, color: 'var(--secondary)' }
  ],
  topItems: [
    {
      name: 'Margherita Pizza',
      orders: 89,
      revenue: 1511.11,
      trend: { value: 12.5, direction: 'up' as const }
    },
    {
      name: 'Caesar Salad',
      orders: 67,
      revenue: 870.33,
      trend: { value: 8.2, direction: 'up' as const }
    },
    {
      name: 'Grilled Salmon',
      orders: 45,
      revenue: 1124.55,
      trend: { value: -3.1, direction: 'down' as const }
    },
    {
      name: 'Chocolate Brownie',
      orders: 78,
      revenue: 701.22,
      trend: { value: 15.7, direction: 'up' as const }
    },
    {
      name: 'Craft Beer Selection',
      orders: 156,
      revenue: 1090.44,
      trend: { value: 22.3, direction: 'up' as const }
    }
  ]
};

export const Analytics: React.FC = () => {
  const [dateRange] = useState('Last 7 days');
  const [performanceFilter, setPerformanceFilter] = useState('orders');

  const handleExportReport = () => {
    // In a real app, this would generate and download a comprehensive report
    alert('Analytics report exported! In a production app, this would download a PDF or Excel file.');
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return (
          <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.analyticsPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Analytics & Insights</h1>
          <p className={styles.pageSubtitle}>
            Track your restaurant's performance and make data-driven decisions
          </p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.dateRangeSelector}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {dateRange}
          </div>
          <button className={styles.exportButton} onClick={handleExportReport}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <MetricsCard
          title="Total Revenue"
          value={`$${mockData.metrics.revenue.toLocaleString()}`}
          icon="💰"
          variant="primary"
          trend={{
            value: 15.2,
            label: 'vs last week',
            direction: 'up'
          }}
          footer={{
            text: 'Target: $15,000',
            action: {
              label: 'View Details',
              onClick: () => {}
            }
          }}
        />

        <MetricsCard
          title="Total Orders"
          value={mockData.metrics.orders}
          icon="📋"
          variant="success"
          trend={{
            value: 8.7,
            label: 'vs last week',
            direction: 'up'
          }}
          progress={{
            value: mockData.metrics.orders,
            max: 500,
            label: 'Weekly Goal'
          }}
        />

        <MetricsCard
          title="Avg Order Value"
          value={`$${mockData.metrics.avgOrderValue.toFixed(2)}`}
          icon="💳"
          variant="info"
          trend={{
            value: 3.2,
            label: 'vs last week',
            direction: 'up'
          }}
          subtext="Higher AOV indicates better upselling"
        />

        <MetricsCard
          title="Customer Rating"
          value={mockData.metrics.customerSatisfaction.toFixed(1)}
          icon="⭐"
          variant="warning"
          trend={{
            value: 0.2,
            label: 'vs last week',
            direction: 'up'
          }}
          subtext="Based on 89 reviews this week"
        />
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <h2 className={styles.sectionTitle}>
          <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          Performance Analytics
        </h2>

        <div className={`${styles.chartsGrid} ${styles['chartsGrid--two-column']}`}>
          <Chart
            title="Revenue Trend"
            type="line"
            data={mockData.revenueData}
            height={300}
            showExport={true}
            showStats={true}
            stats={[
              { label: 'Peak Day', value: 'Saturday' },
              { label: 'Growth', value: '+15.2%' },
              { label: 'Avg Daily', value: '$2,450' }
            ]}
          />

          <Chart
            title="Customer Distribution"
            type="pie"
            data={mockData.customerData}
            height={300}
            showLegend={true}
            stats={[
              { label: 'New Customers', value: '35%' },
              { label: 'Returning', value: '65%' },
              { label: 'Retention Rate', value: '68%' }
            ]}
          />
        </div>

        <div className={`${styles.chartsGrid} ${styles['chartsGrid--single-column']}`}>
          <Chart
            title="Daily Orders"
            type="bar"
            data={mockData.orderData}
            height={250}
            showExport={true}
            showStats={true}
            stats={[
              { label: 'Total Orders', value: mockData.metrics.orders },
              { label: 'Avg per Day', value: '49' },
              { label: 'Peak Hour', value: '7-8 PM' },
              { label: 'Completion Rate', value: '94%' }
            ]}
          />
        </div>
      </div>

      {/* Menu Performance Table */}
      <div className={styles.performanceSection}>
        <div className={styles.performanceHeader}>
          <h3 className={styles.performanceTitle}>Menu Item Performance</h3>
          <div className={styles.performanceFilters}>
            <select
              className={styles.filterSelect}
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
            >
              <option value="orders">Sort by Orders</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="trend">Sort by Trend</option>
            </select>
          </div>
        </div>

        <table className={styles.performanceTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Menu Item</th>
              <th className={styles.tableHeaderCell}>Orders</th>
              <th className={styles.tableHeaderCell}>Revenue</th>
              <th className={styles.tableHeaderCell}>Avg Price</th>
              <th className={styles.tableHeaderCell}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {mockData.topItems.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <span className={styles.itemName}>{item.name}</span>
                </td>
                <td className={styles.tableCell}>{item.orders}</td>
                <td className={styles.tableCell}>${item.revenue.toFixed(2)}</td>
                <td className={styles.tableCell}>${(item.revenue / item.orders).toFixed(2)}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.trendIndicator} ${styles[`trendIndicator--${item.trend.direction}`]}`}>
                    {getTrendIcon(item.trend.direction)}
                    {item.trend.direction === 'up' ? '+' : '-'}
                    {Math.abs(item.trend.value)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights Section */}
      <div className={styles.insightsSection}>
        <h2 className={styles.sectionTitle}>
          <svg className={styles.sectionIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
          Key Insights & Recommendations
        </h2>

        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg className={styles.insightIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className={styles.insightTitle}>Peak Performance</h4>
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                Weekend revenue is 40% higher than weekdays. Consider expanding weekend hours or adding special weekend menus.
              </p>
              <div className={styles.insightMetrics}>
                <span className={styles.insightMetric}>
                  Weekend avg: <span className={styles.metricValue}>$2,925</span>
                </span>
                <span className={styles.insightMetric}>
                  Weekday avg: <span className={styles.metricValue}>$2,089</span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg className={styles.insightIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className={styles.insightTitle}>Menu Optimization</h4>
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                Your top 3 menu items generate 45% of total revenue. Consider promoting similar dishes or creating combo deals.
              </p>
              <div className={styles.insightMetrics}>
                <span className={styles.insightMetric}>
                  Top 3 revenue: <span className={styles.metricValue}>45%</span>
                </span>
                <span className={styles.insightMetric}>
                  Avg rating: <span className={styles.metricValue}>4.7/5</span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <svg className={styles.insightIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h4 className={styles.insightTitle}>Customer Retention</h4>
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                65% of your orders come from returning customers. Your retention rate is above industry average of 55%.
              </p>
              <div className={styles.insightMetrics}>
                <span className={styles.insightMetric}>
                  Retention rate: <span className={styles.metricValue}>65%</span>
                </span>
                <span className={styles.insightMetric}>
                  Industry avg: <span className={styles.metricValue}>55%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
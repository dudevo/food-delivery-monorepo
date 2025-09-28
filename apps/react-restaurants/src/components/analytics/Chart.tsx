import React, { useState } from 'react';
import styles from './Chart.module.scss';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  height?: number;
  showLegend?: boolean;
  showStats?: boolean;
  showExport?: boolean;
  periods?: string[];
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export const Chart: React.FC<ChartProps> = ({
  title,
  type,
  data,
  height = 200,
  showLegend = true,
  showStats = false,
  showExport = false,
  periods = ['7D', '30D', '90D', '1Y'],
  defaultPeriod = '30D',
  onPeriodChange,
  stats
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    onPeriodChange?.(period);
  };

  const handleExport = () => {
    // In a real app, this would export chart data
    const csvContent = data.map(item => `${item.label},${item.value}`).join('\n');
    const blob = new Blob([`Label,Value\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getChartDescription = () => {
    switch (type) {
      case 'line':
        return 'Line chart showing trends over time';
      case 'bar':
        return 'Bar chart comparing different categories';
      case 'pie':
        return 'Pie chart showing distribution percentages';
      case 'area':
        return 'Area chart displaying cumulative data';
      default:
        return 'Chart visualization';
    }
  };

  const getChartIcon = () => {
    switch (type) {
      case 'line':
        return '📈';
      case 'bar':
        return '📊';
      case 'pie':
        return '🍰';
      case 'area':
        return '📉';
      default:
        return '📊';
    }
  };

  const defaultColors = [
    'var(--primary)',
    'var(--secondary)',
    'var(--success)',
    'var(--warning)',
    'var(--info)',
    'var(--error)'
  ];

  const containerClassName = [
    styles.chartContainer,
    styles[`chartContainer--${type}`]
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>{title}</h3>

        <div className={styles.chartActions}>
          <div className={styles.periodSelector}>
            {periods.map(period => (
              <button
                key={period}
                className={`${styles.periodButton} ${selectedPeriod === period ? styles['periodButton--active'] : ''}`}
                onClick={() => handlePeriodChange(period)}
              >
                {period}
              </button>
            ))}
          </div>

          {showExport && (
            <button className={styles.exportButton} onClick={handleExport}>
              <svg className={styles.exportIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
          )}
        </div>
      </div>

      <div className={styles.chartContent} style={{ minHeight: height }}>
        <div className={styles.chartPlaceholder}>
          <div className={styles.placeholderIcon}>
            {getChartIcon()}
          </div>
          <h4 className={styles.placeholderTitle}>
            {title} - {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </h4>
          <p className={styles.placeholderDescription}>
            {getChartDescription()}. In a production app, this would display an interactive chart using a library like Chart.js, D3.js, or Recharts.
          </p>
        </div>
      </div>

      {showLegend && data.length > 0 && (
        <div className={styles.chartLegend}>
          {data.slice(0, 6).map((item, index) => (
            <div key={item.label} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{
                  backgroundColor: item.color || defaultColors[index % defaultColors.length]
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {showStats && stats && stats.length > 0 && (
        <div className={styles.chartStats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
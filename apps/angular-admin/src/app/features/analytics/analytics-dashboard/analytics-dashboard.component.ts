import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  template: `
    <div class="analytics-container">
      <div class="header">
        <h1>Analytics Dashboard</h1>
        <mat-form-field appearance="outline">
          <mat-label>Time Period</mat-label>
          <mat-select value="7days">
            <mat-option value="24hours">Last 24 Hours</mat-option>
            <mat-option value="7days">Last 7 Days</mat-option>
            <mat-option value="30days">Last 30 Days</mat-option>
            <mat-option value="90days">Last 90 Days</mat-option>
            <mat-option value="year">Last Year</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="metrics-grid">
        @for (metric of metrics(); track metric.title) {
          <mat-card class="metric-card" [style.border-left-color]="metric.color">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon [style.color]="metric.color">{{ metric.icon }}</mat-icon>
                <span class="metric-title">{{ metric.title }}</span>
              </div>
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-change" [class.positive]="metric.change > 0" [class.negative]="metric.change < 0">
                <mat-icon>{{ metric.change > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                <span>{{ metric.change > 0 ? '+' : '' }}{{ metric.change }}% vs last period</span>
              </div>
            </mat-card-content>
          </mat-card>
        }
      </div>

      <div class="charts-grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Revenue Over Time</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              <div class="bar-chart">
                @for (item of revenueData(); track item.label) {
                  <div class="bar-container">
                    <div class="bar" [style.height.%]="(item.value / maxRevenue()) * 100"></div>
                    <span class="bar-label">{{ item.label }}</span>
                  </div>
                }
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Orders by Status</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              <div class="status-list">
                @for (status of ordersByStatus(); track status.label) {
                  <div class="status-item">
                    <span class="status-label">{{ status.label }}</span>
                    <div class="status-bar-container">
                      <div class="status-bar" [style.width.%]="(status.value / totalOrders()) * 100"></div>
                    </div>
                    <span class="status-value">{{ status.value }}</span>
                  </div>
                }
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Top Restaurants</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              <div class="restaurant-list">
                @for (restaurant of topRestaurants(); track restaurant.label) {
                  <div class="restaurant-item">
                    <div class="restaurant-info">
                      <span class="restaurant-rank">{{ $index + 1 }}</span>
                      <span class="restaurant-name">{{ restaurant.label }}</span>
                    </div>
                    <span class="restaurant-value">\${{ restaurant.value.toLocaleString() }}</span>
                  </div>
                }
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Customer Growth</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              <div class="line-chart">
                @for (item of customerGrowth(); track item.label) {
                  <div class="line-point-container">
                    <div class="line-point" [style.bottom.%]="(item.value / maxCustomers()) * 80">
                      <span class="point-value">{{ item.value }}</span>
                    </div>
                    <span class="point-label">{{ item.label }}</span>
                  </div>
                }
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .metric-card {
      border-left: 4px solid;
    }

    .metric-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .metric-title {
      font-size: 14px;
      color: #666;
    }

    .metric-value {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .metric-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
    }

    .metric-change.positive {
      color: #4caf50;
    }

    .metric-change.negative {
      color: #f44336;
    }

    .metric-change mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .chart-card {
      min-height: 300px;
    }

    .chart-placeholder {
      padding: 16px 0;
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 200px;
      gap: 8px;
    }

    .bar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      height: 100%;
    }

    .bar {
      width: 100%;
      background: linear-gradient(to top, #1976d2, #42a5f5);
      border-radius: 4px 4px 0 0;
      min-height: 20px;
      margin-bottom: 8px;
    }

    .bar-label {
      font-size: 12px;
      color: #666;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .status-item {
      display: grid;
      grid-template-columns: 100px 1fr 60px;
      align-items: center;
      gap: 12px;
    }

    .status-label {
      font-size: 14px;
      color: #666;
    }

    .status-bar-container {
      background: #e0e0e0;
      height: 24px;
      border-radius: 12px;
      overflow: hidden;
    }

    .status-bar {
      height: 100%;
      background: linear-gradient(to right, #1976d2, #42a5f5);
      border-radius: 12px;
    }

    .status-value {
      font-weight: 500;
      text-align: right;
    }

    .restaurant-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .restaurant-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .restaurant-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .restaurant-rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #1976d2;
      color: white;
      border-radius: 50%;
      font-weight: 600;
    }

    .restaurant-name {
      font-weight: 500;
    }

    .restaurant-value {
      font-weight: 600;
      color: #1976d2;
    }

    .line-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 200px;
      position: relative;
    }

    .line-point-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      height: 100%;
      position: relative;
    }

    .line-point {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #1976d2;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .point-value {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }

    .point-label {
      position: absolute;
      bottom: 0;
      font-size: 12px;
      color: #666;
    }
  `]
})
export class AnalyticsDashboardComponent {
  metrics = signal<MetricCard[]>([
    { title: 'Total Revenue', value: '$124,580', change: 12.5, icon: 'attach_money', color: '#4caf50' },
    { title: 'Total Orders', value: '2,847', change: 8.3, icon: 'shopping_cart', color: '#1976d2' },
    { title: 'Active Users', value: '1,234', change: -2.1, icon: 'people', color: '#ff9800' },
    { title: 'Avg Order Value', value: '$43.78', change: 5.7, icon: 'trending_up', color: '#9c27b0' }
  ]);

  revenueData = signal<ChartData[]>([
    { label: 'Mon', value: 12500 },
    { label: 'Tue', value: 15800 },
    { label: 'Wed', value: 18200 },
    { label: 'Thu', value: 21500 },
    { label: 'Fri', value: 24800 },
    { label: 'Sat', value: 22300 },
    { label: 'Sun', value: 19400 }
  ]);

  ordersByStatus = signal<ChartData[]>([
    { label: 'Delivered', value: 1847 },
    { label: 'In Transit', value: 345 },
    { label: 'Preparing', value: 234 },
    { label: 'Confirmed', value: 156 },
    { label: 'Pending', value: 89 },
    { label: 'Cancelled', value: 176 }
  ]);

  topRestaurants = signal<ChartData[]>([
    { label: 'Pizza Palace', value: 28400 },
    { label: 'Burger House', value: 24800 },
    { label: 'Sushi World', value: 21200 },
    { label: 'Taco Haven', value: 18900 },
    { label: 'Pasta Paradise', value: 16500 }
  ]);

  customerGrowth = signal<ChartData[]>([
    { label: 'Jan', value: 450 },
    { label: 'Feb', value: 580 },
    { label: 'Mar', value: 720 },
    { label: 'Apr', value: 890 },
    { label: 'May', value: 1050 },
    { label: 'Jun', value: 1234 }
  ]);

  maxRevenue = signal(Math.max(...this.revenueData().map(d => d.value)));
  totalOrders = signal(this.ordersByStatus().reduce((sum, s) => sum + s.value, 0));
  maxCustomers = signal(Math.max(...this.customerGrowth().map(d => d.value)));
}

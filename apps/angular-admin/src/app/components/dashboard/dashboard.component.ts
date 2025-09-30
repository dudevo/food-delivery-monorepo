import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminStore } from '../../store/admin.store';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Welcome back, {{ store.userDisplayName() }}!</h1>
      <p class="dashboard-summary">{{ store.dashboardSummary() }}</p>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="primary">shopping_cart</mat-icon>
              <div class="stat-info">
                <h2>{{ store.dashboardStats().totalOrders }}</h2>
                <p>Total Orders</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="accent">people</mat-icon>
              <div class="stat-info">
                <h2>{{ store.dashboardStats().totalUsers }}</h2>
                <p>Total Users</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="warn">store</mat-icon>
              <div class="stat-info">
                <h2>{{ store.dashboardStats().totalRestaurants }}</h2>
                <p>Restaurants</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon style="color: green;">attach_money</mat-icon>
              <div class="stat-info">
                <h2>\${{ store.dashboardStats().totalRevenue | number }}</h2>
                <p>Total Revenue</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="dashboard-actions">
        <button mat-raised-button color="primary" (click)="store.incrementOrderCount()">
          <mat-icon>add</mat-icon>
          Simulate New Order
        </button>

        <button mat-raised-button color="accent" (click)="store.loadInitialData()">
          <mat-icon>refresh</mat-icon>
          Refresh Data
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-summary {
      font-size: 16px;
      color: #666;
      margin-bottom: 32px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      transition: transform 0.2s ease-in-out;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-content mat-icon {
      font-size: 36px;
      width: 36px;
      height: 36px;
    }

    .stat-info h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }

    .stat-info p {
      margin: 4px 0 0 0;
      color: #666;
      font-size: 14px;
    }

    .dashboard-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
  `]
})
export class DashboardComponent {
  protected readonly store = inject(AdminStore);
}
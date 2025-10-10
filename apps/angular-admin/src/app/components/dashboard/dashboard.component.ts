import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div>
          <h1>Welcome back, {{ displayName() }}!</h1>
          <p class="dashboard-summary">{{ dashboardSummary() }}</p>
        </div>
        <div class="user-menu">
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item disabled>
              <mat-icon>person</mat-icon>
              <span>{{ authService.currentUser()?.email }}</span>
            </button>
            <button mat-menu-item disabled>
              <mat-icon>admin_panel_settings</mat-icon>
              <span>{{ authService.currentUser()?.role }}</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="primary">shopping_cart</mat-icon>
              <div class="stat-info">
                <h2>1,234</h2>
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
                <h2>5,678</h2>
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
                <h2>123</h2>
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
                <h2>$45,678</h2>
                <p>Total Revenue</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="dashboard-actions">
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Simulate New Order
        </button>

        <button mat-raised-button color="accent">
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

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
    }

    .dashboard-summary {
      font-size: 16px;
      color: #666;
      margin-bottom: 32px;
    }

    .user-menu {
      display: flex;
      align-items: center;
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
  protected readonly authService = inject(AuthService);

  displayName(): string {
    const user = this.authService.currentUser();
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || user?.name || 'Admin';
  }

  dashboardSummary(): string {
    const role = this.authService.currentUser()?.role;
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `Here's what's happening with your platform as of ${time}`;
  }

  logout(): void {
    this.authService.logout();
  }
}
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserService } from '../../../services/user.service';
import { User, UserStatus } from '../../../types/user.types';

@Component({
  selector: 'app-user-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="user-detail-container">
      @if (userService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading user details...</p>
        </div>
      } @else if (user()) {
        <div class="header">
          <button mat-button routerLink="/users" color="primary">
            <mat-icon>arrow_back</mat-icon>
            Back to Users
          </button>

          <div class="header-actions">
            <button mat-raised-button color="primary" [routerLink]="['/users', user()!.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit User
            </button>

            <button mat-button [matMenuTriggerFor]="actionsMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #actionsMenu="matMenu">
              @if (user()!.status === 'active') {
                <button mat-menu-item (click)="changeUserStatus('suspended')">
                  <mat-icon>block</mat-icon>
                  <span>Suspend User</span>
                </button>
              } @else if (user()!.status === 'suspended') {
                <button mat-menu-item (click)="changeUserStatus('active')">
                  <mat-icon>check_circle</mat-icon>
                  <span>Activate User</span>
                </button>
              }
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="deleteUser()" class="danger-item">
                <mat-icon>delete</mat-icon>
                <span>Delete User</span>
              </button>
            </mat-menu>
          </div>
        </div>

        <div class="content-grid">
          <!-- User Profile Card -->
          <mat-card class="profile-card">
            <mat-card-content>
              <div class="profile-header">
                @if (user()!.avatar) {
                  <img [src]="user()!.avatar" [alt]="user()!.name" class="profile-avatar">
                } @else {
                  <div class="avatar-placeholder">
                    <mat-icon>person</mat-icon>
                  </div>
                }

                <div class="profile-info">
                  <h1>{{ user()!.name }}</h1>
                  <p class="email">{{ user()!.email }}</p>
                  <div class="badges">
                    <mat-chip [color]="getRoleColor(user()!.role)">
                      {{ userService.getRoleDisplayName(user()!.role) }}
                    </mat-chip>
                    <mat-chip [color]="userService.getStatusColor(user()!.status)">
                      {{ userService.getStatusDisplayName(user()!.status) }}
                    </mat-chip>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Contact Information -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>contact_phone</mat-icon>
                Contact Information
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-grid">
                <div class="info-item">
                  <label>Email</label>
                  <span>{{ user()!.email }}</span>
                </div>
                <div class="info-item">
                  <label>Phone</label>
                  <span>{{ user()!.phone || 'Not provided' }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Address Information -->
          @if (user()!.address) {
            <mat-card>
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>location_on</mat-icon>
                  Address
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="address-info">
                  <p>{{ user()!.address!.street }}</p>
                  <p>{{ user()!.address!.city }}, {{ user()!.address!.state }} {{ user()!.address!.zipCode }}</p>
                  <p>{{ user()!.address!.country }}</p>
                </div>
              </mat-card-content>
            </mat-card>
          }

          <!-- Account Information -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>account_circle</mat-icon>
                Account Information
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-grid">
                <div class="info-item">
                  <label>User ID</label>
                  <span class="monospace">{{ user()!.id }}</span>
                </div>
                <div class="info-item">
                  <label>Role</label>
                  <span>{{ userService.getRoleDisplayName(user()!.role) }}</span>
                </div>
                <div class="info-item">
                  <label>Status</label>
                  <span>{{ userService.getStatusDisplayName(user()!.status) }}</span>
                </div>
                <div class="info-item">
                  <label>Created</label>
                  <span>{{ user()!.createdAt | date:'medium' }}</span>
                </div>
                <div class="info-item">
                  <label>Last Updated</label>
                  <span>{{ user()!.updatedAt | date:'medium' }}</span>
                </div>
                <div class="info-item">
                  <label>Last Login</label>
                  <span>
                    @if (user()!.lastLoginAt) {
                      {{ user()!.lastLoginAt | date:'medium' }}
                    } @else {
                      <span class="no-login">Never logged in</span>
                    }
                  </span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Activity Summary -->
          <mat-card class="activity-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>analytics</mat-icon>
                Activity Summary
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="activity-stats">
                <div class="stat-item">
                  <mat-icon color="primary">shopping_cart</mat-icon>
                  <div class="stat-info">
                    <span class="stat-number">{{ getActivityStats().totalOrders }}</span>
                    <span class="stat-label">Total Orders</span>
                  </div>
                </div>
                <div class="stat-item">
                  <mat-icon color="accent">star</mat-icon>
                  <div class="stat-info">
                    <span class="stat-number">{{ getActivityStats().averageRating }}/5</span>
                    <span class="stat-label">Average Rating</span>
                  </div>
                </div>
                <div class="stat-item">
                  <mat-icon color="warn">attach_money</mat-icon>
                  <div class="stat-info">
                    <span class="stat-number">\${{ getActivityStats().totalSpent }}</span>
                    <span class="stat-label">Total Spent</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      } @else {
        <div class="error-container">
          <mat-icon class="error-icon">error</mat-icon>
          <h2>User Not Found</h2>
          <p>The requested user could not be found.</p>
          <button mat-raised-button color="primary" routerLink="/users">
            Back to Users
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-detail-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      gap: 16px;
    }

    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .profile-card {
      grid-column: 1 / -1;
    }

    .profile-header {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-placeholder mat-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
    }

    .profile-info h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
    }

    .email {
      margin: 0 0 16px 0;
      color: #666;
      font-size: 16px;
    }

    .badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-weight: 500;
      color: #666;
      font-size: 14px;
    }

    .info-item span {
      font-size: 16px;
    }

    .monospace {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .address-info p {
      margin: 4px 0;
    }

    .no-login {
      color: #999;
      font-style: italic;
    }

    .activity-card {
      grid-column: 1 / -1;
    }

    .activity-stats {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 24px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stat-item mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 24px;
      font-weight: 600;
    }

    .stat-label {
      color: #666;
      font-size: 14px;
    }

    .danger-item {
      color: #f44336;
    }

    .danger-item mat-icon {
      color: #f44336;
    }

    mat-card-header mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class UserDetailComponent implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected user = signal<User | null>(null);

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    }
  }

  private async loadUser(userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      this.user.set(user || null);
    } catch (error) {
      this.snackBar.open('Failed to load user details', 'Close', { duration: 3000 });
    }
  }

  protected getRoleColor(role: string): string {
    const colorMap: Record<string, string> = {
      customer: 'primary',
      restaurant_owner: 'accent',
      courier: 'warn',
      admin: '',
      super_admin: ''
    };
    return colorMap[role] || '';
  }

  protected getActivityStats() {
    return {
      totalOrders: Math.floor(Math.random() * 100) + 1,
      averageRating: (Math.random() * 2 + 3).toFixed(1),
      totalSpent: (Math.random() * 5000 + 100).toFixed(0)
    };
  }

  protected async changeUserStatus(status: UserStatus) {
    const currentUser = this.user();
    if (!currentUser) return;

    try {
      await this.userService.changeUserStatus(currentUser.id, status);
      this.snackBar.open('User status updated successfully', 'Close', { duration: 3000 });
      this.loadUser(currentUser.id);
    } catch (error) {
      this.snackBar.open('Failed to update user status', 'Close', { duration: 3000 });
    }
  }

  protected async deleteUser() {
    const currentUser = this.user();
    if (!currentUser) return;

    const confirmed = confirm(`Are you sure you want to delete ${currentUser.name}? This action cannot be undone.`);

    if (confirmed) {
      try {
        await this.userService.deleteUser(currentUser.id);
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
      } catch (error) {
        this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
      }
    }
  }
}
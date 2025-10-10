import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { UserService } from '../../../services/user.service';
import { User, UserFilters, UserRole, UserStatus } from '../../../types/user.types';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule
  ],
  template: `
    <div class="user-list-container">
      <div class="header">
        <h1>User Management</h1>
        <button mat-raised-button color="primary" routerLink="/users/create">
          <mat-icon>add</mat-icon>
          Add New User
        </button>
      </div>

      <!-- Filters -->
      <mat-card class="filters-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field>
              <mat-label>Search</mat-label>
              <input matInput
                     [(ngModel)]="searchQuery"
                     (input)="onSearchChange()"
                     placeholder="Search by name, email or phone">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Role</mat-label>
              <mat-select [(ngModel)]="selectedRole" (selectionChange)="onFilterChange()">
                <mat-option value="">All Roles</mat-option>
                <mat-option value="customer">Customer</mat-option>
                <mat-option value="restaurant_owner">Restaurant Owner</mat-option>
                <mat-option value="courier">Courier</mat-option>
                <mat-option value="admin">Admin</mat-option>
                <mat-option value="super_admin">Super Admin</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus" (selectionChange)="onFilterChange()">
                <mat-option value="">All Statuses</mat-option>
                <mat-option value="active">Active</mat-option>
                <mat-option value="inactive">Inactive</mat-option>
                <mat-option value="suspended">Suspended</mat-option>
                <mat-option value="pending_verification">Pending Verification</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-button (click)="clearFilters()" color="accent">
              <mat-icon>clear</mat-icon>
              Clear Filters
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Loading State -->
      @if (userService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading users...</p>
        </div>
      } @else {
        <!-- Users Table -->
        <mat-card>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="users()" class="users-table">
                <!-- Avatar Column -->
                <ng-container matColumnDef="avatar">
                  <th mat-header-cell *matHeaderCellDef>Avatar</th>
                  <td mat-cell *matCellDef="let user">
                    @if (user.avatar) {
                      <img [src]="user.avatar" [alt]="user.name" class="user-avatar">
                    } @else {
                      <div class="avatar-placeholder">
                        <mat-icon>person</mat-icon>
                      </div>
                    }
                  </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Name</th>
                  <td mat-cell *matCellDef="let user">
                    <div class="user-info">
                      <span class="user-name">{{ user.name }}</span>
                      <span class="user-email">{{ user.email }}</span>
                    </div>
                  </td>
                </ng-container>

                <!-- Phone Column -->
                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef>Phone</th>
                  <td mat-cell *matCellDef="let user">
                    {{ user.phone || 'N/A' }}
                  </td>
                </ng-container>

                <!-- Role Column -->
                <ng-container matColumnDef="role">
                  <th mat-header-cell *matHeaderCellDef>Role</th>
                  <td mat-cell *matCellDef="let user">
                    <mat-chip [color]="getRoleColor(user.role)">
                      {{ userService.getRoleDisplayName(user.role) }}
                    </mat-chip>
                  </td>
                </ng-container>

                <!-- Status Column -->
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let user">
                    <mat-chip [color]="userService.getStatusColor(user.status)">
                      {{ userService.getStatusDisplayName(user.status) }}
                    </mat-chip>
                  </td>
                </ng-container>

                <!-- Last Login Column -->
                <ng-container matColumnDef="lastLogin">
                  <th mat-header-cell *matHeaderCellDef>Last Login</th>
                  <td mat-cell *matCellDef="let user">
                    @if (user.lastLoginAt) {
                      {{ user.lastLoginAt | date:'medium' }}
                    } @else {
                      <span class="no-login">Never</span>
                    }
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let user">
                    <button mat-icon-button [matMenuTriggerFor]="userMenu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #userMenu="matMenu">
                      <button mat-menu-item [routerLink]="['/users', user.id]">
                        <mat-icon>visibility</mat-icon>
                        <span>View Details</span>
                      </button>
                      <button mat-menu-item [routerLink]="['/users', user.id, 'edit']">
                        <mat-icon>edit</mat-icon>
                        <span>Edit User</span>
                      </button>
                      @if (user.status === 'active') {
                        <button mat-menu-item (click)="changeUserStatus(user.id, 'suspended')">
                          <mat-icon>block</mat-icon>
                          <span>Suspend User</span>
                        </button>
                      } @else if (user.status === 'suspended') {
                        <button mat-menu-item (click)="changeUserStatus(user.id, 'active')">
                          <mat-icon>check_circle</mat-icon>
                          <span>Activate User</span>
                        </button>
                      }
                      <mat-divider></mat-divider>
                      <button mat-menu-item (click)="deleteUser(user.id)" class="danger-item">
                        <mat-icon>delete</mat-icon>
                        <span>Delete User</span>
                      </button>
                    </mat-menu>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                    class="user-row"
                    [routerLink]="['/users', row.id]"></tr>
              </table>
            </div>

            <!-- Paginator -->
            <mat-paginator
              [length]="totalUsers()"
              [pageSize]="pageSize()"
              [pageSizeOptions]="[5, 10, 25, 50]"
              [pageIndex]="currentPage() - 1"
              (page)="onPageChange($event)"
              showFirstLastButtons>
            </mat-paginator>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .user-list-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
    }

    .filters-card {
      margin-bottom: 24px;
    }

    .filters {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .filters mat-form-field {
      min-width: 200px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      gap: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
    }

    .user-email {
      color: #666;
      font-size: 12px;
    }

    .no-login {
      color: #999;
      font-style: italic;
    }

    .user-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .user-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .danger-item {
      color: #f44336;
    }

    .danger-item mat-icon {
      color: #f44336;
    }
  `]
})
export class UserListComponent implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected users = signal<User[]>([]);
  protected totalUsers = signal(0);
  protected currentPage = signal(1);
  protected pageSize = signal(10);

  protected searchQuery = '';
  protected selectedRole: UserRole | '' = '';
  protected selectedStatus: UserStatus | '' = '';

  protected displayedColumns = ['avatar', 'name', 'phone', 'role', 'status', 'lastLogin', 'actions'];

  private searchTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    this.loadUsers();
  }

  private async loadUsers() {
    const filters: UserFilters = {
      page: this.currentPage(),
      limit: this.pageSize()
    };

    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.selectedRole) filters.role = this.selectedRole;
    if (this.selectedStatus) filters.status = this.selectedStatus;

    try {
      const usersObservable = this.userService.getUsers(filters);
      const response = await firstValueFrom(usersObservable);

      this.users.set(response.users);
      this.totalUsers.set(response.total);
    } catch (error) {
      this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
    }
  }

  protected onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.currentPage.set(1);
      this.loadUsers();
    }, 500);
  }

  protected onFilterChange() {
    this.currentPage.set(1);
    this.loadUsers();
  }

  protected clearFilters() {
    this.searchQuery = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.currentPage.set(1);
    this.loadUsers();
  }

  protected onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadUsers();
  }

  protected getRoleColor(role: UserRole): string {
    const colorMap: Record<UserRole, string> = {
      customer: 'primary',
      restaurant_owner: 'accent',
      courier: 'warn',
      admin: 'primary',
      super_admin: 'primary',
      AFFILIATE: 'accent',
      RESTAURANT_ADMIN: 'accent',
      ADMIN: 'primary',
      CUSTOMER: 'primary',
      COURIER: 'warn'
    };
    return colorMap[role] || 'primary';
  }

  protected async changeUserStatus(userId: string, status: UserStatus) {
    try {
      const statusObservable = this.userService.changeUserStatus(userId, status);
      await firstValueFrom(statusObservable);
      this.snackBar.open('User status updated successfully', 'Close', { duration: 3000 });
      this.loadUsers();
    } catch (error) {
      this.snackBar.open('Failed to update user status', 'Close', { duration: 3000 });
    }
  }

  protected async deleteUser(userId: string) {
    const confirmed = confirm('Are you sure you want to delete this user? This action cannot be undone.');

    if (confirmed) {
      try {
        await this.userService.deleteUser(userId);
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      } catch (error) {
        this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
      }
    }
  }
}
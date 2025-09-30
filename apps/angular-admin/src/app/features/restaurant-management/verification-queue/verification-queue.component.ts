import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { RestaurantService } from '../../../services/restaurant.service';
import {
  Restaurant,
  RestaurantFilters,
  VerificationStatus
} from '../../../types/restaurant.types';

@Component({
  selector: 'app-verification-queue',
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
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  template: `
    <div class="verification-queue-container">
      <div class="header">
        <div>
          <h1>Verification Queue</h1>
          <p class="subtitle">Review and process restaurant onboarding requests.</p>
        </div>
        <button mat-button routerLink="/restaurants" color="primary">
          <mat-icon>arrow_back</mat-icon>
          Back to Restaurants
        </button>
      </div>

      <mat-card class="filters-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field>
              <mat-label>Search</mat-label>
              <input matInput
                     [(ngModel)]="searchQuery"
                     (input)="onSearchChange()"
                     placeholder="Search by restaurant, owner, or email">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Document Filter</mat-label>
              <mat-select [(ngModel)]="documentFilter" (selectionChange)="onDocumentFilterChange()">
                <mat-option value="all">All Restaurants</mat-option>
                <mat-option value="pending_documents">Pending Documents</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-tab-group
        class="status-tabs"
        (selectedTabChange)="onTabChange($event.index)"
        [selectedIndex]="getSelectedTabIndex()">
        <mat-tab label="Pending"></mat-tab>
        <mat-tab label="Under Review"></mat-tab>
        <mat-tab label="Needs Info"></mat-tab>
        <mat-tab label="Rejected"></mat-tab>
      </mat-tab-group>

      @if (restaurantService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading verification queue...</p>
        </div>
      } @else {
        <mat-card>
          <mat-card-content>
            @if (restaurants().length === 0) {
              <div class="empty-state">
                <mat-icon>verified</mat-icon>
                <h3>No restaurants to review</h3>
                <p>All caught up! Check back later for new submissions.</p>
              </div>
            } @else {
              <div class="table-wrapper">
                <table mat-table [dataSource]="restaurants()" class="verification-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Restaurant</th>
                    <td mat-cell *matCellDef="let restaurant">
                      <div class="restaurant-info">
                        <span class="restaurant-name">{{ restaurant.name }}</span>
                        <span class="restaurant-owner">Owned by {{ restaurant.ownerName }}</span>
                        <span class="restaurant-email">{{ restaurant.email }}</span>
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let restaurant">
                      <mat-chip [color]="restaurantService.getVerificationStatusColor(restaurant.verificationStatus)">
                        {{ restaurantService.getVerificationStatusDisplayName(restaurant.verificationStatus) }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="documents">
                    <th mat-header-cell *matHeaderCellDef>Documents</th>
                    <td mat-cell *matCellDef="let restaurant">
                      <div class="document-chips">
                        <mat-chip
                          *ngFor="let document of restaurant.documents"
                          [color]="restaurantService.getDocumentStatusColor(document.verificationStatus)"
                          matTooltip="{{ restaurantService.getDocumentStatusDisplayName(document.verificationStatus) }}">
                          {{ restaurantService.getDocumentTypeDisplayName(document.type) }}
                          @if (document.verificationStatus === 'rejected' && document.rejectionReason) {
                            <mat-icon class="info-icon" matTooltip="{{ document.rejectionReason }}">info</mat-icon>
                          }
                        </mat-chip>
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="submitted">
                    <th mat-header-cell *matHeaderCellDef>Submitted</th>
                    <td mat-cell *matCellDef="let restaurant">
                      {{ restaurant.createdAt | date:'medium' }}
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let restaurant">
                      <div class="actions">
                        <button mat-stroked-button color="primary" [routerLink]="['/restaurants', restaurant.id, 'verify']">
                          <mat-icon>task</mat-icon>
                          Verify
                        </button>
                        <button mat-icon-button [matMenuTriggerFor]="actionMenu">
                          <mat-icon>more_vert</mat-icon>
                        </button>
                        <mat-menu #actionMenu="matMenu">
                          <button mat-menu-item [routerLink]="['/restaurants', restaurant.id]">
                            <mat-icon>visibility</mat-icon>
                            View Details
                          </button>
                          @if (restaurant.verificationStatus !== 'under_review') {
                            <button mat-menu-item (click)="moveToUnderReview(restaurant.id)">
                              <mat-icon>hourglass_top</mat-icon>
                              Move to Review
                            </button>
                          }
                          <button mat-menu-item (click)="markAsVerified(restaurant.id)">
                            <mat-icon>verified</mat-icon>
                            Mark as Verified
                          </button>
                          <button mat-menu-item (click)="requestAdditionalInfo(restaurant.id)">
                            <mat-icon>help</mat-icon>
                            Request Info
                          </button>
                          <button mat-menu-item (click)="rejectRestaurant(restaurant.id)" class="danger-item">
                            <mat-icon>block</mat-icon>
                            Reject Application
                          </button>
                        </mat-menu>
                      </div>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>
              </div>

              <mat-paginator
                [length]="total()"
                [pageSize]="pageSize()"
                [pageIndex]="currentPage() - 1"
                [pageSizeOptions]="[5, 10, 25]"
                (page)="onPageChange($event)"
                showFirstLastButtons>
              </mat-paginator>
            }
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .verification-queue-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .subtitle {
      margin: 4px 0 0 0;
      color: #666;
    }

    .filters-card {
      margin-top: -8px;
    }

    .filters {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filters mat-form-field {
      min-width: 240px;
    }

    .status-tabs {
      margin-top: -8px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 48px 0;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #4caf50;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .verification-table {
      width: 100%;
    }

    .restaurant-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .restaurant-name {
      font-weight: 500;
      font-size: 16px;
    }

    .restaurant-owner,
    .restaurant-email {
      color: #666;
      font-size: 13px;
    }

    .document-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .info-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin-left: 6px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .danger-item {
      color: #f44336;
    }

    .danger-item mat-icon {
      color: #f44336;
    }
  `]
})
export class VerificationQueueComponent implements OnInit {
  protected readonly restaurantService = inject(RestaurantService);
  private readonly snackBar = inject(MatSnackBar);

  protected restaurants = signal<Restaurant[]>([]);
  protected total = signal(0);
  protected currentPage = signal(1);
  protected pageSize = signal(10);
  protected selectedStatus = signal<VerificationStatus>('pending');
  protected readonly displayedColumns = ['name', 'status', 'documents', 'submitted', 'actions'];

  protected searchQuery = '';
  protected documentFilter: 'all' | 'pending_documents' = 'all';
  private searchTimeout?: ReturnType<typeof setTimeout>;

  private readonly statusOrder: VerificationStatus[] = ['pending', 'under_review', 'additional_info_required', 'rejected'];

  ngOnInit() {
    this.loadRestaurants();
  }

  protected getSelectedTabIndex(): number {
    return this.statusOrder.indexOf(this.selectedStatus());
  }

  protected onTabChange(index: number) {
    const newStatus = this.statusOrder[index];
    if (!newStatus) return;
    this.selectedStatus.set(newStatus);
    this.currentPage.set(1);
    this.loadRestaurants();
  }

  protected onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.currentPage.set(1);
      this.loadRestaurants();
    }, 400);
  }

  protected onDocumentFilterChange() {
    this.currentPage.set(1);
    this.loadRestaurants();
  }

  protected async onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    await this.loadRestaurants();
  }

  protected async markAsVerified(restaurantId: string) {
    await this.updateVerificationStatus(restaurantId, 'verified', 'Restaurant verified successfully');
  }

  protected async moveToUnderReview(restaurantId: string) {
    await this.updateVerificationStatus(restaurantId, 'under_review', 'Restaurant moved to review');
  }

  protected async requestAdditionalInfo(restaurantId: string) {
    const notes = prompt('Provide details for the additional information request (optional):');
    await this.updateVerificationStatus(restaurantId, 'additional_info_required', 'Additional information requested', notes ?? undefined);
  }

  protected async rejectRestaurant(restaurantId: string) {
    const notes = prompt('Provide a reason for rejection (optional):');
    const confirmed = confirm('Are you sure you want to reject this restaurant?');
    if (!confirmed) return;
    await this.updateVerificationStatus(restaurantId, 'rejected', 'Restaurant rejected', notes ?? undefined);
  }

  private async updateVerificationStatus(
    restaurantId: string,
    status: VerificationStatus,
    successMessage: string,
    notes?: string
  ) {
    try {
      await this.restaurantService.verifyRestaurant({ restaurantId, status, notes });
      this.snackBar.open(successMessage, 'Close', { duration: 3000 });
      this.loadRestaurants();
    } catch (error) {
      this.snackBar.open('Failed to update verification status', 'Close', { duration: 3000 });
    }
  }

  private async loadRestaurants() {
    const filters: RestaurantFilters = {
      verificationStatus: this.selectedStatus()
    };

    if (this.documentFilter === 'pending_documents') {
      filters.hasUnverifiedDocuments = true;
    }

    if (this.searchQuery) {
      filters.search = this.searchQuery;
    }

    try {
      const response = await this.restaurantService.getRestaurants(
        filters,
        this.currentPage(),
        this.pageSize()
      );
      this.restaurants.set(response.restaurants);
      this.total.set(response.total);
    } catch (error) {
      this.snackBar.open('Failed to load verification queue', 'Close', { duration: 3000 });
    }
  }
}

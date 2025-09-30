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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

import { RestaurantService } from '../../../services/restaurant.service';
import {
  Restaurant,
  RestaurantFilters,
  RestaurantStatus,
  VerificationStatus,
  CuisineType,
  PriceRange
} from '../../../types/restaurant.types';

@Component({
  selector: 'app-restaurant-list',
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
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    MatBadgeModule
  ],
  template: `
    <div class="restaurant-list-container">
      <div class="header">
        <h1>Restaurant Management</h1>
        <div class="header-actions">
          <button mat-raised-button color="accent" [routerLink]="['/restaurants/verification']">
            <mat-icon [matBadge]="pendingVerificationCount()" matBadgeColor="warn" [matBadgeHidden]="pendingVerificationCount() === 0">verified</mat-icon>
            Verification Queue
          </button>
          <button mat-raised-button color="primary" [routerLink]="['/restaurants/create']">
            <mat-icon>add</mat-icon>
            Add Restaurant
          </button>
        </div>
      </div>

      <!-- Status Tabs -->
      <mat-tab-group (selectedTabChange)="onTabChange($event.index)" class="status-tabs">
        <mat-tab label="All Restaurants">
          <ng-template matTabContent>
            <span>All ({{ totalRestaurants() }})</span>
          </ng-template>
        </mat-tab>
        <mat-tab label="Active">
          <ng-template matTabContent>
            <span>Active ({{ getCountByStatus('active') }})</span>
          </ng-template>
        </mat-tab>
        <mat-tab label="Pending Verification">
          <ng-template matTabContent>
            <span>Pending ({{ getCountByVerificationStatus('pending') }})</span>
          </ng-template>
        </mat-tab>
        <mat-tab label="Under Review">
          <ng-template matTabContent>
            <span>Review ({{ getCountByVerificationStatus('under_review') }})</span>
          </ng-template>
        </mat-tab>
        <mat-tab label="Suspended">
          <ng-template matTabContent>
            <span>Suspended ({{ getCountByStatus('suspended') }})</span>
          </ng-template>
        </mat-tab>
      </mat-tab-group>

      <!-- Filters -->
      <mat-card class="filters-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field>
              <mat-label>Search</mat-label>
              <input matInput
                     [(ngModel)]="searchQuery"
                     (input)="onSearchChange()"
                     placeholder="Search by name, owner, or email">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Cuisine Type</mat-label>
              <mat-select [(ngModel)]="selectedCuisine" (selectionChange)="onFilterChange()">
                <mat-option value="">All Cuisines</mat-option>
                <mat-option value="italian">Italian</mat-option>
                <mat-option value="chinese">Chinese</mat-option>
                <mat-option value="indian">Indian</mat-option>
                <mat-option value="mexican">Mexican</mat-option>
                <mat-option value="japanese">Japanese</mat-option>
                <mat-option value="american">American</mat-option>
                <mat-option value="thai">Thai</mat-option>
                <mat-option value="french">French</mat-option>
                <mat-option value="pizza">Pizza</mat-option>
                <mat-option value="burger">Burger</mat-option>
                <mat-option value="sushi">Sushi</mat-option>
                <mat-option value="vegetarian">Vegetarian</mat-option>
                <mat-option value="vegan">Vegan</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Price Range</mat-label>
              <mat-select [(ngModel)]="selectedPriceRange" (selectionChange)="onFilterChange()">
                <mat-option value="">All Prices</mat-option>
                <mat-option value="$">$ (Budget)</mat-option>
                <mat-option value="$$">$$ (Moderate)</mat-option>
                <mat-option value="$$$">$$$ (Expensive)</mat-option>
                <mat-option value="$$$$">$$$$ (Very Expensive)</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>City</mat-label>
              <input matInput
                     [(ngModel)]="selectedCity"
                     (input)="onFilterChange()"
                     placeholder="Filter by city">
            </mat-form-field>

            <button mat-button (click)="clearFilters()" color="accent">
              <mat-icon>clear</mat-icon>
              Clear Filters
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Loading State -->
      @if (restaurantService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading restaurants...</p>
        </div>
      } @else {
        <!-- Restaurants Table -->
        <mat-card>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="restaurants()" class="restaurants-table">
                <!-- Image Column -->
                <ng-container matColumnDef="image">
                  <th mat-header-cell *matHeaderCellDef>Image</th>
                  <td mat-cell *matCellDef="let restaurant">
                    @if (restaurant.images.length > 0) {
                      <img [src]="restaurant.images[0].url" [alt]="restaurant.name" class="restaurant-image">
                    } @else {
                      <div class="image-placeholder">
                        <mat-icon>restaurant</mat-icon>
                      </div>
                    }
                  </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Restaurant</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <div class="restaurant-info">
                      <span class="restaurant-name">{{ restaurant.name }}</span>
                      <span class="restaurant-owner">{{ restaurant.ownerName }}</span>
                      <div class="cuisine-chips">
                        <mat-chip *ngFor="let cuisine of restaurant.cuisine.slice(0, 2)"
                                  class="cuisine-chip">
                          {{ restaurantService.getCuisineDisplayName(cuisine) }}
                        </mat-chip>
                        @if (restaurant.cuisine.length > 2) {
                          <span class="more-cuisines">+{{ restaurant.cuisine.length - 2 }} more</span>
                        }
                      </div>
                    </div>
                  </td>
                </ng-container>

                <!-- Location Column -->
                <ng-container matColumnDef="location">
                  <th mat-header-cell *matHeaderCellDef>Location</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <div class="location-info">
                      <span class="city">{{ restaurant.address.city }}, {{ restaurant.address.state }}</span>
                      <span class="delivery-radius">{{ restaurant.address.deliveryRadius }}km radius</span>
                    </div>
                  </td>
                </ng-container>

                <!-- Rating Column -->
                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef>Rating</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <div class="rating-info">
                      <div class="rating-stars">
                        <mat-icon class="star-icon">star</mat-icon>
                        <span>{{ restaurant.rating || 'N/A' }}</span>
                      </div>
                      <span class="review-count">({{ restaurant.totalReviews }} reviews)</span>
                    </div>
                  </td>
                </ng-container>

                <!-- Status Column -->
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <div class="status-chips">
                      <mat-chip [color]="restaurantService.getStatusColor(restaurant.status)">
                        {{ restaurantService.getStatusDisplayName(restaurant.status) }}
                      </mat-chip>
                      <mat-chip [color]="restaurantService.getVerificationStatusColor(restaurant.verificationStatus)"
                                class="verification-chip">
                        {{ restaurantService.getVerificationStatusDisplayName(restaurant.verificationStatus) }}
                      </mat-chip>
                    </div>
                  </td>
                </ng-container>

                <!-- Revenue Column -->
                <ng-container matColumnDef="revenue">
                  <th mat-header-cell *matHeaderCellDef>Revenue</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <div class="revenue-info">
                      <span class="revenue-amount">\${{ restaurant.metrics.totalRevenue | number }}</span>
                      <span class="order-count">{{ restaurant.metrics.totalOrders }} orders</span>
                    </div>
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let restaurant">
                    <button mat-icon-button [matMenuTriggerFor]="restaurantMenu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #restaurantMenu="matMenu">
                      <button mat-menu-item [routerLink]="['/restaurants', restaurant.id]">
                        <mat-icon>visibility</mat-icon>
                        <span>View Details</span>
                      </button>
                      <button mat-menu-item [routerLink]="['/restaurants', restaurant.id, 'edit']">
                        <mat-icon>edit</mat-icon>
                        <span>Edit Restaurant</span>
                      </button>
                      @if (restaurant.verificationStatus !== 'verified') {
                        <button mat-menu-item [routerLink]="['/restaurants', restaurant.id, 'verify']">
                          <mat-icon>verified</mat-icon>
                          <span>Verify Restaurant</span>
                        </button>
                      }
                      <mat-divider></mat-divider>
                      @if (restaurant.status === 'active') {
                        <button mat-menu-item (click)="changeRestaurantStatus(restaurant.id, 'suspended')">
                          <mat-icon>block</mat-icon>
                          <span>Suspend</span>
                        </button>
                      } @else if (restaurant.status === 'suspended') {
                        <button mat-menu-item (click)="changeRestaurantStatus(restaurant.id, 'active')">
                          <mat-icon>check_circle</mat-icon>
                          <span>Activate</span>
                        </button>
                      }
                      @if (restaurant.status === 'temporarily_closed') {
                        <button mat-menu-item (click)="changeRestaurantStatus(restaurant.id, 'active')">
                          <mat-icon>store</mat-icon>
                          <span>Reopen</span>
                        </button>
                      }
                      <mat-divider></mat-divider>
                      <button mat-menu-item (click)="deleteRestaurant(restaurant.id)" class="danger-item">
                        <mat-icon>delete</mat-icon>
                        <span>Delete Restaurant</span>
                      </button>
                    </mat-menu>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                    class="restaurant-row"
                    [routerLink]="['/restaurants', row.id]"></tr>
              </table>
            </div>

            <!-- Paginator -->
            <mat-paginator
              [length]="totalRestaurants()"
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
    .restaurant-list-container {
      padding: 24px;
      max-width: 1600px;
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

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .status-tabs {
      margin-bottom: 24px;
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

    .restaurants-table {
      width: 100%;
    }

    .restaurant-image {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      object-fit: cover;
    }

    .image-placeholder {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .restaurant-owner {
      color: #666;
      font-size: 14px;
    }

    .cuisine-chips {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .cuisine-chip {
      font-size: 11px;
      min-height: 20px;
      padding: 2px 8px;
    }

    .more-cuisines {
      font-size: 12px;
      color: #666;
    }

    .location-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .city {
      font-weight: 500;
    }

    .delivery-radius {
      color: #666;
      font-size: 12px;
    }

    .rating-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .rating-stars {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star-icon {
      color: #ffc107;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .review-count {
      color: #666;
      font-size: 12px;
    }

    .status-chips {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .verification-chip {
      font-size: 11px;
      min-height: 20px;
    }

    .revenue-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .revenue-amount {
      font-weight: 500;
    }

    .order-count {
      color: #666;
      font-size: 12px;
    }

    .restaurant-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .restaurant-row:hover {
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
export class RestaurantListComponent implements OnInit {
  protected readonly restaurantService = inject(RestaurantService);
  private readonly snackBar = inject(MatSnackBar);

  protected restaurants = signal<Restaurant[]>([]);
  protected totalRestaurants = signal(0);
  protected currentPage = signal(1);
  protected pageSize = signal(10);
  protected pendingVerificationCount = signal(0);

  protected searchQuery = '';
  protected selectedCuisine: CuisineType | '' = '';
  protected selectedPriceRange: PriceRange | '' = '';
  protected selectedCity = '';
  protected currentTab = 0;

  protected displayedColumns = ['image', 'name', 'location', 'rating', 'status', 'revenue', 'actions'];

  private searchTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    this.loadRestaurants();
    this.updatePendingVerificationCount();
  }

  private async loadRestaurants() {
    const filters: RestaurantFilters = {};

    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.selectedCuisine) filters.cuisine = this.selectedCuisine;
    if (this.selectedPriceRange) filters.priceRange = this.selectedPriceRange;
    if (this.selectedCity) filters.city = this.selectedCity;

    // Apply tab-based filters
    switch (this.currentTab) {
      case 1: filters.status = 'active'; break;
      case 2: filters.verificationStatus = 'pending'; break;
      case 3: filters.verificationStatus = 'under_review'; break;
      case 4: filters.status = 'suspended'; break;
    }

    try {
      const response = await this.restaurantService.getRestaurants(
        filters,
        this.currentPage(),
        this.pageSize()
      );

      this.restaurants.set(response.restaurants);
      this.totalRestaurants.set(response.total);
    } catch (error) {
      this.snackBar.open('Failed to load restaurants', 'Close', { duration: 3000 });
    }
  }

  private updatePendingVerificationCount() {
    this.pendingVerificationCount.set(this.restaurantService.getPendingVerificationCount());
  }

  protected onTabChange(tabIndex: number) {
    this.currentTab = tabIndex;
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
    }, 500);
  }

  protected onFilterChange() {
    this.currentPage.set(1);
    this.loadRestaurants();
  }

  protected clearFilters() {
    this.searchQuery = '';
    this.selectedCuisine = '';
    this.selectedPriceRange = '';
    this.selectedCity = '';
    this.currentPage.set(1);
    this.loadRestaurants();
  }

  protected onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadRestaurants();
  }

  protected async changeRestaurantStatus(restaurantId: string, status: RestaurantStatus) {
    try {
      await this.restaurantService.changeRestaurantStatus(restaurantId, status);
      this.snackBar.open('Restaurant status updated successfully', 'Close', { duration: 3000 });
      this.loadRestaurants();
    } catch (error) {
      this.snackBar.open('Failed to update restaurant status', 'Close', { duration: 3000 });
    }
  }

  protected async deleteRestaurant(restaurantId: string) {
    const confirmed = confirm('Are you sure you want to delete this restaurant? This action cannot be undone.');

    if (confirmed) {
      try {
        await this.restaurantService.deleteRestaurant(restaurantId);
        this.snackBar.open('Restaurant deleted successfully', 'Close', { duration: 3000 });
        this.loadRestaurants();
      } catch (error) {
        this.snackBar.open('Failed to delete restaurant', 'Close', { duration: 3000 });
      }
    }
  }

  protected getCountByStatus(status: RestaurantStatus): number {
    return this.restaurants().filter(r => r.status === status).length;
  }

  protected getCountByVerificationStatus(status: VerificationStatus): number {
    return this.restaurants().filter(r => r.verificationStatus === status).length;
  }
}
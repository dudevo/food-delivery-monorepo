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
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant, RestaurantStatus, VerificationStatus } from '../../../types/restaurant.types';

@Component({
  selector: 'app-restaurant-detail',
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
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  template: `
    <div class="restaurant-detail-container">
      @if (restaurantService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading restaurant details...</p>
        </div>
      } @else if (restaurant()) {
        <div class="header">
          <button mat-button routerLink="/restaurants" color="primary">
            <mat-icon>arrow_back</mat-icon>
            Back to Restaurants
          </button>

          <div class="header-actions">
            <button mat-raised-button color="primary" [routerLink]="['/restaurants', restaurant()!.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit Restaurant
            </button>

            @if (restaurant()!.verificationStatus !== 'verified') {
              <button mat-raised-button color="accent" [routerLink]="['/restaurants', restaurant()!.id, 'verify']">
                <mat-icon>verified</mat-icon>
                Verify Restaurant
              </button>
            }

            <button mat-button [matMenuTriggerFor]="actionsMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #actionsMenu="matMenu">
              @if (restaurant()!.status === 'active') {
                <button mat-menu-item (click)="changeRestaurantStatus('suspended')">
                  <mat-icon>block</mat-icon>
                  <span>Suspend Restaurant</span>
                </button>
              } @else if (restaurant()!.status === 'suspended') {
                <button mat-menu-item (click)="changeRestaurantStatus('active')">
                  <mat-icon>check_circle</mat-icon>
                  <span>Activate Restaurant</span>
                </button>
              }
              @if (restaurant()!.status === 'temporarily_closed') {
                <button mat-menu-item (click)="changeRestaurantStatus('active')">
                  <mat-icon>store</mat-icon>
                  <span>Reopen Restaurant</span>
                </button>
              }
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="deleteRestaurant()" class="danger-item">
                <mat-icon>delete</mat-icon>
                <span>Delete Restaurant</span>
              </button>
            </mat-menu>
          </div>
        </div>

        <!-- Restaurant Header -->
        <mat-card class="restaurant-header-card">
          <mat-card-content>
            <div class="restaurant-header">
              @if (restaurant()!.images.length > 0) {
                <img [src]="restaurant()!.images[0].url" [alt]="restaurant()!.name" class="restaurant-cover">
              } @else {
                <div class="cover-placeholder">
                  <mat-icon>restaurant</mat-icon>
                </div>
              }

              <div class="restaurant-summary">
                <h1>{{ restaurant()!.name }}</h1>
                <p class="description">{{ restaurant()!.description }}</p>

                <div class="badges">
                  <mat-chip [color]="restaurantService.getStatusColor(restaurant()!.status)">
                    {{ restaurantService.getStatusDisplayName(restaurant()!.status) }}
                  </mat-chip>
                  <mat-chip [color]="restaurantService.getVerificationStatusColor(restaurant()!.verificationStatus)">
                    {{ restaurantService.getVerificationStatusDisplayName(restaurant()!.verificationStatus) }}
                  </mat-chip>
                  <mat-chip>{{ restaurant()!.priceRange }}</mat-chip>
                </div>

                <div class="rating-section">
                  <div class="rating">
                    <mat-icon class="star-icon">star</mat-icon>
                    <span class="rating-value">{{ restaurant()!.rating || 'N/A' }}</span>
                    <span class="review-count">({{ restaurant()!.totalReviews }} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Tabs Content -->
        <mat-tab-group class="detail-tabs">
          <!-- Basic Information Tab -->
          <mat-tab label="Basic Information">
            <div class="tab-content">
              <div class="info-grid">
                <!-- Contact Information -->
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>contact_phone</mat-icon>
                      Contact Information
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="info-list">
                      <div class="info-item">
                        <label>Email</label>
                        <span>{{ restaurant()!.email }}</span>
                      </div>
                      <div class="info-item">
                        <label>Phone</label>
                        <span>{{ restaurant()!.phone }}</span>
                      </div>
                      <div class="info-item">
                        <label>Owner</label>
                        <span>{{ restaurant()!.ownerName }}</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <!-- Address Information -->
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>location_on</mat-icon>
                      Address
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="address-info">
                      <p>{{ restaurant()!.address.street }}</p>
                      <p>{{ restaurant()!.address.city }}, {{ restaurant()!.address.state }} {{ restaurant()!.address.zipCode }}</p>
                      <p>{{ restaurant()!.address.country }}</p>
                      <div class="delivery-info">
                        <mat-icon>delivery_dining</mat-icon>
                        <span>{{ restaurant()!.address.deliveryRadius }}km delivery radius</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <!-- Cuisine & Features -->
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>restaurant_menu</mat-icon>
                      Cuisine & Features
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="feature-section">
                      <h4>Cuisine Types</h4>
                      <div class="chip-container">
                        <mat-chip *ngFor="let cuisine of restaurant()!.cuisine">
                          {{ restaurantService.getCuisineDisplayName(cuisine) }}
                        </mat-chip>
                      </div>
                    </div>
                    <mat-divider></mat-divider>
                    <div class="feature-section">
                      <h4>Features</h4>
                      <div class="chip-container">
                        <mat-chip *ngFor="let feature of restaurant()!.features" color="accent">
                          {{ restaurantService.getFeatureDisplayName(feature) }}
                        </mat-chip>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <!-- Opening Hours -->
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>
                      <mat-icon>schedule</mat-icon>
                      Opening Hours
                    </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="opening-hours">
                      <div class="day-schedule" *ngFor="let day of getDaysOfWeek()">
                        <span class="day">{{ day.name }}</span>
                        <span class="hours">
                          @if (day.schedule.isOpen) {
                            @if (day.schedule.isAllDay) {
                              <span class="all-day">24 Hours</span>
                            } @else {
                              {{ day.schedule.openTime }} - {{ day.schedule.closeTime }}
                            }
                          } @else {
                            <span class="closed">Closed</span>
                          }
                        </span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Metrics Tab -->
          <mat-tab label="Performance Metrics">
            <div class="tab-content">
              <div class="metrics-grid">
                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon color="primary">shopping_cart</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">{{ restaurant()!.metrics.totalOrders }}</span>
                        <span class="metric-label">Total Orders</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon color="accent">attach_money</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">\${{ restaurant()!.metrics.totalRevenue | number }}</span>
                        <span class="metric-label">Total Revenue</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon color="warn">receipt</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">\${{ restaurant()!.metrics.averageOrderValue | number:'1.2-2' }}</span>
                        <span class="metric-label">Avg Order Value</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon style="color: green;">check_circle</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">{{ restaurant()!.metrics.completionRate }}%</span>
                        <span class="metric-label">Completion Rate</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon color="primary">timer</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">{{ restaurant()!.metrics.averagePreparationTime }}</span>
                        <span class="metric-label">Avg Prep Time (min)</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="metric-card">
                  <mat-card-content>
                    <div class="metric-content">
                      <mat-icon color="accent">restaurant_menu</mat-icon>
                      <div class="metric-info">
                        <span class="metric-value">{{ restaurant()!.metrics.activeMenuItems }}</span>
                        <span class="metric-label">Active Menu Items</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Documents & Verification Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <span [matBadge]="getPendingDocumentCount()" matBadgeColor="warn" [matBadgeHidden]="getPendingDocumentCount() === 0">
                Documents & Verification
              </span>
            </ng-template>
            <div class="tab-content">
              <div class="documents-section">
                <div class="section-header">
                  <h3>Verification Status</h3>
                  <mat-chip [color]="restaurantService.getVerificationStatusColor(restaurant()!.verificationStatus)">
                    {{ restaurantService.getVerificationStatusDisplayName(restaurant()!.verificationStatus) }}
                  </mat-chip>
                </div>

                @if (restaurant()!.verifiedAt) {
                  <p class="verification-date">
                    <mat-icon>verified</mat-icon>
                    Verified on {{ restaurant()!.verifiedAt | date:'medium' }}
                  </p>
                }

                <mat-divider></mat-divider>

                <div class="documents-list">
                  <h4>Required Documents</h4>
                  @if (restaurant()!.documents.length > 0) {
                    <mat-list>
                      <mat-list-item *ngFor="let document of restaurant()!.documents">
                        <mat-icon matListItemIcon>description</mat-icon>
                        <div matListItemTitle>{{ document.name }}</div>
                        <div matListItemLine>{{ restaurantService.getDocumentTypeDisplayName(document.type) }}</div>
                        <div matListItemMeta>
                          <mat-chip [color]="restaurantService.getDocumentStatusColor(document.verificationStatus)">
                            {{ restaurantService.getDocumentStatusDisplayName(document.verificationStatus) }}
                          </mat-chip>
                        </div>
                      </mat-list-item>
                    </mat-list>
                  } @else {
                    <p class="no-documents">No documents uploaded yet.</p>
                  }
                </div>
              </div>
            </div>
          </mat-tab>

          <!-- Account Information Tab -->
          <mat-tab label="Account Information">
            <div class="tab-content">
              <mat-card>
                <mat-card-content>
                  <div class="account-grid">
                    <div class="info-item">
                      <label>Restaurant ID</label>
                      <span class="monospace">{{ restaurant()!.id }}</span>
                    </div>
                    <div class="info-item">
                      <label>Owner ID</label>
                      <span class="monospace">{{ restaurant()!.ownerId }}</span>
                    </div>
                    <div class="info-item">
                      <label>Created</label>
                      <span>{{ restaurant()!.createdAt | date:'medium' }}</span>
                    </div>
                    <div class="info-item">
                      <label>Last Updated</label>
                      <span>{{ restaurant()!.updatedAt | date:'medium' }}</span>
                    </div>
                    <div class="info-item">
                      <label>Last Active</label>
                      <span>
                        @if (restaurant()!.lastActiveAt) {
                          {{ restaurant()!.lastActiveAt | date:'medium' }}
                        } @else {
                          <span class="never-active">Never active</span>
                        }
                      </span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      } @else {
        <div class="error-container">
          <mat-icon class="error-icon">error</mat-icon>
          <h2>Restaurant Not Found</h2>
          <p>The requested restaurant could not be found.</p>
          <button mat-raised-button color="primary" routerLink="/restaurants">
            Back to Restaurants
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .restaurant-detail-container {
      padding: 24px;
      max-width: 1400px;
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

    .restaurant-header-card {
      margin-bottom: 24px;
    }

    .restaurant-header {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    .restaurant-cover {
      width: 200px;
      height: 150px;
      border-radius: 12px;
      object-fit: cover;
    }

    .cover-placeholder {
      width: 200px;
      height: 150px;
      border-radius: 12px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cover-placeholder mat-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
    }

    .restaurant-summary {
      flex: 1;
    }

    .restaurant-summary h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
    }

    .description {
      margin: 0 0 16px 0;
      color: #666;
      font-size: 16px;
      line-height: 1.5;
    }

    .badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .rating-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .star-icon {
      color: #ffc107;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .rating-value {
      font-size: 18px;
      font-weight: 500;
    }

    .review-count {
      color: #666;
    }

    .detail-tabs {
      margin-top: 24px;
    }

    .tab-content {
      padding: 24px 0;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .info-list {
      display: flex;
      flex-direction: column;
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

    .delivery-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      color: #666;
    }

    .feature-section {
      margin: 16px 0;
    }

    .feature-section h4 {
      margin: 0 0 12px 0;
      color: #666;
    }

    .chip-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .opening-hours {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .day-schedule {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .day {
      font-weight: 500;
      min-width: 100px;
    }

    .hours {
      color: #666;
    }

    .all-day {
      color: #4caf50;
      font-weight: 500;
    }

    .closed {
      color: #f44336;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .metric-card {
      transition: transform 0.2s ease-in-out;
    }

    .metric-card:hover {
      transform: translateY(-2px);
    }

    .metric-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .metric-content mat-icon {
      font-size: 36px;
      width: 36px;
      height: 36px;
    }

    .metric-info {
      display: flex;
      flex-direction: column;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 600;
    }

    .metric-label {
      color: #666;
      font-size: 14px;
    }

    .documents-section {
      max-width: 800px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header h3 {
      margin: 0;
    }

    .verification-date {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4caf50;
      margin-bottom: 16px;
    }

    .documents-list h4 {
      margin: 16px 0 12px 0;
      color: #666;
    }

    .no-documents {
      color: #999;
      font-style: italic;
      padding: 16px;
      text-align: center;
    }

    .account-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .never-active {
      color: #999;
      font-style: italic;
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
export class RestaurantDetailComponent implements OnInit {
  protected readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected restaurant = signal<Restaurant | null>(null);

  ngOnInit() {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.loadRestaurant(restaurantId);
    }
  }

  private async loadRestaurant(restaurantId: string) {
    try {
      const restaurant = await this.restaurantService.getRestaurantById(restaurantId);
      this.restaurant.set(restaurant || null);
    } catch (error) {
      this.snackBar.open('Failed to load restaurant details', 'Close', { duration: 3000 });
    }
  }

  protected getDaysOfWeek() {
    const restaurant = this.restaurant();
    if (!restaurant) return [];

    return [
      { name: 'Monday', schedule: restaurant.openingHours.monday },
      { name: 'Tuesday', schedule: restaurant.openingHours.tuesday },
      { name: 'Wednesday', schedule: restaurant.openingHours.wednesday },
      { name: 'Thursday', schedule: restaurant.openingHours.thursday },
      { name: 'Friday', schedule: restaurant.openingHours.friday },
      { name: 'Saturday', schedule: restaurant.openingHours.saturday },
      { name: 'Sunday', schedule: restaurant.openingHours.sunday }
    ];
  }

  protected getPendingDocumentCount(): number {
    const restaurant = this.restaurant();
    if (!restaurant) return 0;

    return restaurant.documents.filter(doc =>
      doc.verificationStatus === 'pending' || doc.verificationStatus === 'rejected'
    ).length;
  }

  protected async changeRestaurantStatus(status: RestaurantStatus) {
    const currentRestaurant = this.restaurant();
    if (!currentRestaurant) return;

    try {
      await this.restaurantService.changeRestaurantStatus(currentRestaurant.id, status);
      this.snackBar.open('Restaurant status updated successfully', 'Close', { duration: 3000 });
      this.loadRestaurant(currentRestaurant.id);
    } catch (error) {
      this.snackBar.open('Failed to update restaurant status', 'Close', { duration: 3000 });
    }
  }

  protected async deleteRestaurant() {
    const currentRestaurant = this.restaurant();
    if (!currentRestaurant) return;

    const confirmed = confirm(`Are you sure you want to delete ${currentRestaurant.name}? This action cannot be undone.`);

    if (confirmed) {
      try {
        await this.restaurantService.deleteRestaurant(currentRestaurant.id);
        this.snackBar.open('Restaurant deleted successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/restaurants']);
      } catch (error) {
        this.snackBar.open('Failed to delete restaurant', 'Close', { duration: 3000 });
      }
    }
  }
}

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RestaurantService } from '../../../services/restaurant.service';
import {
  Restaurant,
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  CuisineType,
  PriceRange,
  RestaurantFeature,
  OpeningHours,
  DaySchedule
} from '../../../types/restaurant.types';

@Component({
  selector: 'app-restaurant-form',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="restaurant-form-container">
      @if (isInitializing() || (isEditMode() && restaurantService.isLoading())) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>{{ isEditMode() ? 'Loading restaurant information...' : 'Preparing form...' }}</p>
        </div>
      } @else {
        <div class="header">
          <button mat-button routerLink="/restaurants" color="primary">
            <mat-icon>arrow_back</mat-icon>
            Back to Restaurants
          </button>
          <h1>{{ isEditMode() ? 'Edit Restaurant' : 'Create New Restaurant' }}</h1>
        </div>

        <form [formGroup]="restaurantForm" (ngSubmit)="onSubmit()">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>store</mat-icon>
                Basic Information
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="form-grid">
                <mat-form-field>
                  <mat-label>Restaurant Name</mat-label>
                  <input matInput formControlName="name" placeholder="Enter restaurant name">
                  @if (restaurantForm.get('name')?.invalid && restaurantForm.get('name')?.touched) {
                    <mat-error>Name is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="Contact email">
                  @if (restaurantForm.get('email')?.hasError('required') && restaurantForm.get('email')?.touched) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (restaurantForm.get('email')?.hasError('email') && restaurantForm.get('email')?.touched) {
                    <mat-error>Enter a valid email address</mat-error>
                  }
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Phone Number</mat-label>
                  <input matInput formControlName="phone" placeholder="Primary contact number">
                  @if (restaurantForm.get('phone')?.invalid && restaurantForm.get('phone')?.touched) {
                    <mat-error>Phone number is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Owner ID</mat-label>
                  <input matInput formControlName="ownerId" placeholder="Associated owner user ID">
                  @if (!isEditMode() && restaurantForm.get('ownerId')?.invalid && restaurantForm.get('ownerId')?.touched) {
                    <mat-error>Owner ID is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="description-field">
                  <mat-label>Description</mat-label>
                  <textarea matInput
                            formControlName="description"
                            rows="4"
                            placeholder="Describe the restaurant, cuisine, and unique selling points"></textarea>
                  @if (restaurantForm.get('description')?.invalid && restaurantForm.get('description')?.touched) {
                    <mat-error>Description is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Price Range</mat-label>
                  <mat-select formControlName="priceRange">
                    <mat-option *ngFor="let price of priceRanges" [value]="price">
                      {{ getPriceRangeLabel(price) }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Cuisine Types</mat-label>
                  <mat-select formControlName="cuisine" multiple>
                    <mat-option *ngFor="let cuisine of cuisineOptions" [value]="cuisine.value">
                      {{ cuisine.label }}
                    </mat-option>
                  </mat-select>
                  @if (restaurantForm.get('cuisine')?.invalid && restaurantForm.get('cuisine')?.touched) {
                    <mat-error>Select at least one cuisine type</mat-error>
                  }
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Available Features</mat-label>
                  <mat-select formControlName="features" multiple>
                    <mat-option *ngFor="let feature of featureOptions" [value]="feature.value">
                      {{ feature.label }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>location_on</mat-icon>
                Address & Delivery
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="form-grid" [formGroup]="addressGroup">
                <mat-form-field>
                  <mat-label>Street Address</mat-label>
                  <input matInput formControlName="street" placeholder="Street and number">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>City</mat-label>
                  <input matInput formControlName="city" placeholder="City">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>State</mat-label>
                  <input matInput formControlName="state" placeholder="State or region">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Postal Code</mat-label>
                  <input matInput formControlName="zipCode" placeholder="ZIP / Postal code">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Country</mat-label>
                  <input matInput formControlName="country" placeholder="Country">
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Delivery Radius (km)</mat-label>
                  <input matInput type="number" min="1" formControlName="deliveryRadius">
                  @if (addressGroup.get('deliveryRadius')?.invalid && addressGroup.get('deliveryRadius')?.touched) {
                    <mat-error>Enter a delivery radius of at least 1 km</mat-error>
                  }
                </mat-form-field>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>schedule</mat-icon>
                Opening Hours
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="opening-hours-grid" formGroupName="openingHours">
                <div class="day-card" *ngFor="let day of daysOfWeek" [formGroupName]="day.key">
                  <h4>{{ day.label }}</h4>

                  <mat-slide-toggle formControlName="isOpen" (change)="toggleDayOpen(day.key, $event.checked)">
                    Open
                  </mat-slide-toggle>

                  <div class="day-form">
                    <mat-slide-toggle formControlName="isAllDay">Open 24 hours</mat-slide-toggle>

                    <div class="time-inputs">
                      <mat-form-field>
                        <mat-label>Opens at</mat-label>
                        <input matInput type="time" formControlName="openTime" [disabled]="isTimeDisabled(day.key)">
                      </mat-form-field>
                      <mat-form-field>
                        <mat-label>Closes at</mat-label>
                        <input matInput type="time" formControlName="closeTime" [disabled]="isTimeDisabled(day.key)">
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <div class="form-actions">
            <button mat-button type="button" routerLink="/restaurants" [disabled]="isSubmitting()">
              Cancel
            </button>
            <button mat-raised-button color="primary" type="submit" [disabled]="restaurantForm.invalid || isSubmitting()">
              <mat-icon>save</mat-icon>
              {{ isEditMode() ? 'Save Changes' : 'Create Restaurant' }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .restaurant-form-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .description-field {
      grid-column: 1 / -1;
    }

    .opening-hours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .day-card {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #fafafa;
    }

    .day-card h4 {
      margin: 0;
      font-size: 16px;
    }

    .day-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .time-inputs {
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 1fr));
      gap: 12px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px 0;
    }
  `]
})
export class RestaurantFormComponent implements OnInit {
  protected readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  protected readonly restaurantForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    ownerId: ['', Validators.required],
    priceRange: ['$$' as PriceRange, Validators.required],
    cuisine: this.fb.nonNullable.control<CuisineType[]>([], Validators.required),
    features: this.fb.nonNullable.control<RestaurantFeature[]>([]),
    address: this.fb.nonNullable.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      deliveryRadius: [5, [Validators.required, Validators.min(1)]]
    }),
    openingHours: this.fb.nonNullable.group({
      monday: this.buildDayScheduleGroup(),
      tuesday: this.buildDayScheduleGroup(),
      wednesday: this.buildDayScheduleGroup(),
      thursday: this.buildDayScheduleGroup(),
      friday: this.buildDayScheduleGroup(),
      saturday: this.buildDayScheduleGroup(),
      sunday: this.buildDayScheduleGroup()
    })
  });

  protected readonly cuisineOptions = [
    { value: 'italian' as CuisineType, label: 'Italian' },
    { value: 'chinese' as CuisineType, label: 'Chinese' },
    { value: 'indian' as CuisineType, label: 'Indian' },
    { value: 'mexican' as CuisineType, label: 'Mexican' },
    { value: 'japanese' as CuisineType, label: 'Japanese' },
    { value: 'american' as CuisineType, label: 'American' },
    { value: 'thai' as CuisineType, label: 'Thai' },
    { value: 'french' as CuisineType, label: 'French' },
    { value: 'mediterranean' as CuisineType, label: 'Mediterranean' },
    { value: 'pizza' as CuisineType, label: 'Pizza' },
    { value: 'burger' as CuisineType, label: 'Burger' },
    { value: 'sushi' as CuisineType, label: 'Sushi' },
    { value: 'vegetarian' as CuisineType, label: 'Vegetarian' },
    { value: 'vegan' as CuisineType, label: 'Vegan' },
    { value: 'desserts' as CuisineType, label: 'Desserts' },
    { value: 'coffee' as CuisineType, label: 'Coffee' },
    { value: 'other' as CuisineType, label: 'Other' }
  ];

  protected readonly featureOptions = [
    { value: 'delivery' as RestaurantFeature, label: 'Delivery' },
    { value: 'pickup' as RestaurantFeature, label: 'Pickup' },
    { value: 'dine_in' as RestaurantFeature, label: 'Dine In' },
    { value: 'outdoor_seating' as RestaurantFeature, label: 'Outdoor Seating' },
    { value: 'parking' as RestaurantFeature, label: 'Parking' },
    { value: 'wifi' as RestaurantFeature, label: 'WiFi' },
    { value: 'accepts_cards' as RestaurantFeature, label: 'Accepts Cards' },
    { value: 'cash_only' as RestaurantFeature, label: 'Cash Only' },
    { value: 'alcohol_served' as RestaurantFeature, label: 'Alcohol Served' },
    { value: 'halal' as RestaurantFeature, label: 'Halal' },
    { value: 'kosher' as RestaurantFeature, label: 'Kosher' },
    { value: 'wheelchair_accessible' as RestaurantFeature, label: 'Wheelchair Accessible' }
  ];

  protected readonly priceRanges: PriceRange[] = ['$', '$$', '$$$', '$$$$'];

  protected readonly daysOfWeek: ReadonlyArray<{ key: keyof OpeningHours; label: string }> = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  protected readonly isEditMode = signal(false);
  protected readonly isInitializing = signal(true);
  protected readonly isSubmitting = signal(false);

  private currentRestaurant = signal<Restaurant | null>(null);

  ngOnInit() {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.isEditMode.set(true);
      this.loadRestaurant(restaurantId);
    } else {
      this.isInitializing.set(false);
    }
  }

  protected get addressGroup(): FormGroup {
    return this.restaurantForm.controls.address as FormGroup;
  }

  protected getOpeningHoursGroup(day: keyof OpeningHours): FormGroup {
    const openingHours = this.restaurantForm.controls.openingHours as FormGroup;
    return openingHours.get(day) as FormGroup;
  }

  protected toggleDayOpen(day: keyof OpeningHours, isOpen: boolean) {
    const dayGroup = this.getOpeningHoursGroup(day);
    dayGroup.patchValue({ isOpen });
    if (!isOpen) {
      dayGroup.patchValue({ isAllDay: false });
    }
  }

  protected isTimeDisabled(day: keyof OpeningHours): boolean {
    const dayGroup = this.getOpeningHoursGroup(day);
    const isOpen = dayGroup.get('isOpen')?.value as boolean;
    const isAllDay = dayGroup.get('isAllDay')?.value as boolean;
    return !isOpen || isAllDay;
  }

  protected getPriceRangeLabel(range: PriceRange): string {
    const map: Record<PriceRange, string> = {
      '$': '$ (Budget)',
      '$$': '$$ (Moderate)',
      '$$$': '$$$ (Premium)',
      '$$$$': '$$$$ (Luxury)'
    };
    return map[range];
  }

  protected async onSubmit() {
    if (this.restaurantForm.invalid) {
      this.restaurantForm.markAllAsTouched();
      return;
    }

    const rawValue = this.restaurantForm.getRawValue();
    const openingHours = this.transformOpeningHours(rawValue.openingHours as Record<keyof OpeningHours, DaySchedule>);

    try {
      this.isSubmitting.set(true);

      if (this.isEditMode()) {
        const restaurant = this.currentRestaurant();
        if (!restaurant) return;

        const updatePayload: UpdateRestaurantRequest = {
          name: rawValue.name,
          description: rawValue.description,
          email: rawValue.email,
          phone: rawValue.phone,
          address: rawValue.address,
          cuisine: rawValue.cuisine,
          priceRange: rawValue.priceRange,
          openingHours,
          features: rawValue.features
        };

        await this.restaurantService.updateRestaurant(restaurant.id, updatePayload);
        this.snackBar.open('Restaurant updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/restaurants', restaurant.id]);
      } else {
        const createPayload: CreateRestaurantRequest = {
          name: rawValue.name,
          description: rawValue.description,
          email: rawValue.email,
          phone: rawValue.phone,
          ownerId: rawValue.ownerId,
          address: rawValue.address,
          cuisine: rawValue.cuisine,
          priceRange: rawValue.priceRange,
          openingHours,
          features: rawValue.features
        };

        const restaurant = await this.restaurantService.createRestaurant(createPayload);
        this.snackBar.open('Restaurant created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/restaurants', restaurant.id]);
      }
    } catch (error) {
      this.snackBar.open('Failed to save restaurant. Please try again.', 'Close', { duration: 4000 });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async loadRestaurant(restaurantId: string) {
    try {
      const restaurant = await this.restaurantService.getRestaurantById(restaurantId);
      if (!restaurant) {
        this.snackBar.open('Restaurant not found', 'Close', { duration: 3000 });
        this.router.navigate(['/restaurants']);
        return;
      }

      this.currentRestaurant.set(restaurant);
      this.populateForm(restaurant);
    } catch (error) {
      this.snackBar.open('Failed to load restaurant. Please try again.', 'Close', { duration: 3000 });
      this.router.navigate(['/restaurants']);
    } finally {
      this.isInitializing.set(false);
    }
  }

  private populateForm(restaurant: Restaurant) {
    this.restaurantForm.patchValue({
      name: restaurant.name,
      description: restaurant.description,
      email: restaurant.email,
      phone: restaurant.phone,
      ownerId: restaurant.ownerId,
      priceRange: restaurant.priceRange,
      cuisine: restaurant.cuisine,
      features: restaurant.features,
      address: {
        street: restaurant.address.street,
        city: restaurant.address.city,
        state: restaurant.address.state,
        zipCode: restaurant.address.zipCode,
        country: restaurant.address.country,
        deliveryRadius: restaurant.address.deliveryRadius
      }
    });

    const openingHoursGroup = this.restaurantForm.controls.openingHours as FormGroup;
    (Object.keys(restaurant.openingHours) as Array<keyof OpeningHours>).forEach(day => {
      const schedule = restaurant.openingHours[day];
      const dayGroup = openingHoursGroup.get(day) as FormGroup;
      dayGroup.patchValue({
        isOpen: schedule.isOpen,
        isAllDay: schedule.isAllDay ?? false,
        openTime: schedule.openTime ?? '09:00',
        closeTime: schedule.closeTime ?? '21:00'
      });
    });

    this.restaurantForm.controls.ownerId.disable();
  }

  private buildDayScheduleGroup() {
    return this.fb.nonNullable.group({
      isOpen: true,
      openTime: '09:00',
      closeTime: '21:00',
      isAllDay: false
    });
  }

  private transformOpeningHours(
    openingHours: Record<keyof OpeningHours, DaySchedule>
  ): OpeningHours {
    const transformed: Partial<OpeningHours> = {};

    (Object.keys(openingHours) as Array<keyof OpeningHours>).forEach(day => {
      const schedule = openingHours[day];
      transformed[day as keyof OpeningHours] = {
        isOpen: schedule.isOpen,
        isAllDay: schedule.isAllDay,
        openTime: schedule.isOpen && !schedule.isAllDay ? schedule.openTime : undefined,
        closeTime: schedule.isOpen && !schedule.isAllDay ? schedule.closeTime : undefined
      } as DaySchedule;
    });

    return transformed as OpeningHours;
  }
}

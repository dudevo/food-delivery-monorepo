import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

import { UserService } from '../../../services/user.service';
import { User, CreateUserRequest, UpdateUserRequest, UserRole, UserStatus } from '../../../types/user.types';

@Component({
  selector: 'app-user-form',
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
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDividerModule
  ],
  template: `
    <div class="user-form-container">
      @if (userService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>{{ isEditMode() ? 'Loading user data...' : 'Saving user...' }}</p>
        </div>
      } @else {
        <div class="header">
          <button mat-button routerLink="/users" color="primary">
            <mat-icon>arrow_back</mat-icon>
            Back to Users
          </button>
          <h1>{{ isEditMode() ? 'Edit User' : 'Create New User' }}</h1>
        </div>

        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <mat-stepper orientation="vertical" #stepper>
            <!-- Step 1: Basic Information -->
            <mat-step [stepControl]="basicInfoForm" label="Basic Information">
              <mat-card>
                <mat-card-content>
                  <div class="form-grid">
                    <mat-form-field>
                      <mat-label>Full Name</mat-label>
                      <input matInput formControlName="name" placeholder="Enter full name">
                      @if (userForm.get('name')?.hasError('required') && userForm.get('name')?.touched) {
                        <mat-error>Name is required</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>Email</mat-label>
                      <input matInput type="email" formControlName="email" placeholder="Enter email address">
                      @if (userForm.get('email')?.hasError('required') && userForm.get('email')?.touched) {
                        <mat-error>Email is required</mat-error>
                      }
                      @if (userForm.get('email')?.hasError('email') && userForm.get('email')?.touched) {
                        <mat-error>Please enter a valid email</mat-error>
                      }
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>Phone (Optional)</mat-label>
                      <input matInput formControlName="phone" placeholder="Enter phone number">
                    </mat-form-field>

                    @if (!isEditMode()) {
                      <mat-form-field>
                        <mat-label>Password</mat-label>
                        <input matInput type="password" formControlName="password" placeholder="Enter password">
                        @if (userForm.get('password')?.hasError('required') && userForm.get('password')?.touched) {
                          <mat-error>Password is required</mat-error>
                        }
                        @if (userForm.get('password')?.hasError('minlength') && userForm.get('password')?.touched) {
                          <mat-error>Password must be at least 6 characters</mat-error>
                        }
                      </mat-form-field>
                    }
                  </div>

                  <div class="step-actions">
                    <button mat-raised-button matStepperNext color="primary" type="button">
                      Next
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </mat-step>

            <!-- Step 2: Role and Status -->
            <mat-step [stepControl]="roleStatusForm" label="Role & Status">
              <mat-card>
                <mat-card-content>
                  <div class="form-grid">
                    <mat-form-field>
                      <mat-label>Role</mat-label>
                      <mat-select formControlName="role">
                        <mat-option value="customer">Customer</mat-option>
                        <mat-option value="restaurant_owner">Restaurant Owner</mat-option>
                        <mat-option value="courier">Courier</mat-option>
                        <mat-option value="admin">Admin</mat-option>
                        <mat-option value="super_admin">Super Admin</mat-option>
                      </mat-select>
                      @if (userForm.get('role')?.hasError('required') && userForm.get('role')?.touched) {
                        <mat-error>Role is required</mat-error>
                      }
                    </mat-form-field>

                    @if (isEditMode()) {
                      <mat-form-field>
                        <mat-label>Status</mat-label>
                        <mat-select formControlName="status">
                          <mat-option value="active">Active</mat-option>
                          <mat-option value="inactive">Inactive</mat-option>
                          <mat-option value="suspended">Suspended</mat-option>
                          <mat-option value="pending_verification">Pending Verification</mat-option>
                        </mat-select>
                      </mat-form-field>
                    }
                  </div>

                  <div class="role-description">
                    <h4>Role Permissions:</h4>
                    <div [ngSwitch]="userForm.get('role')?.value">
                      <p *ngSwitchCase="'customer'">
                        <mat-icon>info</mat-icon>
                        Can place orders, manage profile, and leave reviews.
                      </p>
                      <p *ngSwitchCase="'restaurant_owner'">
                        <mat-icon>info</mat-icon>
                        Can manage restaurant profile, menu items, and view orders.
                      </p>
                      <p *ngSwitchCase="'courier'">
                        <mat-icon>info</mat-icon>
                        Can accept and deliver orders, update delivery status.
                      </p>
                      <p *ngSwitchCase="'admin'">
                        <mat-icon>info</mat-icon>
                        Can manage users, view analytics, and moderate content.
                      </p>
                      <p *ngSwitchCase="'super_admin'">
                        <mat-icon>info</mat-icon>
                        Full system access including user management and system settings.
                      </p>
                      <p *ngSwitchDefault>
                        <mat-icon>info</mat-icon>
                        Please select a role to see permissions.
                      </p>
                    </div>
                  </div>

                  <div class="step-actions">
                    <button mat-button matStepperPrevious type="button">
                      Previous
                    </button>
                    <button mat-raised-button matStepperNext color="primary" type="button">
                      Next
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </mat-step>

            <!-- Step 3: Address (Optional) -->
            <mat-step [stepControl]="addressForm" label="Address (Optional)">
              <mat-card>
                <mat-card-content>
                  <div formGroupName="address" class="form-grid">
                    <mat-form-field class="full-width">
                      <mat-label>Street Address</mat-label>
                      <input matInput formControlName="street" placeholder="Enter street address">
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>City</mat-label>
                      <input matInput formControlName="city" placeholder="Enter city">
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>State</mat-label>
                      <input matInput formControlName="state" placeholder="Enter state">
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>ZIP Code</mat-label>
                      <input matInput formControlName="zipCode" placeholder="Enter ZIP code">
                    </mat-form-field>

                    <mat-form-field>
                      <mat-label>Country</mat-label>
                      <input matInput formControlName="country" placeholder="Enter country">
                    </mat-form-field>
                  </div>

                  <div class="step-actions">
                    <button mat-button matStepperPrevious type="button">
                      Previous
                    </button>
                    <button mat-raised-button matStepperNext color="primary" type="button">
                      Review
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </mat-step>

            <!-- Step 4: Review -->
            <mat-step label="Review & Submit">
              <mat-card>
                <mat-card-content>
                  <h3>Review User Information</h3>
                  <mat-divider></mat-divider>

                  <div class="review-section">
                    <h4>Basic Information</h4>
                    <div class="review-item">
                      <strong>Name:</strong> {{ userForm.get('name')?.value }}
                    </div>
                    <div class="review-item">
                      <strong>Email:</strong> {{ userForm.get('email')?.value }}
                    </div>
                    <div class="review-item">
                      <strong>Phone:</strong> {{ userForm.get('phone')?.value || 'Not provided' }}
                    </div>
                  </div>

                  <div class="review-section">
                    <h4>Role & Status</h4>
                    <div class="review-item">
                      <strong>Role:</strong> {{ getRoleDisplayName(userForm.get('role')?.value) }}
                    </div>
                    @if (isEditMode()) {
                      <div class="review-item">
                        <strong>Status:</strong> {{ getStatusDisplayName(userForm.get('status')?.value) }}
                      </div>
                    }
                  </div>

                  @if (hasAddressData()) {
                    <div class="review-section">
                      <h4>Address</h4>
                      <div class="review-item">
                        <strong>Street:</strong> {{ userForm.get('address.street')?.value }}
                      </div>
                      <div class="review-item">
                        <strong>City:</strong> {{ userForm.get('address.city')?.value }}
                      </div>
                      <div class="review-item">
                        <strong>State:</strong> {{ userForm.get('address.state')?.value }}
                      </div>
                      <div class="review-item">
                        <strong>ZIP:</strong> {{ userForm.get('address.zipCode')?.value }}
                      </div>
                      <div class="review-item">
                        <strong>Country:</strong> {{ userForm.get('address.country')?.value }}
                      </div>
                    </div>
                  }

                  <div class="step-actions">
                    <button mat-button matStepperPrevious type="button">
                      Previous
                    </button>
                    <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">
                      <mat-icon>{{ isEditMode() ? 'save' : 'person_add' }}</mat-icon>
                      {{ isEditMode() ? 'Update User' : 'Create User' }}
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </mat-step>
          </mat-stepper>
        </form>
      }
    </div>
  `,
  styles: [`
    .user-form-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      gap: 16px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .step-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .role-description {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin-top: 16px;
    }

    .role-description h4 {
      margin: 0 0 8px 0;
    }

    .role-description p {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .review-section {
      margin: 24px 0;
    }

    .review-section h4 {
      margin: 0 0 16px 0;
      color: #666;
    }

    .review-item {
      margin: 8px 0;
      display: flex;
      gap: 8px;
    }

    .review-item strong {
      min-width: 80px;
    }

    mat-stepper {
      background: transparent;
    }
  `]
})
export class UserFormComponent implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  protected userForm: FormGroup;
  protected isEditMode = signal(false);
  protected userId = signal<string | null>(null);

  protected basicInfoForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['']
  });

  protected roleStatusForm = this.fb.group({
    role: ['customer', Validators.required],
    status: ['active']
  });

  protected addressForm = this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    country: ['']
  });

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: [''],
      role: ['customer', Validators.required],
      status: ['active'],
      address: this.addressForm
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    const isEdit = this.route.snapshot.url.some(segment => segment.path === 'edit');

    if (userId && isEdit) {
      this.isEditMode.set(true);
      this.userId.set(userId);
      this.loadUser(userId);
      this.userForm.get('password')?.clearValidators();
    } else {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }

    this.userForm.get('password')?.updateValueAndValidity();
  }

  private async loadUser(userId: string) {
    try {
      const userObservable = this.userService.getUserById(userId);
      const user = await firstValueFrom(userObservable);
      
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    } catch (error) {
      this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
    }
  }

  protected async onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      try {
        if (this.isEditMode()) {
          const updateData: UpdateUserRequest = {
            name: formValue.name,
            email: formValue.email,
            phone: formValue.phone,
            role: formValue.role,
            status: formValue.status
          };

          if (this.hasAddressData()) {
            updateData.address = formValue.address;
          }

          await this.userService.updateUser(this.userId()!, updateData);
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        } else {
          const createData: CreateUserRequest = {
            name: formValue.name,
            email: formValue.email,
            phone: formValue.phone,
            role: formValue.role,
            password: formValue.password
          };

          if (this.hasAddressData()) {
            createData.address = formValue.address;
          }

          await this.userService.createUser(createData);
          this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
        }

        this.router.navigate(['/users']);
      } catch (error) {
        this.snackBar.open(
          `Failed to ${this.isEditMode() ? 'update' : 'create'} user`,
          'Close',
          { duration: 3000 }
        );
      }
    }
  }

  protected hasAddressData(): boolean {
    const address = this.userForm.get('address')?.value;
    return address && (address.street || address.city || address.state || address.zipCode || address.country);
  }

  protected getRoleDisplayName(role: UserRole): string {
    return this.userService.getRoleDisplayName(role);
  }

  protected getStatusDisplayName(status: UserStatus): string {
    return this.userService.getStatusDisplayName(status);
  }
}
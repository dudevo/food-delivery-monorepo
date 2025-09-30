import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RestaurantService } from '../../../services/restaurant.service';
import {
  Restaurant,
  VerificationStatus,
  DocumentType,
  DocumentVerificationStatus
} from '../../../types/restaurant.types';

@Component({
  selector: 'app-restaurant-verification',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="verification-detail-container">
      @if (restaurantService.isLoading() && !restaurant()) {
        <div class="loading">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading restaurant data...</p>
        </div>
      } @else if (!restaurant()) {
        <div class="error-state">
          <mat-icon>error</mat-icon>
          <h2>Restaurant not found</h2>
          <p>The requested restaurant could not be located.</p>
          <button mat-raised-button color="primary" routerLink="/restaurants/verification">
            Back to Verification Queue
          </button>
        </div>
      } @else {
        <div class="header">
          <div class="header-actions">
            <button mat-button routerLink="/restaurants/verification">
              <mat-icon>arrow_back</mat-icon>
              Back to Queue
            </button>
            <button mat-button [routerLink]="['/restaurants', restaurant()!.id]">
              <mat-icon>visibility</mat-icon>
              View Details
            </button>
          </div>
          <div class="status-chips">
            <mat-chip [color]="restaurantService.getStatusColor(restaurant()!.status)">
              {{ restaurantService.getStatusDisplayName(restaurant()!.status) }}
            </mat-chip>
            <mat-chip [color]="restaurantService.getVerificationStatusColor(restaurant()!.verificationStatus)">
              {{ restaurantService.getVerificationStatusDisplayName(restaurant()!.verificationStatus) }}
            </mat-chip>
          </div>
        </div>

        <div class="layout">
          <div class="main-column">
            <mat-card>
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>assignment</mat-icon>
                  Verification Decision
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="verificationForm" (ngSubmit)="onSubmit()" class="verification-form">
                  <mat-form-field>
                    <mat-label>Verification Status</mat-label>
                    <mat-select formControlName="status">
                      <mat-option *ngFor="let option of statusOptions" [value]="option.value">
                        {{ option.label }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Reviewer Notes</mat-label>
                    <textarea matInput formControlName="notes" rows="4" placeholder="Add context for this decision"></textarea>
                  </mat-form-field>

                  <mat-form-field *ngIf="verificationForm.get('status')?.value === 'additional_info_required'">
                    <mat-label>Request Additional Documents</mat-label>
                    <mat-select formControlName="requiredDocuments" multiple>
                      <mat-option *ngFor="let doc of documentOptions" [value]="doc">
                        {{ restaurantService.getDocumentTypeDisplayName(doc) }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>

                  <div class="form-actions">
                    <button mat-button type="button" routerLink="/restaurants/verification" [disabled]="isSubmitting()">
                      Cancel
                    </button>
                    <button mat-raised-button color="primary" type="submit" [disabled]="verificationForm.invalid || isSubmitting()">
                      <mat-icon>save</mat-icon>
                      Save Decision
                    </button>
                  </div>
                </form>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>description</mat-icon>
                  Submitted Documents
                  <span class="badge" [class.warn]="hasPendingDocuments()">{{ restaurant()!.documents.length }}</span>
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                @if (restaurant()!.documents.length === 0) {
                  <p class="no-docs">No documents uploaded.</p>
                } @else {
                  <mat-list>
                    <mat-list-item *ngFor="let document of restaurant()!.documents" class="document-item">
                      <mat-icon matListItemIcon>folder</mat-icon>
                        <div matListItemTitle>{{ restaurantService.getDocumentTypeDisplayName(document.type) }}</div>
                      <div matListItemLine>Uploaded {{ document.uploadedAt | date:'medium' }}</div>
                      <div class="doc-actions" matListItemMeta>
                        <mat-chip [color]="restaurantService.getDocumentStatusColor(document.verificationStatus)">
                          {{ restaurantService.getDocumentStatusDisplayName(document.verificationStatus) }}
                        </mat-chip>
                        <button mat-icon-button color="primary"
                                (click)="approveDocument(document.id)"
                                [disabled]="documentActionInProgress() === document.id">
                          <mat-icon>thumb_up</mat-icon>
                        </button>
                        <button mat-icon-button color="warn"
                                (click)="rejectDocument(document.id)"
                                [disabled]="documentActionInProgress() === document.id">
                          <mat-icon>thumb_down</mat-icon>
                        </button>
                      </div>
                    </mat-list-item>
                  </mat-list>
                }
              </mat-card-content>
            </mat-card>
          </div>

          <div class="side-column">
            <mat-card>
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>store</mat-icon>
                  Restaurant Overview
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <h2 class="restaurant-name">{{ restaurant()!.name }}</h2>
                <p class="restaurant-description">{{ restaurant()!.description }}</p>

                <mat-divider></mat-divider>

                <div class="info-section">
                  <h4>Contact</h4>
                  <p><mat-icon>person</mat-icon> {{ restaurant()!.ownerName }}</p>
                  <p><mat-icon>email</mat-icon> {{ restaurant()!.email }}</p>
                  <p><mat-icon>call</mat-icon> {{ restaurant()!.phone }}</p>
                </div>

                <mat-divider></mat-divider>

                <div class="info-section">
                  <h4>Address</h4>
                  <p>{{ restaurant()!.address.street }}</p>
                  <p>{{ restaurant()!.address.city }}, {{ restaurant()!.address.state }} {{ restaurant()!.address.zipCode }}</p>
                  <p>{{ restaurant()!.address.country }}</p>
                </div>

                <mat-divider></mat-divider>

                <div class="info-section">
                  <h4>Cuisine</h4>
                  <div class="chip-row">
                    <mat-chip *ngFor="let cuisine of restaurant()!.cuisine">
                      {{ restaurantService.getCuisineDisplayName(cuisine) }}
                    </mat-chip>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="info-section">
                  <h4>Features</h4>
                  <div class="chip-row">
                    <mat-chip *ngFor="let feature of restaurant()!.features" color="accent">
                      {{ restaurantService.getFeatureDisplayName(feature) }}
                    </mat-chip>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .verification-detail-container {
      padding: 24px;
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .loading,
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px 0;
      text-align: center;
    }

    .error-state mat-icon {
      font-size: 48px;
      color: #f44336;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .status-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      align-items: flex-start;
    }

    .verification-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .badge {
      margin-left: auto;
      font-size: 12px;
      background-color: #e0e0e0;
      border-radius: 12px;
      padding: 2px 8px;
    }

    .badge.warn {
      background-color: #ffe082;
    }

    .no-docs {
      margin: 0;
      color: #777;
      font-style: italic;
    }

    .document-item {
      border-bottom: 1px solid #eee;
    }

    .doc-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .restaurant-name {
      margin: 0 0 8px 0;
      font-size: 22px;
    }

    .restaurant-description {
      margin: 0 0 16px 0;
      color: #666;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 16px 0;
    }

    .info-section h4 {
      margin: 0;
      font-size: 15px;
    }

    .info-section p {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #555;
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    @media (max-width: 1024px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RestaurantVerificationComponent implements OnInit {
  protected readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  protected restaurant = signal<Restaurant | null>(null);
  protected readonly verificationForm = this.fb.group({
    status: ['pending' as VerificationStatus, Validators.required],
    notes: [''],
    requiredDocuments: [[] as DocumentType[]]
  });

  protected readonly statusOptions: { value: VerificationStatus; label: string }[] = [
    { value: 'pending', label: 'Pending Review' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'additional_info_required', label: 'Needs Additional Info' },
    { value: 'verified', label: 'Verified' },
    { value: 'rejected', label: 'Rejected' }
  ];

  protected readonly documentOptions: DocumentType[] = [
    'business_license',
    'food_safety_certificate',
    'tax_certificate',
    'insurance_certificate',
    'identity_proof',
    'other'
  ];

  protected readonly isSubmitting = signal(false);
  protected readonly documentActionInProgress = signal<string | null>(null);

  ngOnInit() {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (!restaurantId) {
      this.router.navigate(['/restaurants/verification']);
      return;
    }

    this.loadRestaurant(restaurantId);
  }

  protected hasPendingDocuments(): boolean {
    const current = this.restaurant();
    if (!current) return false;
    return current.documents.some(doc => doc.verificationStatus === 'pending' || doc.verificationStatus === 'rejected');
  }

  protected async approveDocument(documentId: string) {
    await this.updateDocumentStatus(documentId, 'approved');
  }

  protected async rejectDocument(documentId: string) {
    const reason = prompt('Provide a reason for rejecting this document (optional):');
    await this.updateDocumentStatus(documentId, 'rejected', reason ?? undefined);
  }

  protected async onSubmit() {
    if (this.verificationForm.invalid || !this.restaurant()) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    const { status, notes, requiredDocuments } = this.verificationForm.getRawValue();

    try {
      this.isSubmitting.set(true);
      await this.restaurantService.verifyRestaurant({
        restaurantId: this.restaurant()!.id,
        status: status!,
        notes: notes || undefined,
        requiredDocuments: requiredDocuments && requiredDocuments.length > 0 ? requiredDocuments : undefined
      });
      this.snackBar.open('Verification decision saved', 'Close', { duration: 3000 });
      this.router.navigate(['/restaurants/verification']);
    } catch (error) {
      this.snackBar.open('Failed to save verification decision', 'Close', { duration: 3000 });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async updateDocumentStatus(
    documentId: string,
    status: DocumentVerificationStatus,
    rejectionReason?: string
  ) {
    const restaurant = this.restaurant();
    if (!restaurant) return;

    try {
      this.documentActionInProgress.set(documentId);
      await this.restaurantService.verifyDocument({ documentId, status, rejectionReason });
      this.snackBar.open('Document status updated', 'Close', { duration: 3000 });
      await this.loadRestaurant(restaurant.id, { preserveNotes: true });
    } catch (error) {
      this.snackBar.open('Failed to update document status', 'Close', { duration: 3000 });
    } finally {
      this.documentActionInProgress.set(null);
    }
  }

  private async loadRestaurant(restaurantId: string, options?: { preserveNotes?: boolean }) {
    const previousNotes = options?.preserveNotes ? this.verificationForm.get('notes')?.value ?? '' : '';
    const previousRequiredDocs = options?.preserveNotes ? this.verificationForm.get('requiredDocuments')?.value ?? [] : [];

    try {
      const restaurant = await this.restaurantService.getRestaurantById(restaurantId);
      if (!restaurant) {
        this.snackBar.open('Restaurant not found', 'Close', { duration: 3000 });
        this.router.navigate(['/restaurants/verification']);
        return;
      }

      this.restaurant.set(restaurant);
      this.verificationForm.patchValue({
        status: restaurant.verificationStatus,
        notes: previousNotes,
        requiredDocuments: previousRequiredDocs
      });
    } catch (error) {
      this.snackBar.open('Failed to load restaurant', 'Close', { duration: 3000 });
      this.router.navigate(['/restaurants/verification']);
    }
  }
}

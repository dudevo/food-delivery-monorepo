import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: Date;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  restaurant: {
    name: string;
    address: string;
    phone: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  courier?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="order-detail-container">
      <div class="header">
        <button mat-icon-button routerLink="/orders">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Order Details - {{ order().orderNumber }}</h1>
      </div>

      <div class="content-grid">
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>Order Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-row">
              <span class="label">Order Number:</span>
              <span class="value">{{ order().orderNumber }}</span>
            </div>
            <div class="info-row">
              <span class="label">Status:</span>
              <mat-chip [class]="'status-' + order().status">{{ order().status | titlecase }}</mat-chip>
            </div>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">{{ order().createdAt | date:'medium' }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>Customer</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-row">
              <mat-icon>person</mat-icon>
              <span>{{ order().customer.name }}</span>
            </div>
            <div class="info-row">
              <mat-icon>email</mat-icon>
              <span>{{ order().customer.email }}</span>
            </div>
            <div class="info-row">
              <mat-icon>phone</mat-icon>
              <span>{{ order().customer.phone }}</span>
            </div>
            <div class="info-row">
              <mat-icon>location_on</mat-icon>
              <span>{{ order().customer.address }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>Restaurant</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-row">
              <mat-icon>restaurant</mat-icon>
              <span>{{ order().restaurant.name }}</span>
            </div>
            <div class="info-row">
              <mat-icon>location_on</mat-icon>
              <span>{{ order().restaurant.address }}</span>
            </div>
            <div class="info-row">
              <mat-icon>phone</mat-icon>
              <span>{{ order().restaurant.phone }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        @if (order().courier) {
          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>Courier</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-row">
                <mat-icon>delivery_dining</mat-icon>
                <span>{{ order().courier!.name }}</span>
              </div>
              <div class="info-row">
                <mat-icon>phone</mat-icon>
                <span>{{ order().courier!.phone }}</span>
              </div>
              <div class="info-row">
                <mat-icon>two_wheeler</mat-icon>
                <span>{{ order().courier!.vehicle }}</span>
              </div>
            </mat-card-content>
          </mat-card>
        }

        <mat-card class="items-card">
          <mat-card-header>
            <mat-card-title>Order Items</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            @for (item of order().items; track item.name) {
              <div class="item-row">
                <span class="item-quantity">{{ item.quantity }}x</span>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-price">\${{ item.price.toFixed(2) }}</span>
              </div>
            }
            <mat-divider></mat-divider>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>\${{ order().subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Delivery Fee</span>
              <span>\${{ order().deliveryFee.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax</span>
              <span>\${{ order().tax.toFixed(2) }}</span>
            </div>
            <mat-divider></mat-divider>
            <div class="summary-row total">
              <span>Total</span>
              <span>\${{ order().total.toFixed(2) }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .order-detail-container {
      padding: 24px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .info-card, .items-card {
      height: fit-content;
    }

    .items-card {
      grid-column: 1 / -1;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }

    .info-row .label {
      font-weight: 500;
      min-width: 120px;
    }

    .info-row mat-icon {
      color: #666;
    }

    .item-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
    }

    .item-quantity {
      font-weight: 500;
      min-width: 40px;
    }

    .item-name {
      flex: 1;
    }

    .item-price {
      font-weight: 500;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
    }

    .summary-row.total {
      font-size: 18px;
      font-weight: 600;
      color: #1976d2;
    }

    mat-divider {
      margin: 8px 0;
    }

    mat-chip {
      font-size: 12px;
      min-height: 24px;
    }

    .status-pending { background-color: #fff3cd; color: #856404; }
    .status-confirmed { background-color: #cfe2ff; color: #084298; }
    .status-preparing { background-color: #e7f3ff; color: #0066cc; }
    .status-ready { background-color: #d1e7dd; color: #0f5132; }
    .status-in_transit { background-color: #cff4fc; color: #055160; }
    .status-delivered { background-color: #d1e7dd; color: #0a3622; }
    .status-cancelled { background-color: #f8d7da; color: #842029; }
  `]
})
export class OrderDetailComponent {
  order = signal<OrderDetail>({
    id: '1',
    orderNumber: 'ORD-001',
    status: 'delivered',
    createdAt: new Date('2025-09-30T10:30:00'),
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B, New York, NY 10001'
    },
    restaurant: {
      name: 'Pizza Palace',
      address: '456 Restaurant Ave, New York, NY 10002',
      phone: '+1 (555) 987-6543'
    },
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 15.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { name: 'Garlic Bread', quantity: 1, price: 5.99 }
    ],
    subtotal: 40.97,
    deliveryFee: 3.99,
    tax: 4.03,
    total: 48.99,
    courier: {
      name: 'Mike Courier',
      phone: '+1 (555) 456-7890',
      vehicle: 'Motorcycle - ABC123'
    }
  });

  constructor(private route: ActivatedRoute) {}
}

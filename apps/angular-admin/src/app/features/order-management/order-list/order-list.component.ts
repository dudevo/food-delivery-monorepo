import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  restaurant: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: Date;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="order-list-container">
      <div class="header">
        <h1>Order Management</h1>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput placeholder="Order number, customer, restaurant...">
          <mat-icon matPrefix>search</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select>
            <mat-option value="all">All Status</mat-option>
            <mat-option value="pending">Pending</mat-option>
            <mat-option value="confirmed">Confirmed</mat-option>
            <mat-option value="preparing">Preparing</mat-option>
            <mat-option value="ready">Ready</mat-option>
            <mat-option value="in_transit">In Transit</mat-option>
            <mat-option value="delivered">Delivered</mat-option>
            <mat-option value="cancelled">Cancelled</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="orders()" class="orders-table">
          <ng-container matColumnDef="orderNumber">
            <th mat-header-cell *matHeaderCellDef>Order #</th>
            <td mat-cell *matCellDef="let order">{{ order.orderNumber }}</td>
          </ng-container>

          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let order">{{ order.customer }}</td>
          </ng-container>

          <ng-container matColumnDef="restaurant">
            <th mat-header-cell *matHeaderCellDef>Restaurant</th>
            <td mat-cell *matCellDef="let order">{{ order.restaurant }}</td>
          </ng-container>

          <ng-container matColumnDef="items">
            <th mat-header-cell *matHeaderCellDef>Items</th>
            <td mat-cell *matCellDef="let order">{{ order.items }}</td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let order">\${{ order.total.toFixed(2) }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let order">
              <mat-chip [class]="'status-' + order.status">
                {{ order.status | titlecase }}
              </mat-chip>
            </td>
          </ng-container>

          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let order">{{ order.createdAt | date:'short' }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let order">
              <button mat-icon-button [routerLink]="['/orders', order.id]">
                <mat-icon>visibility</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .order-list-container {
      padding: 24px;
    }

    .header {
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    .filters mat-form-field {
      flex: 1;
      max-width: 300px;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .orders-table {
      width: 100%;
    }

    .mat-mdc-cell, .mat-mdc-header-cell {
      padding: 16px;
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
export class OrderListComponent {
  displayedColumns = ['orderNumber', 'customer', 'restaurant', 'items', 'total', 'status', 'createdAt', 'actions'];

  orders = signal<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      restaurant: 'Pizza Palace',
      items: 3,
      total: 45.99,
      status: 'delivered',
      createdAt: new Date('2025-09-30T10:30:00')
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      restaurant: 'Burger House',
      items: 2,
      total: 28.50,
      status: 'in_transit',
      createdAt: new Date('2025-09-30T11:15:00')
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customer: 'Bob Johnson',
      restaurant: 'Sushi World',
      items: 5,
      total: 67.25,
      status: 'preparing',
      createdAt: new Date('2025-09-30T11:45:00')
    }
  ]);
}

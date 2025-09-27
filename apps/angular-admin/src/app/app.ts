import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

// Store Import
import { AdminStore } from './store/admin.store';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Food Delivery Admin');
  protected readonly store = inject(AdminStore);
  protected readonly isSidenavOpen = signal(true);
  
  ngOnInit() {
    // Load initial data when the app starts
    this.store.loadInitialData();
  }
  
  protected toggleSidenav() {
    this.isSidenavOpen.update(value => !value);
  }
  
  protected selectMenuItem(menuItem: string) {
    this.store.setSelectedMenuItem(menuItem);
  }
  
  protected logout() {
    this.store.logoutUser();
  }
}

import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Store Import
import { AdminStore } from './store/admin.store';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Food Delivery Admin');
  protected readonly store = inject(AdminStore);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly isSidenavOpen = signal(true);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    // Load initial data when the app starts
    this.store.loadInitialData();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        const [, firstSegment = 'dashboard'] = event.urlAfterRedirects.split('/');
        this.store.setSelectedMenuItem(firstSegment || 'dashboard');
      });
  }

  protected toggleSidenav() {
    this.isSidenavOpen.update(value => !value);
  }

  protected selectMenuItem(menuItem: string) {
    this.store.setSelectedMenuItem(menuItem);
    // Navigate to the appropriate route
    this.router.navigate([`/${menuItem}`]);
  }

  protected logout() {
    this.authService.logout();
  }

  // Helper to check if current route is login/register
  protected isAuthRoute(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/register');
  }
}

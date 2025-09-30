import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./features/restaurant-management/restaurant-management.routes').then(m => m.restaurantManagementRoutes)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/user-management/user-management.routes').then(m => m.userManagementRoutes)
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/order-management/order-management.routes').then(m => m.orderManagementRoutes)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.analyticsRoutes)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    canActivate: [PublicGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
    canActivate: [PublicGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./features/restaurant-management/restaurant-management.routes').then(m => m.restaurantManagementRoutes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/user-management/user-management.routes').then(m => m.userManagementRoutes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/order-management/order-management.routes').then(m => m.orderManagementRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.analyticsRoutes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

import { Routes } from '@angular/router';

export const restaurantManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./restaurant-form/restaurant-form.component').then(m => m.RestaurantFormComponent)
  },
  {
    path: 'verification',
    loadComponent: () => import('./verification-queue/verification-queue.component').then(m => m.VerificationQueueComponent)
  },
  {
    path: ':id/verify',
    loadComponent: () => import('./restaurant-verification/restaurant-verification.component').then(m => m.RestaurantVerificationComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./restaurant-form/restaurant-form.component').then(m => m.RestaurantFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent)
  }
];

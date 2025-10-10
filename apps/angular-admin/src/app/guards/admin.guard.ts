import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  canActivate(): boolean {
    console.log('AdminGuard activated');
    const isAuth = this.authService.isAuthenticatedSignal();
    console.log('Is authenticated:', isAuth);
    
    if (!isAuth) {
      console.log('Not authenticated, redirecting to dashboard');
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    const isAdmin = this.authService.isAdmin();
    console.log('Is admin:', isAdmin);
    
    if (!isAdmin) {
      console.log('Not admin, redirecting to dashboard');
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    console.log('AdminGuard: Access granted');
    return true;
  }
}
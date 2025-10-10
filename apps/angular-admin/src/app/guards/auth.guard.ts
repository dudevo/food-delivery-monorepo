import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  canActivate(): boolean {
    if (this.authService.isAuthenticatedSignal()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
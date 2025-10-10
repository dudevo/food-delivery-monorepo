import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  canActivate(): boolean {
    if (this.authService.isAuthenticatedSignal()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
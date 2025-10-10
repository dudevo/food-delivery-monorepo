import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    // Skip token for auth endpoints
    const isAuthEndpoint = request.url.includes('/auth/login') || 
                          request.url.includes('/auth/register');
    
    if (token && !isAuthEndpoint) {
      console.log('Adding auth token to request:', request.url);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.log('No token added to request:', request.url, 'Token present:', !!token, 'Is auth endpoint:', isAuthEndpoint);
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('HTTP Error:', error.status, error.url, error.error);
        if (error.status === 401) {
          // Token expired or invalid
          console.log('401 Unauthorized - logging out');
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
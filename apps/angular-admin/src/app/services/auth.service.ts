import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, tap, catchError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { environment } from '../../environments/environment';

import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'access_token';
  
  // BehaviorSubjects for state management
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(true); // Start with true for initial load
  private errorSubject = new BehaviorSubject<string | null>(null);
  
  // Signals for reactive UI
  public readonly currentUser = toSignal(this.currentUserSubject, { initialValue: null });
  public readonly isLoading = toSignal(this.isLoadingSubject, { initialValue: false });
  public readonly error = toSignal(this.errorSubject, { initialValue: null });
  public readonly isAuthenticatedSignal = signal<boolean>(false);
  
  // Public observables (keeping for backward compatibility)
  public readonly currentUser$ = this.currentUserSubject.asObservable();
  public readonly isLoading$ = this.isLoadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();
  
  // Helper methods to get current values
  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  public getLoading(): boolean {
    return this.isLoadingSubject.value;
  }
  
  public getError(): string | null {
    return this.errorSubject.value;
  }
  
  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  public isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    const userRole = user?.role;
    console.log('Admin check - User role:', userRole, 'User:', user);
    
    // Only allow true admins to access the admin panel
    const isAdminRole = userRole === 'ADMIN' || 
                       userRole === 'admin';
    
    console.log('Admin check result:', isAdminRole);
    return isAdminRole;
  }
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }
  
  private initializeAuth(): void {
    console.log('Initializing auth...');
    const token = this.getToken();
    console.log('Token present:', !!token);
    if (token) {
      this.loadUserProfile();
    } else {
      console.log('No token found, setting authenticated to false');
      this.isAuthenticatedSignal.set(false);
      this.isLoadingSubject.next(false);
    }
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    console.log('Attempting login with:', credentials.email);
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);
    
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('Login response received:', response);
        this.setToken(response.access_token);
        console.log('User data from backend:', response.user);
        this.currentUserSubject.next(response.user);
        this.isAuthenticatedSignal.set(true);
        this.isLoadingSubject.next(false);
        console.log('Login successful, user set:', response.user);
        console.log('User role check - is admin?', this.isAdmin());
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        this.isLoadingSubject.next(false);
        const errorMessage = error.error?.message || 'Login failed';
        this.errorSubject.next(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
  
  register(userData: RegisterRequest): Observable<any> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);
    
    return this.http.post(`${this.API_URL}/auth/register/admin`, userData).pipe(
      tap(() => {
        this.isLoadingSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoadingSubject.next(false);
        const errorMessage = error.error?.message || 'Registration failed';
        this.errorSubject.next(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
  
  logout(): void {
    console.log('Logging out...');
    this.removeToken();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
  
  private loadUserProfile(): void {
    console.log('Loading user profile...');
    try {
      const token = this.getToken();
      if (token) {
        const payload = this.decodeToken(token);
        console.log('Decoded token payload:', payload);
        
        const user: User = {
          id: payload.sub || payload.id,
          email: payload.email,
          firstName: payload.firstName || payload.given_name || 'Admin',
          lastName: payload.lastName || payload.family_name || 'User',
          role: payload.role || 'admin',
          status: payload.status || 'ACTIVE',
          createdAt: new Date(payload.createdAt || Date.now()),
          updatedAt: new Date(payload.updatedAt || Date.now())
        };
        
        console.log('Setting user:', user);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSignal.set(true);
      } else {
        this.isAuthenticatedSignal.set(false);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      this.removeToken();
      this.isAuthenticatedSignal.set(false);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }
  
  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (error) {
      return true; // If we can't decode it, consider it expired
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Token retrieved from localStorage:', token ? 'Present' : 'Missing');
    if (token) {
      console.log('Token first 50 chars:', token.substring(0, 50));
      try {
        const payload = this.decodeToken(token);
        console.log('Token payload:', payload);
        console.log('Token expired?', this.isTokenExpired(token));
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
    return token;
  }
  
  private setToken(token: string): void {
    console.log('Storing token to localStorage');
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  private removeToken(): void {
    console.log('Removing token from localStorage');
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
  clearError(): void {
    this.errorSubject.next(null);
  }
}
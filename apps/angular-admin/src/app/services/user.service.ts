import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilters,
  UserListResponse,
  UserRole,
  UserStatus
} from '../types/user.types';

interface BackendUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
}

interface BackendUsersListResponse {
  users: BackendUserResponse[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;
  private users = signal<User[]>([]);
  private loading = signal(false);

  constructor(private http: HttpClient) {}

  // Convert backend user to frontend user format
  private convertBackendUser(backendUser: BackendUserResponse): User {
    return {
      id: backendUser.id,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      name: `${backendUser.firstName} ${backendUser.lastName}`,
      email: backendUser.email,
      phone: backendUser.phone,
      role: backendUser.role as UserRole,
      status: backendUser.status as UserStatus,
      createdAt: new Date(backendUser.createdAt),
      updatedAt: new Date(backendUser.updatedAt),
      lastLoginAt: backendUser.lastLoginAt ? new Date(backendUser.lastLoginAt) : undefined
    };
  }

  getUsers(filters?: UserFilters): Observable<UserListResponse> {
    this.loading.set(true);
    
    let params = new HttpParams();
    if (filters) {
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());
      if (filters.role) params = params.set('role', filters.role);
      if (filters.status) params = params.set('status', filters.status);
      if (filters.search) params = params.set('search', filters.search);
    }

    return this.http.get<BackendUsersListResponse>(`${this.API_URL}/users`, { params }).pipe(
      tap(response => {
        const frontendUsers = response.users.map(user => this.convertBackendUser(user));
        this.users.set(frontendUsers);
        this.loading.set(false);
      }),
      map(response => ({
        users: response.users.map(user => this.convertBackendUser(user)),
        total: response.total,
        page: response.page,
        limit: response.limit
      })),
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<BackendUserResponse>(`${this.API_URL}/users/${id}`).pipe(
      map(user => this.convertBackendUser(user)),
      tap(user => {
        // Update user in the list if exists
        const currentUsers = this.users();
        const index = currentUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          const updatedUsers = [...currentUsers];
          updatedUsers[index] = user;
          this.users.set(updatedUsers);
        }
      }),
      catchError(this.handleError)
    );
  }

  updateUser(id: string, updateData: UpdateUserRequest): Observable<User> {
    return this.http.put<BackendUserResponse>(`${this.API_URL}/users/${id}`, updateData).pipe(
      map(user => this.convertBackendUser(user)),
      tap(updatedUser => {
        // Update user in the list
        const currentUsers = this.users();
        const index = currentUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          const updatedUsers = [...currentUsers];
          updatedUsers[index] = updatedUser;
          this.users.set(updatedUsers);
        }
      }),
      catchError(this.handleError)
    );
  }

  updateUserStatus(id: string, status: UserStatus): Observable<User> {
    return this.http.put<BackendUserResponse>(`${this.API_URL}/users/${id}/status`, { status }).pipe(
      map(user => this.convertBackendUser(user)),
      tap(updatedUser => {
        // Update user in the list
        const currentUsers = this.users();
        const index = currentUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          const updatedUsers = [...currentUsers];
          updatedUsers[index] = updatedUser;
          this.users.set(updatedUsers);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Alias for backward compatibility
  changeUserStatus(id: string, status: UserStatus): Observable<User> {
    return this.updateUserStatus(id, status);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${id}`).pipe(
      tap(() => {
        // Remove user from the list
        const currentUsers = this.users();
        const updatedUsers = currentUsers.filter(u => u.id !== id);
        this.users.set(updatedUsers);
      }),
      catchError(this.handleError)
    );
  }

  createUser(userData: CreateUserRequest): Observable<User> {
    // Note: This would use the auth register endpoints
    // For now, return an error as this should go through auth endpoints
    return throwError(() => new Error('Use auth/register endpoints to create users'));
  }

  // Getters for component access
  getUsersList() {
    return this.users.asReadonly();
  }

  isLoading() {
    return this.loading();
  }

  // Helper methods
  getRoleDisplayText(role: UserRole): string {
    const roleMap: Record<UserRole, string> = {
      customer: 'Customer',
      restaurant_owner: 'Restaurant Owner',
      courier: 'Courier',
      admin: 'Admin',
      super_admin: 'Super Admin',
      ADMIN: 'Admin',
      RESTAURANT_ADMIN: 'Restaurant Admin',
      CUSTOMER: 'Customer',
      COURIER: 'Courier',
      AFFILIATE: 'Affiliate'
    };
    return roleMap[role] || role;
  }

  // Alias for backward compatibility
  getRoleDisplayName(role: UserRole): string {
    return this.getRoleDisplayText(role);
  }

  getStatusDisplayText(status: UserStatus): string {
    const statusMap: Record<UserStatus, string> = {
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      pending_verification: 'Pending Verification',
      ACTIVE: 'Active',
      INACTIVE: 'Inactive',
      SUSPENDED: 'Suspended',
      PENDING: 'Pending'
    };
    return statusMap[status] || status;
  }

  // Alias for backward compatibility
  getStatusDisplayName(status: UserStatus): string {
    return this.getStatusDisplayText(status);
  }

  getStatusColor(status: UserStatus): string {
    const colorMap: Record<UserStatus, string> = {
      active: 'primary',
      inactive: 'medium',
      suspended: 'warn',
      pending_verification: 'accent',
      ACTIVE: 'primary',
      INACTIVE: 'medium',
      SUSPENDED: 'warn',
      PENDING: 'accent'
    };
    return colorMap[status] || 'primary';
  }

  getRoleColor(role: UserRole): string {
    const colorMap: Record<UserRole, string> = {
      customer: 'primary',
      restaurant_owner: 'accent',
      courier: 'warn',
      admin: 'primary',
      super_admin: 'primary',
      ADMIN: 'primary',
      RESTAURANT_ADMIN: 'accent',
      CUSTOMER: 'primary',
      COURIER: 'warn',
      AFFILIATE: 'accent'
    };
    return colorMap[role] || 'primary';
  }

  private handleError = (error: any) => {
    this.loading.set(false);
    console.error('UserService Error:', error);
    return throwError(() => error);
  };
}
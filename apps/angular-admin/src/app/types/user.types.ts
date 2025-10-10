export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  address?: Address;
  avatar?: string;
  name?: string; // For backward compatibility - computed from firstName + lastName
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type UserRole = 'customer' | 'restaurant_owner' | 'courier' | 'admin' | 'super_admin' | 'ADMIN' | 'RESTAURANT_ADMIN' | 'CUSTOMER' | 'COURIER' | 'AFFILIATE';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';

// Auth related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password: string;
  address?: Address;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  address?: Address;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
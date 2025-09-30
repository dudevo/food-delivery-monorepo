export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  address?: Address;
  avatar?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type UserRole = 'customer' | 'restaurant_owner' | 'courier' | 'admin' | 'super_admin';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

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
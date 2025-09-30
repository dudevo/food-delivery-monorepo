import { Injectable, signal } from '@angular/core';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilters,
  UserListResponse,
  UserRole,
  UserStatus
} from '../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = signal<User[]>([]);
  private loading = signal(false);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        role: 'customer',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-20'),
        lastLoginAt: new Date('2024-03-25'),
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@restaurant.com',
        phone: '+1-555-0124',
        role: 'restaurant_owner',
        status: 'active',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-18'),
        lastLoginAt: new Date('2024-03-24'),
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.j@courier.com',
        phone: '+1-555-0125',
        role: 'courier',
        status: 'active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-03-15'),
        lastLoginAt: new Date('2024-03-26'),
        address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.admin@fooddelivery.com',
        phone: '+1-555-0126',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2023-12-01'),
        updatedAt: new Date('2024-03-22'),
        lastLoginAt: new Date('2024-03-26'),
        address: {
          street: '321 Admin Blvd',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@email.com',
        phone: '+1-555-0127',
        role: 'customer',
        status: 'suspended',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-03-10'),
        lastLoginAt: new Date('2024-03-05'),
        address: {
          street: '654 Elm St',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
      }
    ];

    this.users.set(mockUsers);
  }

  getUsers(filters?: UserFilters, page = 1, limit = 10): Promise<UserListResponse> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredUsers = [...this.users()];

        if (filters?.role) {
          filteredUsers = filteredUsers.filter(user => user.role === filters.role);
        }

        if (filters?.status) {
          filteredUsers = filteredUsers.filter(user => user.status === filters.status);
        }

        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone?.toLowerCase().includes(searchTerm)
          );
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        this.loading.set(false);
        resolve({
          users: paginatedUsers,
          total: filteredUsers.length,
          page,
          limit
        });
      }, 500);
    });
  }

  getUserById(id: string): Promise<User | undefined> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users().find(u => u.id === id);
        this.loading.set(false);
        resolve(user);
      }, 300);
    });
  }

  createUser(userData: CreateUserRequest): Promise<User> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          address: userData.address,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
        };

        this.users.update(users => [...users, newUser]);
        this.loading.set(false);
        resolve(newUser);
      }, 500);
    });
  }

  updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.users();
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
          this.loading.set(false);
          reject(new Error('User not found'));
          return;
        }

        const updatedUser: User = {
          ...users[userIndex],
          ...userData,
          updatedAt: new Date()
        };

        this.users.update(users => {
          const newUsers = [...users];
          newUsers[userIndex] = updatedUser;
          return newUsers;
        });

        this.loading.set(false);
        resolve(updatedUser);
      }, 500);
    });
  }

  deleteUser(id: string): Promise<void> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.users();
        const userExists = users.some(u => u.id === id);

        if (!userExists) {
          this.loading.set(false);
          reject(new Error('User not found'));
          return;
        }

        this.users.update(users => users.filter(u => u.id !== id));
        this.loading.set(false);
        resolve();
      }, 500);
    });
  }

  changeUserStatus(id: string, status: UserStatus): Promise<User> {
    return this.updateUser(id, { status });
  }

  get isLoading() {
    return this.loading.asReadonly();
  }

  getRoleDisplayName(role: UserRole): string {
    const roleMap: Record<UserRole, string> = {
      customer: 'Customer',
      restaurant_owner: 'Restaurant Owner',
      courier: 'Courier',
      admin: 'Admin',
      super_admin: 'Super Admin'
    };
    return roleMap[role];
  }

  getStatusDisplayName(status: UserStatus): string {
    const statusMap: Record<UserStatus, string> = {
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      pending_verification: 'Pending Verification'
    };
    return statusMap[status];
  }

  getStatusColor(status: UserStatus): string {
    const colorMap: Record<UserStatus, string> = {
      active: 'primary',
      inactive: 'warn',
      suspended: 'accent',
      pending_verification: 'warn'
    };
    return colorMap[status];
  }
}
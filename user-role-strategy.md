# Backend User Role and Authorization Strategy

This document outlines the best-practice strategy for implementing multiple user roles in the `nestjs-backend` application. The approach is centered around **Role-Based Access Control (RBAC)**.

The primary user roles identified are:
- `CUSTOMER`
- `RESTAURANT_OWNER`
- `ADMIN`
- `COURIER`
- `AFFILIATE`

---

### 1. Data Model: Define Roles in the Database

The foundation of the system is defining the user and their role within the database schema.

-   **User Entity:** A primary `User` entity will exist (e.g., in a `user.entity.ts` file for an ORM like TypeORM).
-   **Role Property:** This `User` entity will contain a `role` property. The simplest and most effective method is to use a TypeScript `enum` to define the possible roles.

**Example (using TypeORM and a PostgreSQL enum type):**

```typescript
// src/user/user.roles.ts
export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
  COURIER = 'courier',
  AFFILIATE = 'affiliate',
}

// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user.roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
  
  // ... other fields like passwordHash, name, etc.
}
```

---

### 2. Authentication: Identify the User with JWT

Before authorization, the system must authenticate the user's identity. The standard for this in a NestJS application is using **Passport.js** with a **JWT (JSON Web Token) strategy**.

1.  **Login:** A user provides credentials (e.g., email and password).
2.  **Token Issuance:** Upon successful validation, the backend generates a JWT.
3.  **JWT Payload:** The payload of this JWT must contain the user's unique identifier (`id` or `sub`) and their `role`.

**Example JWT Payload:**

```json
{
  "sub": 123, // User ID
  "email": "user@example.com",
  "role": "courier", // The user's role is embedded in the token
  "iat": 1678886400,
  "exp": 1678972800
}
```

---

### 3. Authorization: Protect Endpoints with Guards

This is the core of the RBAC implementation. NestJS **Guards** are used to protect routes based on the user's role.

#### Best Practice Steps:

1.  **Create a Custom `@Roles` Decorator:** This allows for a declarative and readable way to specify which roles can access an endpoint. It attaches the required roles as metadata to a route handler.

    ```typescript
    // src/auth/decorators/roles.decorator.ts
    import { SetMetadata } from '@nestjs/common';
    import { UserRole } from '../../user/user.roles';

    export const ROLES_KEY = 'roles';
    export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
    ```

2.  **Create the `RolesGuard`:** This guard extracts the roles from the decorator and compares them against the user's role from the JWT payload.

    ```typescript
    // src/auth/guards/roles.guard.ts
    import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    import { ROLES_KEY } from '../decorators/roles.decorator';
    import { UserRole } from '../../user/user.roles';

    @Injectable()
    export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) {}

      canActivate(context: ExecutionContext): boolean {
        // Get the roles required by the route handler
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);

        // If no roles are required, grant access
        if (!requiredRoles) {
          return true;
        }

        // Get the user object from the request (attached by the AuthGuard)
        const { user } = context.switchToHttp().getRequest();

        // Check if the user's role is one of the required roles
        return requiredRoles.some((role) => user.role?.includes(role));
      }
    }
    ```

3.  **Apply to Controllers and Endpoints:** Protect any route by combining the standard `AuthGuard` (to ensure the user is logged in) with the new `RolesGuard`.

    ```typescript
    // In a controller, e.g., src/admin/admin.controller.ts
    import { Controller, Get, UseGuards } from '@nestjs/common';
    import { AuthGuard } from '@nestjs/passport';
    import { Roles } from '../auth/decorators/roles.decorator';
    import { RolesGuard } from '../auth/guards/roles.guard';
    import { UserRole } from '../user/user.roles';

    @Controller('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard) // Apply guards to the entire controller
    export class AdminController {
      
      @Get('dashboard')
      @Roles(UserRole.ADMIN) // Only users with the 'admin' role can access this
      getDashboard() {
        return { message: 'Welcome to the admin dashboard!' };
      }

      @Get('orders')
      @Roles(UserRole.ADMIN, UserRole.RESTAURANT_OWNER) // Both Admin and Restaurant Owners can access
      getAllOrders() {
        // ... logic to get orders
      }
    }
    ```

### Summary of the Strategy

-   **Data-Driven:** Roles are defined in the database, creating a single source of truth.
-   **Stateless & Scalable:** The user's role is embedded in the JWT, so the backend does not need to query the database on every request to check permissions.
-   **Declarative & Clean:** Using decorators (`@Roles`) and guards keeps business logic separate from authorization logic, improving code readability and maintainability.
-   **Secure & Centralized:** Permission logic is centralized within the `RolesGuard`, reducing the chance of errors and making the system easier to audit and debug.

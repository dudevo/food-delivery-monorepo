# Authentication System for Food Delivery Platform

## Overview

This document describes the **fully typed** authentication system implemented for the NestJS backend that supports multiple user roles in the food delivery platform. The system uses proper TypeScript types and DTOs instead of `any` for maximum type safety.

## User Roles

The system supports the following user roles:

### 1. **Admin** (`admin`)
- Full system access
- Can manage all users, restaurants, and system settings
- Can create and manage other admin accounts

### 2. **Customer** (`customer`)
- Can browse restaurants and menus
- Can place orders and track deliveries
- Can manage their profile and delivery addresses

### 3. **Courier** (`courier`)
- Can view available delivery orders
- Can accept and deliver orders
- Can manage their work schedule and availability

### 4. **Restaurant Admin** (`restaurant_admin`)
- Can manage restaurant menu and pricing
- Can view and manage restaurant orders
- Can manage restaurant staff (if permissions granted)

### 5. **Affiliate** (`affiliate`)
- Can generate referral links
- Can track earnings and referrals
- Can manage payout information

## Type-Safe Implementation

### DTOs (Data Transfer Objects)

The system uses strongly typed DTOs for all input validation:

#### Login DTO
```typescript
export class LoginDto {
  email: string;
  password: string;
}
```

#### Registration DTOs
```typescript
export class RegisterCustomerDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export class RegisterCourierDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
}

export class RegisterRestaurantAdminDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  restaurantId?: string;
  position?: string;
}

export class RegisterAffiliateDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export class RegisterAdminDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}
```

#### Response Interfaces
```typescript
export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
```

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password.

**Request Body (LoginDto):**
```json
{
  "email": "user@example.com",
  "password": "UserPassword123!"
}
```

**Response (LoginResponse):**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "status": "active"
  }
}
```

#### POST `/api/auth/register/customer`
Register a new customer.

**Request Body (RegisterCustomerDto):**
```json
{
  "email": "customer@example.com",
  "password": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890"
}
```

**Response (RegisterResponse):**
```json
{
  "message": "Customer registered successfully",
  "user": {
    "id": "customer_id",
    "email": "customer@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "customer"
  }
}
```

#### POST `/api/auth/register/courier`
Register a new courier.

**Request Body (RegisterCourierDto):**
```json
{
  "email": "courier@example.com",
  "password": "SecurePassword123!",
  "firstName": "Mike",
  "lastName": "Wilson",
  "phone": "+1234567890",
  "vehicleType": "motorcycle",
  "vehicleNumber": "COURIER-001"
}
```

#### POST `/api/auth/register/restaurant-admin`
Register a new restaurant admin.

**Request Body (RegisterRestaurantAdminDto):**
```json
{
  "email": "restaurant@example.com",
  "password": "SecurePassword123!",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "phone": "+1234567890",
  "restaurantId": "restaurant-123",
  "position": "Manager"
}
```

#### POST `/api/auth/register/affiliate`
Register a new affiliate.

**Request Body (RegisterAffiliateDto):**
```json
{
  "email": "affiliate@example.com",
  "password": "SecurePassword123!",
  "firstName": "David",
  "lastName": "Brown",
  "phone": "+1234567890"
}
```

#### POST `/api/auth/register/admin`
Register a new admin (protected endpoint).

**Request Body (RegisterAdminDto):**
```json
{
  "email": "admin@example.com",
  "password": "SecurePassword123!",
  "firstName": "Admin",
  "lastName": "User",
  "phone": "+1234567890"
}
```

## Type Safety Benefits

### 1. **Compile-Time Validation**
- All DTOs are strongly typed
- Invalid properties are caught at compile time
- Auto-completion in IDEs

### 2. **Runtime Validation**
- DTOs work with class-validator decorators
- Automatic input validation
- Consistent data structure

### 3. **API Documentation**
- Swagger automatically generates proper API docs
- Type information is preserved in documentation
- Clear request/response schemas

### 4. **Maintainability**
- Refactoring is safer with TypeScript
- Easy to track where types are used
- Better developer experience

## Service Implementation Example

The service methods are now properly typed:

```typescript
@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    // Type-safe implementation
    const user = this.users.find(u => u.email === loginDto.email);
    // ... rest of implementation
  }

  async registerCustomer(registerDto: RegisterCustomerDto): Promise<RegisterResponse> {
    // Type-safe implementation
    const existingUser = this.users.find(u => u.email === registerDto.email);
    // ... rest of implementation
  }
}
```

## Controller Implementation Example

Controllers use proper typing:

```typescript
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register/customer')
  registerCustomer(@Body() registerDto: RegisterCustomerDto): Promise<RegisterResponse> {
    return this.authService.registerCustomer(registerDto);
  }
}
```

## Security Features

### Password Requirements
- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter  
- Must contain at least one number
- Must contain at least one special character

### JWT Authentication
- Uses JSON Web Tokens for authentication
- Tokens contain user ID, email, and role
- Tokens are signed with a secret key
- Default token expiration: 1 day

### Type-Safe Error Handling
```typescript
if (!user) {
  throw new UnauthorizedException('Invalid credentials');
}

if (user.status !== UserStatus.ACTIVE) {
  throw new UnauthorizedException('Account is not active');
}
```

## Testing the System

1. Start the application: `pnpm dev`
2. Access Swagger documentation: `http://localhost:5001/docs`
3. Test registration and login endpoints
4. Verify JWT tokens are generated correctly
5. Test role-based access (when guards are implemented)
6. Verify database connection and data persistence

### Database Connection

The system uses PostgreSQL with TypeORM for database operations:

**Database Configuration:**
- Host: localhost (default)
- Port: 5433
- Database: food-delivery-nest-db
- Auto-synchronization enabled in development
- SSL disabled in development

**Entities:**
- `users` - Base user authentication data
- `customer_profiles` - Customer-specific information
- `courier_profiles` - Courier delivery data
- `restaurant_profiles` - Restaurant management data
- `affiliate_profiles` - Affiliate tracking data

**Features:**
- Automatic migrations in development
- UUID primary keys
- JSONB columns for flexible data storage
- Soft relationships with cascade operations
- Automatic timestamp tracking

### Register a Customer
```bash
curl -X POST http://localhost:5001/api/auth/register/customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Customer@123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Customer@123"
  }'
```

## Advantages Over `any` Type

### Before (Using `any`):
```typescript
// ❌ Bad practice
login(loginDto: any) {
  // No type safety, no auto-completion
  // Runtime errors likely
  return {
    data: loginDto.someProperty // Won't catch errors at compile time
  };
}
```

### After (Using Proper DTOs):
```typescript
// ✅ Best practice
login(loginDto: LoginDto): Promise<LoginResponse> {
  // Full type safety
  // Auto-completion in IDE
  // Compile-time error checking
  const user = this.users.find(u => u.email === loginDto.email); // Safe!
  // ... rest of implementation
}
```

## Development Benefits

1. **IDE Support**: Full auto-completion and type hints
2. **Error Prevention**: Catch errors at compile time, not runtime
3. **Refactoring Safety**: Rename properties with confidence
4. **Documentation**: Self-documenting code through types
5. **Team Collaboration**: Clear contracts between frontend and backend
6. **Testing**: Easier to write type-safe tests

This type-safe implementation provides a robust foundation for the food delivery platform authentication system with all the benefits of TypeScript's static typing while maintaining clean, maintainable code.
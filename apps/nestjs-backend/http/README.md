# HTTP Testing Files for Authentication Endpoints

This folder contains HTTPie commands for testing all authentication endpoints.

## Usage

Copy and paste any of the commands below directly into your terminal to test the endpoints.

## Prerequisites

1. Start the backend server:
   ```bash
   pnpm dev
   ```

2. Make sure HTTPie is installed:
   ```bash
   # macOS
   brew install httpie
   
   # Ubuntu/Debian
   sudo apt-get install httpie
   
   # Windows (with Chocolatey)
   choco install httpie
   ```

## Available Test Files

### 🔐 Registration Endpoints
- `register-customer.http` - Register new customer
- `register-courier.http` - Register new courier
- `register-restaurant-admin.http` - Register restaurant admin
- `register-affiliate.http` - Register affiliate
- `register-admin.http` - Register admin

### 🔑 Login Endpoints
- `login-customer.http` - Customer login
- `login-courier.http` - Courier login
- `login-restaurant-admin.http` - Restaurant admin login

### 🏥 Health Check
- `health.http` - API health check

## Test Sequence

1. First test health check:
   ```bash
   # Copy and paste from health.http
   http GET http://localhost:5001/api/health
   ```

2. Register users for each role (copy from respective .http files):
   ```bash
   # Customer registration
   http POST http://localhost:5001/api/auth/register/customer Content-Type: application/json
   
   # ... paste the JSON body from the file
   ```

3. Test login for each registered user:
   ```bash
   # Customer login
   http POST http://localhost:5001/api/auth/login Content-Type: application/json
   
   # ... paste the JSON body from the file
   ```

## Expected Responses

### Successful Registration
```json
{
  "message": "[Role] registered successfully",
  "user": {
    "id": "uuid-string",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  }
}
```

### Successful Login
```json
{
  "access_token": "jwt-token-string",
  "user": {
    "id": "uuid-string",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "status": "active"
  }
}
```

### Health Check
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "service": "food-delivery-api"
}
```

## Error Responses

### Conflict (User Already Exists)
```json
{
  "statusCode": 409,
  "message": "User with this email already exists"
}
```

### Unauthorized (Invalid Credentials)
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

## Testing Tips

1. **Copy entire command including JSON body** - Don't copy line by line
2. **Update email addresses** for each test to avoid conflicts
3. **Check response status codes** - 200 for success, 409 for conflicts, 401 for unauthorized
4. **Save access tokens** - Copy the `access_token` for authenticated endpoint testing
5. **Test validation** - Try invalid data to see error handling

## Database Verification

After registration, you can verify data was persisted by connecting to PostgreSQL:

```bash
psql -U postgres -p 5433 -d food-delivery-nest-db

# List users
SELECT * FROM users;

# List customer profiles
SELECT * FROM customer_profiles;

# List all tables
\dt
```

This makes API testing much faster and more convenient!
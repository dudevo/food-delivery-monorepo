# NestJS Backend - Food Delivery Platform

A robust NestJS backend for the food delivery platform with comprehensive logging, authentication, database integration, and API documentation.

## 🚀 Features

- **NestJS Framework**: Modern Node.js framework with TypeScript support
- **Database Integration**: PostgreSQL with TypeORM for robust data management
- **Authentication**: JWT-based authentication system
- **API Documentation**: Automated Swagger/OpenAPI documentation
- **Logging**: Structured logging with Pino for production-ready monitoring
- **Validation**: Request/response validation with class-validator
- **Configuration**: Environment-based configuration management
- **Documentation**: Code documentation with Compodoc

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 12+
- pnpm package manager

## 🛠️ Setup

### 1. Environment Configuration

Copy the environment template and configure your local settings:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your local configuration:

```env
# Application Settings
NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=food_delivery

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE food_delivery;
```

### 3. Installation

From the repository root:

```bash
pnpm install
```

## 🏃‍♂️ Development

### Start Development Server

```bash
pnpm dev --filter nestjs-backend
```

The server will start at `http://localhost:3001` with:
- API endpoints at `http://localhost:3001/api`
- Swagger documentation at `http://localhost:3001/docs`

### Available Scripts

```bash
# Development
pnpm dev                 # Start with hot reload
pnpm start:debug         # Start with debug mode

# Production
pnpm build               # Build for production
pnpm start               # Start production server

# Code Quality
pnpm lint                # Run ESLint
pnpm format              # Format code with Prettier
pnpm check-types         # TypeScript type checking

# Testing
pnpm test                # Run unit tests
pnpm test:watch          # Run tests in watch mode
pnpm test:cov            # Run tests with coverage
pnpm test:e2e            # Run end-to-end tests

# Database
pnpm migration:generate  # Generate new migration
pnpm migration:run       # Run pending migrations
pnpm migration:revert    # Revert last migration

# Documentation
pnpm docs                # Generate code documentation
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3001/docs`
- **Code Documentation**: Run `pnpm docs` and open `docs/index.html`

## 🏧 Architecture

### Project Structure

```
src/
├── config/           # Configuration files
│   ├── app.config.ts
│   ├── database.config.ts
│   └── jwt.config.ts
├── modules/          # Feature modules
├── entities/         # TypeORM entities
├── migrations/       # Database migrations
├── dto/             # Data Transfer Objects
├── guards/          # Authentication guards
├── interceptors/    # Request/response interceptors
├── decorators/      # Custom decorators
├── utils/           # Utility functions
├── app.module.ts    # Root application module
└── main.ts         # Application entry point
```

### Key Components

- **Configuration**: Environment-based configuration using `@nestjs/config`
- **Database**: PostgreSQL with TypeORM for entity management
- **Authentication**: JWT strategy with passport
- **Validation**: Request validation using `class-validator` and `class-transformer`
- **Logging**: Structured logging with `nestjs-pino`
- **Documentation**: Auto-generated API docs with Swagger

## 🔐 Authentication

The API uses JWT bearer token authentication:

1. Obtain a token from the auth endpoints
2. Include it in requests: `Authorization: Bearer <token>`
3. Configure JWT secret in environment variables

## 🗄️ Database

### Entity Creation

Create new entities in `src/entities/`:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

### Migrations

Generate migrations after entity changes:

```bash
pnpm migration:generate -n AddUserTable
pnpm migration:run
```

## 📝 Logging

The application uses structured logging with Pino:

```typescript
import { Logger } from '@nestjs/common';

export class UserService {
  private readonly logger = new Logger(UserService.name);

  async createUser(userData: CreateUserDto) {
    this.logger.log('Creating new user', { email: userData.email });
    // ... implementation
  }
}
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Jest with NestJS testing utilities
- **E2E Tests**: Supertest for API endpoint testing
- **Coverage**: Code coverage reporting

## 🚀 Deployment

### Environment Variables

Ensure all production environment variables are set:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=production-secret-key
```

### Build and Start

```bash
pnpm build
NODE_ENV=production pnpm start:prod
```

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Write tests for new features
3. Update documentation as needed
4. Run linting and type checking before commits:
   ```bash
   pnpm lint && pnpm check-types
   ```

## 📦 Dependencies

### Core Dependencies
- `@nestjs/common`, `@nestjs/core`: NestJS framework
- `@nestjs/config`: Configuration management
- `@nestjs/typeorm`, `typeorm`: Database ORM
- `@nestjs/jwt`: JWT authentication
- `@nestjs/swagger`: API documentation
- `nestjs-pino`: Structured logging
- `class-validator`, `class-transformer`: Validation

### Development Dependencies
- `@nestjs/cli`: NestJS CLI tools
- `@nestjs/testing`: Testing utilities
- `jest`: Testing framework
- `supertest`: HTTP testing
- `@compodoc/compodoc`: Documentation generation

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection**: Verify PostgreSQL is running and credentials are correct
2. **Port Conflicts**: Check if port 3001 is available or change PORT in `.env.local`
3. **JWT Issues**: Ensure JWT_SECRET is set and consistent across restarts

### Debug Mode

Start the application in debug mode:

```bash
pnpm start:debug
```

Then attach a debugger to port 9229.

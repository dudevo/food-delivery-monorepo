# 🍕 Food Delivery Monorepo

A full-stack food delivery platform built with modern technologies and **Turborepo** monorepo architecture.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5+-red.svg)](https://turbo.build/)

## 🏗️ Architecture Overview

This monorepo contains a complete food delivery ecosystem with multiple applications:

```
┌─────────────────────────────────────────────────────────┐
│                    TURBOREPO WORKSPACE                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📱 APPS (Your Applications)                           │
│  ├── nextjs-customer    (port 3001)                    │
│  ├── nextjs-couriers    (port 3000)                    │
│  ├── nestjs-backend     (port 3002)                    │
│  ├── angular-admin      (port 4200)                    │
│  ├── react-restaurants  (port 5174)                    │
│  └── react-affiliate    (port 5173)                    │
│                                                         │
│  📦 SHARED PACKAGES (Building in background)           │
│  ├── @repo/ui          (UI components)                 │
│  ├── @repo/logger      (Logging utility)               │
│  ├── @repo/eslint-config (ESLint rules)                │
│  └── @repo/typescript-config (TypeScript config)       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Applications

| Application | Framework | Port | Description |
|-------------|-----------|------|-----------|
| **Customer App** | Next.js 15 | 3001 | Customer-facing app for ordering food |
| **Couriers App** | Next.js 15 | 3000 | Delivery driver dashboard and management |
| **Admin Panel** | Angular 20 | 4200 | Administrative dashboard |
| **Restaurants** | React + Vite | 5174 | Restaurant management portal |
| **Affiliate** | React + Vite | 5173 | Affiliate marketing dashboard |
| **API Backend** | NestJS 11 | 3002 | RESTful API and business logic |

## 📦 Shared Packages

- **`@repo/ui`** - Shared React components library
- **`@repo/logger`** - Unified logging utility
- **`@repo/config-eslint`** - ESLint configurations
- **`@repo/config-typescript`** - TypeScript configurations
- **`@repo/jest-presets`** - Jest testing presets

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router, Turbopack)
- **React 19** with TypeScript
- **Angular 20** (Standalone Components)
- **Vite 7** for React apps
- **Tailwind CSS** (planned)
- **Zustand** for state management (planned)

### Backend
- **NestJS 11** with TypeScript
- **Express.js** underlying framework
- **JWT Authentication** (planned)
- **WebSockets** for real-time features (planned)
- **Database ORM** (TypeORM/Prisma - planned)

### DevOps & Tooling
- **Turborepo** - Monorepo management
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **TypeScript** - Type safety

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** 9.0 or higher
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dudevo/food-delivery-monorepo.git
   cd food-delivery-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your actual environment variables
   ```

4. **Start all applications**
   ```bash
   pnpm dev
   ```

### 🌐 Access Applications

After running `pnpm dev`, you can access:

- 🛍️ **Customer App**: http://localhost:3001
- 🚚 **Couriers App**: http://localhost:3000
- 👨‍💼 **Admin Panel**: http://localhost:4200
- 🏪 **Restaurants**: http://localhost:5174
- 🤝 **Affiliate**: http://localhost:5173
- 🔌 **API Backend**: http://localhost:3002

## 📝 Available Scripts

### Global Commands
```bash
# Start all apps in development
pnpm dev

# Build all apps for production
pnpm build

# Run tests across all packages
pnpm test

# Lint all code
pnpm lint

# Format code with Prettier
pnpm format

# Type check all TypeScript code
pnpm check-types
```

### Individual App Commands
```bash
# Run specific app
pnpm dev --filter nextjs-customer
pnpm dev --filter nestjs-backend

# Build specific app
pnpm build --filter angular-admin

# Test specific app
pnpm test --filter react-restaurants
```

## 📁 Project Structure

```
food-delivery-monorepo/
├── apps/
│   ├── nextjs-customer/     # Customer ordering app
│   ├── nextjs-couriers/     # Courier management
│   ├── angular-admin/       # Admin dashboard
│   ├── react-restaurants/   # Restaurant portal
│   ├── react-affiliate/     # Affiliate dashboard
│   └── nestjs-backend/      # API backend
├── packages/
│   ├── ui/                  # Shared components
│   ├── logger/              # Logging utility
│   ├── config-eslint/       # ESLint configs
│   ├── config-typescript/   # TS configs
│   └── jest-presets/        # Jest presets
├── .env.example             # Environment template
├── SECURITY.md             # Security guidelines
├── turbo.json              # Turborepo config
└── pnpm-workspace.yaml     # pnpm workspace config
```

## 🔐 Security

This repository follows security best practices:
- All sensitive files are properly `.gitignore`d
- Environment variables use templates (`.env.example`)
- No hardcoded secrets or credentials
- Comprehensive security guidelines in `SECURITY.md`

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 🧪 Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature
   
   # Make changes and test
   pnpm dev
   pnpm test
   pnpm lint
   
   # Commit with conventional commits
   git commit -m "feat(nextjs-customer): add shopping cart functionality"
   ```

2. **Testing**
   ```bash
   # Run all tests
   pnpm test
   
   # Run tests for specific app
   pnpm test --filter nestjs-backend
   ```

3. **Building**
   ```bash
   # Build all apps
   pnpm build
   
   # Build specific app
   pnpm build --filter angular-admin
   ```

## 🚀 Deployment

This monorepo is designed for flexible deployment options:

- **Vercel** - Perfect for Next.js apps
- **Netlify** - Great for static React/Angular apps
- **Railway/Heroku** - Ideal for NestJS backend
- **Docker** - Containerized deployment (planned)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the project conventions
4. Run tests and ensure they pass (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Convention
We use [Conventional Commits](https://conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/modifications
- `chore:` - Maintenance tasks

## 📊 Current Status

- ✅ **Project Setup** - Turborepo monorepo configured
- ✅ **Applications Created** - All 6 apps scaffolded and running
- ✅ **Development Environment** - Hot reloading working
- ✅ **Shared Packages** - UI and logger packages created
- 🚧 **Authentication** - JWT implementation in progress
- 🚧 **Database** - ORM setup and models
- 🚧 **Features** - Core business logic development
- 🚧 **Testing** - Comprehensive test suite
- 🚧 **Documentation** - API documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**dudevo** - *Full-stack Developer*

## 🔗 Links

- [Repository](https://github.com/dudevo/food-delivery-monorepo)
- [Issues](https://github.com/dudevo/food-delivery-monorepo/issues)
- [Turborepo Documentation](https://turbo.build/repo/docs)

---

⭐ **Star this repository if you find it helpful!**

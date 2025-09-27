# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a food delivery platform built as a Turborepo monorepo with multiple applications and packages. The project includes customer-facing apps, admin panels, restaurant management, courier tracking, affiliate systems, and a backend API.

## Architecture

### Applications
- **angular-admin**: Angular-based admin panel for platform management
- **nestjs-backend**: NestJS API server providing core backend services
- **nextjs-couriers**: Next.js app for courier management and tracking
- **nextjs-customer**: Next.js customer-facing storefront
- **react-affiliate**: React/Vite app for affiliate program management
- **react-restaurants**: React/Vite app for restaurant partners

### Shared Packages
- **@repo/eslint-config**: Centralized ESLint configurations with framework-specific exports
- **@repo/ui**: Shared React component library with dual CJS/ESM builds
- **@repo/logger**: Isomorphic logging utility
- **@repo/typescript-config**: Shared TypeScript configurations
- **@repo/jest-presets**: Jest testing configurations

## Development Commands

### Root-level Commands (use these for multi-app operations)
```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm build                  # Build all apps and packages
pnpm test                   # Run tests across all packages
pnpm lint                   # Lint all packages
pnpm check-types           # Type-check all packages
pnpm format                # Format code with Prettier

# Utilities
pnpm clean                 # Clean build artifacts
```

### Application-specific Commands
Navigate to specific app directories for targeted development:

**Angular Admin** (`apps/angular-admin/`):
```bash
pnpm dev          # ng serve
pnpm build        # ng build
pnpm test         # ng test (Karma + Jasmine)
```

**NestJS Backend** (`apps/nestjs-backend/`):
```bash
pnpm dev          # nest start --watch
pnpm build        # nest build
pnpm test         # jest
pnpm test:e2e     # jest --config ./test/jest-e2e.json
pnpm test:cov     # jest --coverage
pnpm lint         # eslint with --fix
```

**Next.js Apps** (`apps/nextjs-*`):
```bash
pnpm dev          # next dev --turbopack
pnpm build        # next build --turbopack
pnpm start        # next start
pnpm lint         # eslint
```

**React/Vite Apps** (`apps/react-*`):
```bash
pnpm dev          # vite
pnpm build        # tsc -b && vite build
pnpm preview      # vite preview
pnpm lint         # eslint
```

**UI Package** (`packages/ui/`):
```bash
pnpm build        # bunchee (dual build system)
pnpm dev          # bunchee --watch
pnpm check-types  # tsc --noEmit
pnpm test         # jest with browser preset
```

## Technology Stack

- **Package Manager**: pnpm with workspaces
- **Build System**: Turborepo for task orchestration
- **Frontend Frameworks**: Angular 20, Next.js 15, React 19, Vite 7
- **Backend**: NestJS 11 with Express
- **Testing**: Jest, Karma/Jasmine (Angular)
- **Styling**: Sass support across applications
- **TypeScript**: Version 5.x across all packages
- **Linting**: ESLint 9 with framework-specific configurations

## Build Dependencies

The Turborepo task pipeline ensures:
- Shared packages build before applications
- Type checking and linting depend on builds
- Development servers wait for dependency builds

## Key Development Notes

- All applications use TypeScript
- Next.js apps are configured with Turbopack for faster builds
- The UI package uses bunchee for dual CJS/ESM output
- ESLint configurations are shared via @repo/eslint-config with framework-specific exports
- The backend uses Jest for unit and e2e testing
- Angular app uses Karma + Jasmine for testing
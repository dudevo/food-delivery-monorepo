# CRUSH Development Guide

## Commands (run from root)

### Development

```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev --filter nextjs-customer
pnpm dev --filter nestjs-backend
pnpm dev --filter angular-admin
pnpm dev --filter react-affiliate
```

### Building & Testing

```bash
# Build all apps and packages
pnpm build

# Test all packages
pnpm test

# Test specific package/app
pnpm test --filter @repo/ui
pnpm test --filter nestjs-backend

# Run single test file
cd packages/ui && npx jest counter-button/index.test.tsx
cd apps/nestjs-backend && npx jest app.controller.spec.ts
```

### Code Quality

```bash
pnpm lint                    # Lint all packages
pnpm check-types            # Type-check all packages
pnpm format                 # Format with Prettier
```

## Code Style Guidelines

### General

- TypeScript everywhere (strict mode enabled)
- Use Prettier formatting: 2-space indent, single quotes, trailing commas
- ESLint with @repo/eslint-config for all packages
- File naming: PascalCase for components, camelCase for utilities
- **NEVER use `any` type - always prefer proper TypeScript types and interfaces**

### Imports

- Use absolute imports from workspace packages: `import { Button } from '@repo/ui'`
- React imports first, then external libs, then internal modules
- Type-only imports when possible: `import type { ButtonProps }`
- **Import specific DTO types for API calls instead of using `any`**
- **Prefer named exports for types and interfaces for better tree-shaking**

### React Components

- Use forwardRef for components that accept refs
- Interface for props extends HTML element props when appropriate
- Export types separately: `export type { ButtonProps }`
- Use CSS Modules or separate CSS files (Sass supported)
- **Define prop interfaces for all components - never use `any` for props**
- **Use proper TypeScript types for all event handlers and callbacks**

### NestJS

- Services end with `Service` suffix
- Controllers end with `Controller` suffix
- Use dependency injection pattern
- Test files: `*.spec.ts` with Jest
- Use Repository Pattern with a abstract repository
- User "SOLID" principle, if it makes sense, always then possible
- **Use proper DTOs (Data Transfer Objects) instead of `any` for all API inputs**
- **Create specific interfaces for all API responses - no `any` return types**
- **Type all service method parameters and return values explicitly**

### Angular

- Components: `*.component.ts`, Services: `*.service.ts`
- Use Angular signals for state management
- Karma + Jasmine for testing
- Single quotes, 100-char line width (per app config)
- Use zoneless approach
- Use ngrx/signals for state management

### Testing

- Jest presets: @repo/jest-presets/browser for UI, node for backend
- Test files: `*.test.tsx` or `*.spec.ts`
- Use `@jest/globals` for test functions
- Test near source code in `__tests__/` directories or alongside files
- **Create HTTP test files for each endpoint in `http/` folder for manual testing**
- **ALWAYS create unit tests for each feature in both frontend and backend**
- **ALWAYS create e2e tests for each feature in both frontend and backend**

### HTTP Testing Guidelines

#### ✅ Safe to Commit to GitHub:
- HTTP files with environment variables and placeholders
- Template files showing request structure for team collaboration
- Files using variable references instead of hardcoded sensitive data
- Public endpoint testing files (no authentication required)
- Example requests with `test@example.com` or placeholder emails

#### 🚫 Never Upload to GitHub:
- HTTP files containing hardcoded API keys, tokens, or credentials
- Files with production secrets or passwords embedded directly
- Any files with real authentication data that could be exploited
- `.env` files with sensitive data
- Files containing `access_token`, `jwt_secret`, or similar tokens

#### 🔒 Sensitive Data Handling:
- Use environment variables: `$API_BASE_URL`, `$USER_EMAIL`, `$ACCESS_TOKEN`
- Placeholder values: `test@example.com`, `your-password-here`
- Template format: `"password": "your-secure-password"`
- Authentication tokens: Store in local environment, never commit

### TypeScript Best Practices

- **NEVER use `any` type - always prefer proper TypeScript types and interfaces**
- **Define DTOs (Data Transfer Objects) for all API inputs/outputs**
- **Use proper interfaces for function parameters and return values**
- **Create specific response types instead of returning generic objects**
- **Leverage TypeScript's type inference but provide explicit types when beneficial**
- **Use `type` for object shapes and unions, `interface` for class-like structures**
- **Prefer readonly properties for immutable data**
- **Use utility types (Partial, Pick, Omit) when appropriate**
- **Enable strict mode in tsconfig.json for maximum type safety**

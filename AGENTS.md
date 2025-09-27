# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by pnpm and Turborepo.
- `apps/` holds deployable surfaces: `nextjs-*` (Next.js App Router), `react-*` SPAs, `angular-admin`, and `nestjs-backend`.
- `packages/` stores shared layers such as `ui`, `logger`, and config presets.
- Source lives in each app's `app/` or `src/` directory; tests sit in `test/` or alongside code as `__tests__/`; static assets belong in `public/`.

## Build, Test, and Development Commands
- `pnpm install` syncs workspace dependencies via the lockfile.
- `pnpm dev --filter <target>` runs an app locally (e.g., `pnpm dev --filter nextjs-customer`).
- `pnpm build` executes `turbo run build` across all packages for production artifacts.
- `pnpm test` triggers workspace-wide suites with Jest presets.
- `pnpm lint` and `pnpm check-types` enforce linting and TypeScript health before merging.

## Coding Style & Naming Conventions
- TypeScript-first across apps; prefer `.ts/.tsx` and shared types in `packages/`.
- Prettier governs formatting (`pnpm format`): 2-space indent, trailing commas where valid, semicolons on.
- ESLint config from `packages/config-eslint`; trust framework-specific configs (`eslint.config.mjs`).
- Components use PascalCase, hooks camelCase with a `use` prefix, NestJS providers end with `Service`, Angular modules `*.module.ts`.

## Testing Guidelines
- Jest presets in `packages/jest-presets`; extend within app-level `jest.config` when needed.
- Keep unit specs near source as `<name>.spec.ts` or `<name>.test.ts`; E2E suites live under `test/` (see `apps/nestjs-backend/test`).
- Update or add tests whenever business logic changes; run `pnpm test --filter <target>` for focused feedback.
- Snapshot updates must be deliberate and reviewed alongside the diff.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat(nestjs-backend): add menu seed`) to describe scope and intent.
- Keep commits scoped; avoid mixing unrelated surfaces in one change.
- PRs include a summary, testing notes (`pnpm test` results), linked issues, and UI screenshots for customer-facing updates.
- Confirm `pnpm lint` and `pnpm build` locally before requesting review; CI will re-run via Turbo.

## Environment & Configuration
- Do not commit secrets. Use `.env.local` per app (gitignored) and document required variables in the relevant README.
- Note runtime flags or migrations in PR descriptions so other agents can mirror your setup.

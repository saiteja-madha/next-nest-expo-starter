# next-nest-expo-starter

A monorepo combining a Next.js web app, a NestJS API, and an Expo mobile app.

## Stack

- **Package manager**: pnpm with workspaces
- **Monorepo runner**: Turborepo
- **Node**: >=24 (see `.node-version` / `.nvmrc`)

## Apps

| App    | Path          | Tech                                              |
| ------ | ------------- | ------------------------------------------------- |
| Web    | `apps/web`    | Next.js 16, React 19, Tailwind CSS v4, TypeScript |
| API    | `apps/api`    | NestJS 11, TypeScript                             |
| Mobile | `apps/mobile` | Expo (React Native), TypeScript                   |

## Packages

| Package           | Path                         | Purpose               |
| ----------------- | ---------------------------- | --------------------- |
| typescript-config | `packages/typescript-config` | Shared tsconfig bases |

## Common commands

```bash
# Install all dependencies
pnpm install

# Run all dev servers
pnpm dev

# Build everything
pnpm build

# Lint all packages
pnpm lint

# Type-check all packages
pnpm check-types

# Format and auto-fix all files
pnpm format:fix

# Check formatting without writing
pnpm format
```

## Code style

- Biome handles both linting and formatting. The root `biome.json` defines shared rules; each app extends it via its own `biome.json` with `"extends": "//"`.
- TypeScript base configs live in `packages/typescript-config`.

## Important conventions

- All packages use named exports (no default exports for components).
- Environment variables must be declared in `turbo.json` under the relevant task's `env` array before they can be used in builds.
- Never commit `.env*` files. Use `.env.example` for documentation.

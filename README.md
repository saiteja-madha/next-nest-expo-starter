# next-nest-expo-starter

Monorepo starter with Next.js web, NestJS API, and Expo mobile — pnpm workspaces + Turborepo.

## Apps

| App | Stack | Port |
|-----|-------|------|
| `apps/web` | Next.js 16, Tailwind CSS v4 | 3000 |
| `apps/api` | NestJS 11, Express | 3001 |
| `apps/mobile` | Expo / React Native | — |

## Prerequisites

- Node.js >= 24
- pnpm 11

## Quick start

```bash
pnpm install
pnpm dev          # all apps
pnpm build        # all apps
pnpm lint         # Biome
pnpm check-types  # TypeScript
```

Or target a single app:

```bash
pnpm --filter @repo/web dev
pnpm --filter @repo/api dev
```

## Docker

Production images for each app:

```bash
# Web (Next.js standalone)
docker build -t web -f apps/web/Dockerfile .

# API (NestJS)
docker build -t api -f apps/api/Dockerfile .
```

Optional Turbo remote cache for CI/CD (Vercel):

```bash
docker build --build-arg TURBO_TEAM=... --build-arg TURBO_TOKEN=... -f apps/web/Dockerfile .
```

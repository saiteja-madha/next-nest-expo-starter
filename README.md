# next-nest-expo-starter

Monorepo starter combining a Next.js web app, a NestJS API, and an Expo mobile app.
This repository uses pnpm workspaces and Turbo to run tasks across the monorepo.

## Repository layout

- `apps/api` — NestJS backend (TypeScript)
- `apps/web` — Next.js frontend (React, TypeScript)
- `apps/mobile` — Expo / React Native app
- `packages/eslint-config` — shared ESLint configs
- `packages/typescript-config` — shared TypeScript configs

## Prerequisites

- Node.js (see `engines` in root `package.json`) — this repo declares `node >=24`.
- pnpm (this repo uses `pnpm` as the package manager)

## Quick start

Install dependencies at the repo root:

```bash
pnpm install
```

Run all development servers (uses Turbo):

```bash
pnpm dev
```

Or run a single app from its folder:

```bash
cd apps/api && pnpm dev      # NestJS API (watch)
cd apps/web && pnpm dev      # Next.js web (port 3000)
cd apps/mobile && pnpm start # Expo mobile app
```

You can also run package scripts from the repository root by using pnpm in a subfolder or pnpm filter selectors.

## Build

Build all packages/apps:

```bash
pnpm build
```

Build a single app:

```bash
cd apps/web && pnpm build
cd apps/api && pnpm build
```

## Linting & type checking

Run all linters and checks via Turbo:

```bash
pnpm lint
pnpm check-types
```

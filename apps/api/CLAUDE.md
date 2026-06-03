# apps/api

NestJS 11 backend API.

## Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Runtime**: Node.js >=24
- **Linting/Formatting**: Biome (extends root `biome.json`, with `unsafeParameterDecoratorsEnabled: true`)

## Dev server

```bash
pnpm dev   # starts with watch mode (nest start --watch)
```

## Project structure

```
src/
  app.module.ts       # Root module
  app.controller.ts   # Root controller
  app.service.ts      # Root service
  main.ts             # Bootstrap entry point
dist/                 # Compiled output (generated)
```

## Common commands

```bash
pnpm dev          # Start in watch mode
pnpm build        # Compile to dist/
pnpm start        # Run compiled output (node dist/main)
pnpm lint         # Run Biome linter
pnpm check-types  # Type-check without emitting
```

## Important notes

- Decorators require `emitDecoratorMetadata` and `experimentalDecorators` — set via the shared `@repo/typescript-config/nestjs.json` base.
- Register all providers, controllers, and modules in the appropriate NestJS module. NestJS uses dependency injection; do not instantiate services manually.
- `reflect-metadata` is imported at the top of `main.ts` — do not remove it.
- Biome's `unsafeParameterDecoratorsEnabled` is set to `true` in `apps/api/biome.json` to support NestJS parameter decorators.

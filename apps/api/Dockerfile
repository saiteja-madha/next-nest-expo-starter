# syntax=docker.io/docker/dockerfile:1

# Optional: Turbo remote cache credentials (Vercel)
# Build without: docker build -f apps/api/Dockerfile .
# Build with:   docker build --build-arg TURBO_TEAM=... --build-arg TURBO_TOKEN=... -f apps/api/Dockerfile .
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG TURBO_API

# ---- Base ----
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@11.4.0 --activate
WORKDIR /app

# ---- Prune ----
FROM base AS prune
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG TURBO_API
ENV TURBO_TEAM=${TURBO_TEAM}
ENV TURBO_TOKEN=${TURBO_TOKEN}
ENV TURBO_API=${TURBO_API}
RUN npm install -g turbo@2.9.16
COPY . .
RUN turbo prune @repo/api --docker

# ---- Builder ----
FROM base AS builder
RUN apk add --no-cache libc6-compat
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG TURBO_API
ENV TURBO_TEAM=${TURBO_TEAM}
ENV TURBO_TOKEN=${TURBO_TOKEN}
ENV TURBO_API=${TURBO_API}
COPY --from=prune /app/out/json .
RUN pnpm install --frozen-lockfile
COPY --from=prune /app/out/full .
RUN pnpm turbo build --filter=@repo/api
# pnpm deploy flattens production deps into a self-contained directory.
# --legacy is needed because pnpm v10+ requires inject-workspace-packages=true
# in the root config, which our workspace doesn't use.
RUN pnpm --filter=@repo/api deploy --prod --legacy /app/out/prod

# ---- Runner ----
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs nodejs

COPY --from=builder --chown=nodejs:nodejs /app/out/prod /app

USER nodejs
EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

CMD ["node", "dist/main.js"]

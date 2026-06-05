# syntax=docker.io/docker/dockerfile:1

# Optional: Turbo remote cache credentials (Vercel)
# Build without: docker build -f apps/web/Dockerfile .
# Build with:   docker build --build-arg TURBO_TEAM=... --build-arg TURBO_TOKEN=... -f apps/web/Dockerfile .
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
RUN turbo prune @repo/web --docker

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
# Next.js standalone output bundles the server + all deps into a single directory
ENV NEXT_OUTPUT=standalone
RUN pnpm turbo build --filter=@repo/web

# ---- Runner ----
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs nodejs

# Static assets (served directly by Next.js in standalone mode)
COPY --from=builder /app/apps/web/public /app/apps/web/public
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/.next/static /app/apps/web/.next/static

USER nodejs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "apps/web/server.js"]

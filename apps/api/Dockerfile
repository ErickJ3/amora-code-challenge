FROM node:20-alpine AS base

RUN npm install -g pnpm
RUN npm install -g bun

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

FROM base AS development
RUN apk add --no-cache netcat-openbsd
WORKDIR /app
COPY . .
COPY apps/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 4000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["bun", "--watch", "apps/api/app/server.ts"]

FROM base AS build
COPY . .
RUN pnpm --filter=api run build

FROM node:20-alpine AS production

RUN apk add --no-cache netcat-openbsd
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile

COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/drizzle.config.ts ./apps/api/
COPY --from=build /app/apps/api/app ./apps/api/app
COPY --from=build /app/apps/api/app/database/migrations ./apps/api/app/database/migrations

COPY apps/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "apps/api/dist/server.js"]
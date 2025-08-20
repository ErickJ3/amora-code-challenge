FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

FROM base AS development
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["pnpm", "--filter=web", "dev"]

FROM base AS build
COPY . .
RUN pnpm --filter=web build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/apps/web/next.config.js ./apps/web/
COPY --from=build /app/apps/web/package.json ./apps/web/

EXPOSE 3000

CMD ["pnpm", "--filter=web", "start"]
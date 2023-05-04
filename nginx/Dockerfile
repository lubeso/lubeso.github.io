FROM node:19.3.0 AS deps

WORKDIR /usr/src/www

ENV PNPM_VERSION 8.3.1
RUN corepack enable
RUN \
  corepack prepare \
  pnpm@${PNPM_VERSION} \
  --activate

COPY \
  package.json \
  pnpm-lock.yaml \
  tsconfig.json \
  vite.config.ts \
  ./
RUN pnpm i

FROM deps AS builder

COPY src src
COPY styles styles
COPY public public
COPY scripts scripts

RUN pnpm build

FROM nginx:1.24.0 AS runner

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/www/public .

FROM node:18-alpine

WORKDIR /www

COPY public /www

RUN corepack enable

RUN corepack prepare pnpm@latest --activate

RUN pnpm add -D vite

CMD ["pnpm", "vite", "--port", "8000", "--host", "0.0.0.0"]

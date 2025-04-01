# CLAUDE.md - Agent Instructions

## Build & Development Commands
- Build all: `pnpm build`
- Dev all: `pnpm dev`
- Individual builds: `pnpm build:common`, `pnpm build:backend`, `pnpm build:frontend`
- Individual dev: `pnpm dev:common`, `pnpm dev:backend`, `pnpm dev:frontend`

## Lint & Format Commands
- Frontend lint: `cd packages/frontend && pnpm lint`

## Database Commands
- Generate Prisma client: `pnpm prisma:generate`
- Migrate database: `pnpm prisma:migrate`
- Prisma Studio: `pnpm prisma:studio`
- Generate mock data: `pnpm mock-data:generate-all`

## Code Style Guidelines
- Use TypeScript with strict type checking
- Follow ESLint configurations in eslint.config.js
- Use ES modules (import/export) not CommonJS (require)
- Maintain consistent file structure and component naming conventions
- Prefer async/await over raw Promises
- Proper error handling with try/catch blocks
- Use meaningful variable/function names

This project is a monorepo using pnpm workspaces with common, backend, and frontend packages.
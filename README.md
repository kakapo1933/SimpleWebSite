# JKO Assignment

A monorepo project containing frontend, backend, and common shared code.

## Project Structure

```
packages/
  ├── backend/     # Node.js backend with Express and Prisma
  ├── common/      # Shared types and utilities
  └── frontend/    # React frontend with Vite
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [PNPM](https://pnpm.io/) (v10.6.1)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up the database (Prisma):

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

## Development

Run all services in development mode:

```bash
pnpm dev
```

Or run individual services:

```bash
# Run common package in watch mode
pnpm dev:common

# Run backend service
pnpm dev:backend

# Run frontend service
pnpm dev:frontend
```

## Building

Build all packages:

```bash
pnpm build
```

Or build individual packages:

```bash
pnpm build:common
pnpm build:backend
pnpm build:frontend
```

## Database Management

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio
```

## License

[MIT](LICENSE)
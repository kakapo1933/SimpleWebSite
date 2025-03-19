# Simple website

A monorepo project containing frontend, backend, and common shared code.

## Project Structure

```
packages/
  ├── backend/     # Node.js backend with Express and Prisma
  ├── common/      # Shared types and utilities
  └── frontend/    # React frontend with Vite and Tailwind
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [PNPM](https://pnpm.io/) (v10.6.1)
- [PostgreSQL](https://www.postgresql.org/) (Latest stable version recommended)

## Setup

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Environment Configuration:
    - Copy the example environment file:
      ```bash
      cp packages/backend/.env.example packages/backend/.env
      ```
    - Update the `.env` file in `packages/backend` with your database credentials:
      ```bash
      # Database Configuration
      DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE?schema=donation"
      
      # Server Configuration
      PORT=3001
      ```
      Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_DATABASE` with your PostgreSQL credentials.

3. Initialize Prisma:
    ```bash
    pnpm prisma:generate
    ```
   ```bash
    pnpm prisma:migrate
   ```

4. Generate mock data
   ```bash
   pnpm mock-data:generate
   ```

5. Build packages/common
   ```bash
   pnpm build:common
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

Prisma CLI commands:

```bash
    # Generate Prisma client
    pnpm prisma:generate
    
    # Create and apply migrations
    pnpm prisma:migrate
    
    # Launch Prisma Studio
    pnpm prisma:studio
    
    # Reset database
    pnpm prisma migrate reset
    
    # Format schema
    pnpm prisma format
```

For more detailed database management, refer to the [Prisma documentation](https://www.prisma.io/docs/).

## License

[MIT](LICENSE)
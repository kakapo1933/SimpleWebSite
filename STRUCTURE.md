# Project Structure

This project is organized as a monorepo using PNPM workspaces with three main packages:

## Root Directory
- `package.json` - Root package configuration with scripts to manage all packages
- `pnpm-workspace.yaml` - Workspace configuration
- `eslint.config.js` - ESLint configuration for code linting
- `docker-compose.yml` - Docker configuration for development environment

## Packages

### Frontend (`packages/frontend`)
A React application with the following structure:
- `src/`
  - `assets/` - Static assets like images and icons
  - `components/` - Reusable React components
    - `common/` - Shared UI components like Card, List, SearchBar
    - `cart/` - Shopping cart related components
    - `modals/` - Modal dialog components
  - `hooks/` - Custom React hooks
  - `pages/` - Page components (DonationPage, BeveragePage, TodoPage, etc.)
  - `services/` - API service clients
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point

### Backend (`packages/backend`)
An Express.js API server with the following structure:
- `src/`
  - `controllers/` - Request handlers for different resources
  - `models/` - Database model definitions
  - `repositories/` - Data access layer
  - `routes/` - API route definitions
  - `services/` - Business logic layer
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `app.ts` - Express application setup
  - `index.ts` - Server entry point

### Common (`packages/common`)
Shared code between frontend and backend:
- `src/`
  - `types/` - Shared TypeScript type definitions
  - `index.ts` - Package entry point
  - `types.ts` - Main types file

## Configuration Files
- Each package has its own:
  - `package.json` - Dependencies and scripts
  - `tsconfig.json` - TypeScript configuration
  - `.gitignore` - Git ignore rules

## Docker Configuration
The project includes Docker configuration for containerized development and deployment:
- `Dockerfile` in each package
- `docker-compose.yml` in the root
- `docker-readme.md` with instructions for Docker usage 
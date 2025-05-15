# Project Concept

## Overview
This is a full-stack web application built as a monorepo using modern web technologies. The project demonstrates a modular, scalable architecture for building web applications with separate frontend and backend components that share common code.

## Technology Stack

### Frontend
- **React**: UI library for building component-based interfaces
- **TypeScript**: For type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast, modern bundler and development server
- **React Router**: For client-side routing

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for building APIs
- **TypeScript**: For type-safe JavaScript development
- **Prisma**: Next-generation ORM for database access
- **PostgreSQL**: Relational database for data storage

### Infrastructure
- **PNPM Workspaces**: For monorepo package management
- **Docker**: For containerization and deployment
- **ESLint**: For code quality and consistency

## Architecture

The application follows a clean architecture pattern with separation of concerns:

1. **Monorepo Structure**
   - Shared code in the `common` package
   - Decoupled frontend and backend packages
   - Centralized dependency management

2. **Backend Architecture**
   - **Controllers**: Handle HTTP requests and responses
   - **Services**: Implement business logic
   - **Repositories**: Abstract data access
   - **Models**: Define data structures
   - **Routes**: Define API endpoints

3. **Frontend Architecture**
   - **Components**: Reusable UI building blocks
   - **Pages**: Full screen views composed of components
   - **Services**: Handle API communication
   - **Hooks**: Reusable React logic
   - **Utils**: Helper functions

## Key Features
- Todo management system
- Beverage catalog
- Donation system
- Internationalization support

## Development Workflow
The project is set up with a comprehensive development workflow:
- Concurrent development of frontend and backend
- Hot module replacement for fast development
- Shared type definitions between frontend and backend
- Docker containers for consistent environments
- Database migrations and seeding 
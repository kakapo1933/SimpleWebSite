# Guidelines for Junie

**Important**: strictly follow the instructions below:

- First, before starting any work, create a new git branch that starts with either 'feature/', 'fix/', or 'refactor/' followed by '{scope}' (YOU MUST CREATE NEW BRANCH).
- Write down the time stamp of the session start (timestamp format: yyyy-MM-dd_hh-mm).
- Before generating any code, always generate a plan-{timestamp}.md file in the plans folder.
- Use the plan-{timestamp}.md file as an input to generate the detailed enumerated task list.
- Store the task list in a tasks-{timestamp}.md file and place it in the tasks folder.
- Do the work that was submitted with user prompt.
- After each task is done, mark it as completed in the tasks-{timestamp}.md file.
- Run all unit tests to ensure they pass.
- Address any test failures before committing.
- Update README files if necessary.
- All the work should be committed to the branch upon completion, except the 'tasks','plan'-{timestamp}.md file.

# SimpleWebSite Project Guidelines

## Project Overview

SimpleWebSite is a full-stack web application that serves as a donation platform, helping users find and donate to organizations. The application provides a searchable list of organizations with infinite scrolling capabilities. It also includes a beverage ordering system with features like mobile-first design, shopping cart, group ordering, and item customization.

### Technology Stack

- **Frontend**: React with TypeScript, Vite, Tailwind CSS, and i18n for internationalization
- **Backend**: Node.js with Express, TypeScript, and Prisma ORM
- **Database**: PostgreSQL
- **Package Management**: PNPM workspace for monorepo structure

### Key Features

- Browse organizations with infinite scrolling
- Search for organizations by name
- View organization details including name, type, and website
- Internationalization support
- RESTful API with proper error handling
- Database integration with Prisma ORM
- Beverage ordering system with mobile-first design
- Shopping cart functionality
- Group ordering capabilities
- Item customization options
- Multiple payment processing methods

## Project Structure

The project follows a monorepo structure:

```
packages/
  ├── backend/     # Node.js backend with Express and Prisma
  │   ├── src/
  │   │   ├── controllers/  # Request handlers
  │   │   ├── models/       # Prisma schema and client
  │   │   ├── repositories/ # Data access layer
  │   │   ├── routes/       # API routes
  │   │   ├── services/     # Business logic
  │   │   ├── types/        # TypeScript type definitions
  │   │   ├── utils/        # Utility functions
  │   │   ├── app.ts        # Express application setup
  │   │   └── index.ts      # Server entry point
  │   └── scripts/          # Utility scripts (e.g., mock data generation)
  ├── common/      # Shared types and utilities
  │   └── src/             # TypeScript source files
  └── frontend/    # React frontend with Vite and Tailwind
      ├── src/
      │   ├── components/   # Reusable UI components
      │   ├── hooks/        # Custom React hooks
      │   ├── pages/        # Page components
      │   ├── services/     # API service functions
      │   ├── types/        # TypeScript type definitions
      │   ├── utils/        # Utility functions
      │   ├── App.tsx       # Main application component
      │   └── main.tsx      # Application entry point
      └── i18n/             # Internationalization configuration
```

## Development Guidelines

### Setup and Installation

1. Use Node.js v16 or higher
2. Use PNPM v10.6.1 for package management
3. Set up PostgreSQL database and configure environment variables
4. Run `pnpm install` to install all dependencies
5. Build the common package first with `pnpm build:common`

### Coding Standards

1. Follow TypeScript best practices
2. Use ESLint for code linting
3. Maintain consistent code formatting
4. Write meaningful commit messages
5. Document new features and API endpoints

### Testing

1. Write unit tests for critical functionality
2. Test API endpoints thoroughly
3. Ensure responsive design works on various screen sizes

### Deployment

1. Build all packages with `pnpm build`
2. Set up proper environment variables for production
3. Consider using Docker for containerization
4. Implement proper error handling and logging in production

## Additional Resources

For more detailed information, refer to:
- The main README.md file in the project root
- API documentation in the backend package
- Prisma documentation for database management
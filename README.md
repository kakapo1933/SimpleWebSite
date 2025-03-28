# SimpleWebSite Project Guidelines

## Project Overview

SimpleWebSite is a full-stack web application that serves as a donation platform, helping users find and donate to organizations. The application provides a searchable list of organizations with infinite scrolling capabilities. It also includes a beverage ordering system with features like mobile-first design, shopping cart, group ordering, and item customization.

### Technology Stack

- **Frontend**: React with TypeScript, Vite, Tailwind CSS, and i18n for internationalization
- **Backend**: Node.js with Express, TypeScript, and Prisma ORM
- **Database**: PostgreSQL
- **Package Management**: PNPM workspace for monorepo structure

### Key Features

- Welcoming homepage with feature overview and easy navigation
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

## API Documentation

The backend provides the following RESTful API endpoints:

### Organizations API

#### Get Organizations

```
GET /api/v1/organizations
```

Fetches a paginated list of organizations.

**Query Parameters:**
- `limit` (optional): Number of organizations to return (default: 20)
- `offset` (optional): Number of organizations to skip (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Organization Name",
      "organization_type": "Type",
      "website": "https://example.com"
    }
  ],
  "message": "Organizations fetched successfully"
}
```

#### Search Organizations

```
GET /api/v1/organizations/search
```

Searches for organizations based on a search term.

**Query Parameters:**
- `searchTerm` (required): Term to search for
- `similarityThreshold` (optional): Threshold for fuzzy matching (default: 0.2)
- `limit` (optional): Maximum number of results to return (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Organization Name",
      "organization_type": "Type",
      "website": "https://example.com"
    }
  ],
  "message": "Organizations matched successfully"
}
```

## Deployment

### Prerequisites

- A server with Node.js and PostgreSQL installed
- A domain name (optional)
- SSL certificate (recommended for production)

### Production Build

1. Build all packages:
   ```bash
   pnpm build
   ```

2. Set up environment variables for production:
   ```bash
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=donation"

   # Server Configuration
   PORT=3001
   NODE_ENV=production
   ```

3. Start the backend server:
   ```bash
   cd packages/backend
   node dist/index.js
   ```

4. Serve the frontend build:
   You can serve the frontend build using a static file server like Nginx or use a service like Vercel, Netlify, or AWS S3.

### Docker Deployment (Optional)

If you prefer to use Docker, you can create Docker containers for the frontend and backend services.

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Verify database credentials in the `.env` file
   - Check that the database exists and is accessible

2. **Build Errors**
   - Make sure all dependencies are installed: `pnpm install`
   - Ensure the common package is built before other packages: `pnpm build:common`
   - Check for TypeScript errors: `tsc --noEmit`

3. **Runtime Errors**
   - Check the console for error messages
   - Verify that environment variables are set correctly
   - Ensure the backend server is running when using the frontend

## Beverage Ordering System

This project includes a beverage ordering system with the following features:

### Mobile-first Web Page
- Responsive design that works well on mobile devices
- Intuitive navigation menu
- Product browsing with clear categories
- High-quality product images
- Quick-access filters (popular items, new items)

### Shopping Cart
- Add/remove items
- Adjust quantities
- Save items for later
- Calculate subtotals, taxes, and final amount
- Persistent across sessions

### Group Ordering
- Creation of shareable order links
- Order contributor identification
- Individual payment options versus single payment
- Time limits for group contributions
- Order consolidation view

### Item Customization
- Beverage size selection
- Temperature options (hot/cold/warm)
- Sweetness levels
- Ice amount options
- Add-ins (boba, jellies, pudding, etc.)
- Special instructions text field

### Payment Processing
- Credit/debit cards
- Mobile payment solutions (Apple Pay, Google Pay)
- Digital wallets
- Gift cards/loyalty points
- Cash on delivery option

## License

[MIT](LICENSE)
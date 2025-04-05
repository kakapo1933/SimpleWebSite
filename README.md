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
  │   │   ├── tests/        # Test files
  │   │   ├── types/        # TypeScript type definitions
  │   │   ├── utils/        # Utility functions
  │   │   ├── app.ts        # Express application setup
  │   │   └── index.ts      # Server entry point
  │   └── scripts/          # Utility scripts (e.g., mock data generation)
  ├── common/      # Shared types and utilities
  │   └── src/
  │       ├── index.ts      # Entry point for common package
  │       └── types.ts      # Shared type definitions
  └── frontend/    # React frontend with Vite and Tailwind
      ├── src/
      │   ├── assets/       # Static assets (images, fonts, etc.)
      │   ├── components/   # Reusable UI components
      │   ├── hooks/        # Custom React hooks
      │   ├── pages/        # Page components
      │   ├── services/     # API service functions
      │   ├── types/        # TypeScript type definitions
      │   ├── utils/        # Utility functions
      │   ├── App.css       # Main application styles
      │   ├── App.tsx       # Main application component
      │   ├── index.css     # Global styles
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

## Docker Setup

The project includes Docker support for easy deployment and development. Docker allows you to run the entire application stack (frontend, backend, and database) with a single command.

### Prerequisites

- [Docker](https://www.docker.com/get-started) (Latest stable version)
- [Docker Compose](https://docs.docker.com/compose/install/) (Included with Docker Desktop)

### Running with Docker Compose

1. Build and start all services:

   ```bash
   docker-compose up -d
   ```

   This command will:
   - Build the frontend and backend Docker images
   - Start the PostgreSQL database
   - Start the backend API service
   - Start the frontend service

2. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3001/api/v1

3. Stop all services:

   ```bash
   docker-compose down
   ```

4. Stop all services and remove volumes (this will delete the database data):

   ```bash
   docker-compose down -v
   ```

### Docker Commands

```bash
# Build all services
docker-compose build

# Build a specific service
docker-compose build backend
docker-compose build frontend

# View logs
docker-compose logs

# View logs for a specific service
docker-compose logs backend
docker-compose logs frontend

# Restart a service
docker-compose restart backend
```

### Troubleshooting

- If you encounter issues with the database connection, ensure the PostgreSQL container is running:
  ```bash
  docker-compose ps
  ```

- If you need to reset the database:
  ```bash
  docker-compose down -v
  docker-compose up -d
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

    # Pull schema from existing database
    pnpm prisma:pull

    # Reset database
    pnpm prisma migrate reset

    # Format schema
    pnpm prisma format
```

### Mock Data Generation

The project includes scripts to generate mock data for testing:

```bash
    # Generate organization mock data
    pnpm mock-data:generate

    # Generate beverage mock data
    pnpm mock-data:generate-beverage

    # Generate all mock data
    pnpm mock-data:generate-all
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

### Beverages API

#### Get Beverage Categories

```
GET /api/v1/beverages/categories
```

Fetches all beverage categories.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Coffee",
      "description": "Coffee-based beverages"
    }
  ],
  "message": "Beverage categories retrieved successfully"
}
```

#### Get Beverage Category by ID

```
GET /api/v1/beverages/categories/:id
```

Fetches a specific beverage category by ID.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Coffee",
    "description": "Coffee-based beverages"
  },
  "message": "Beverage category retrieved successfully"
}
```

#### Get Beverages

```
GET /api/v1/beverages
```

Fetches beverages based on the provided query parameters.

**Query Parameters:**
- `popular` (optional): Filter by popular beverages
- `new` (optional): Filter by new beverages
- `categoryId` (optional): Filter by category ID

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Espresso",
      "description": "Strong coffee",
      "price": 3.5,
      "categoryId": 1
    }
  ],
  "message": "Beverages retrieved successfully"
}
```

#### Get Beverage by ID

```
GET /api/v1/beverages/:id
```

Fetches a specific beverage by ID.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Espresso",
    "description": "Strong coffee",
    "price": 3.5,
    "categoryId": 1
  },
  "message": "Beverage retrieved successfully"
}
```

### Cart API

#### Get Cart Items

```
GET /api/v1/cart/:sessionId
```

Fetches cart items for a specific session.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "sessionId": "session123",
      "beverageId": 1,
      "quantity": 2,
      "customizations": {},
      "notes": "Extra hot",
      "beverage": {
        "id": 1,
        "name": "Espresso",
        "price": 3.5
      }
    }
  ],
  "message": "Cart items retrieved successfully"
}
```

#### Add Item to Cart

```
POST /api/v1/cart/:sessionId
```

Adds an item to the cart.

**Request Body:**
```json
{
  "beverageId": 1,
  "quantity": 2,
  "customizations": {
    "size": "large",
    "temperature": "hot"
  },
  "notes": "Extra hot"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "sessionId": "session123",
    "beverageId": 1,
    "quantity": 2,
    "customizations": {
      "size": "large",
      "temperature": "hot"
    },
    "notes": "Extra hot"
  },
  "message": "Item added to cart successfully"
}
```

#### Update Cart Item

```
PUT /api/v1/cart/:sessionId/:itemId
```

Updates a cart item.

**Request Body:**
```json
{
  "quantity": 3,
  "customizations": {
    "size": "medium",
    "temperature": "cold"
  },
  "notes": "Less ice"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "sessionId": "session123",
    "beverageId": 1,
    "quantity": 3,
    "customizations": {
      "size": "medium",
      "temperature": "cold"
    },
    "notes": "Less ice"
  },
  "message": "Cart item updated successfully"
}
```

#### Remove Item from Cart

```
DELETE /api/v1/cart/:sessionId/:itemId
```

Removes an item from the cart.

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart successfully"
}
```

#### Clear Cart

```
DELETE /api/v1/cart/:sessionId
```

Clears all items from the cart.

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

### Group Orders API

#### Create Group Order

```
POST /api/v1/group-orders
```

Creates a new group order.

**Request Body:**
```json
{
  "name": "Office Lunch",
  "creatorName": "John Doe",
  "expiresInMinutes": 60
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Office Lunch",
    "shareCode": "ABC123",
    "creatorName": "John Doe",
    "status": "active",
    "expiresAt": "2023-04-01T13:00:00Z",
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  },
  "message": "Group order created successfully"
}
```

#### Get Group Order by Share Code

```
GET /api/v1/group-orders/code/:shareCode
```

Fetches a group order by its share code.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Office Lunch",
    "shareCode": "ABC123",
    "creatorName": "John Doe",
    "status": "active",
    "expiresAt": "2023-04-01T13:00:00Z",
    "orders": []
  },
  "message": "Group order retrieved successfully"
}
```

#### Get Group Order by ID

```
GET /api/v1/group-orders/:id
```

Fetches a group order by its ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Office Lunch",
    "shareCode": "ABC123",
    "creatorName": "John Doe",
    "status": "active",
    "expiresAt": "2023-04-01T13:00:00Z",
    "orders": []
  },
  "message": "Group order retrieved successfully"
}
```

#### Update Group Order Status

```
PATCH /api/v1/group-orders/:id/status
```

Updates the status of a group order.

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "completed",
    "updatedAt": "2023-04-01T12:30:00Z"
  },
  "message": "Group order status updated successfully"
}
```

#### Extend Group Order Expiration

```
PATCH /api/v1/group-orders/:id/extend
```

Extends the expiration time of a group order.

**Request Body:**
```json
{
  "additionalMinutes": 30
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "expiresAt": "2023-04-01T13:30:00Z",
    "status": "active"
  },
  "message": "Group order expiration time extended successfully"
}
```

### Orders API

#### Create Order

```
POST /api/v1/orders
```

Creates a new order.

**Request Body:**
```json
{
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "customerPhone": "123-456-7890",
  "items": [
    {
      "beverageId": 1,
      "quantity": 2,
      "price": 3.5,
      "customizations": {
        "size": "large",
        "temperature": "hot"
      },
      "notes": "Extra hot"
    }
  ],
  "paymentMethod": "credit_card",
  "groupOrderId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customerName": "Jane Doe",
    "customerEmail": "jane@example.com",
    "customerPhone": "123-456-7890",
    "totalAmount": 7.0,
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "credit_card",
    "groupOrderId": 1,
    "items": [
      {
        "id": 1,
        "orderId": 1,
        "beverageId": 1,
        "quantity": 2,
        "price": 3.5,
        "customizations": {
          "size": "large",
          "temperature": "hot"
        },
        "notes": "Extra hot",
        "beverage": {
          "id": 1,
          "name": "Espresso",
          "price": 3.5
        }
      }
    ]
  },
  "message": "Order created successfully"
}
```

#### Get Orders

```
GET /api/v1/orders
```

Fetches all orders.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customerName": "Jane Doe",
      "totalAmount": 7.0,
      "status": "pending",
      "paymentStatus": "pending",
      "items": []
    }
  ],
  "message": "Orders retrieved successfully"
}
```

#### Get Order by ID

```
GET /api/v1/orders/:id
```

Fetches a specific order by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customerName": "Jane Doe",
    "customerEmail": "jane@example.com",
    "customerPhone": "123-456-7890",
    "totalAmount": 7.0,
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "credit_card",
    "groupOrderId": 1,
    "items": []
  },
  "message": "Order retrieved successfully"
}
```

#### Update Order Status

```
PATCH /api/v1/orders/:id/status
```

Updates the status of an order.

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "completed",
    "updatedAt": "2023-04-01T12:30:00Z"
  },
  "message": "Order status updated successfully"
}
```

#### Update Payment Status

```
PATCH /api/v1/orders/:id/payment
```

Updates the payment status of an order.

**Request Body:**
```json
{
  "paymentStatus": "paid",
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "updatedAt": "2023-04-01T12:30:00Z"
  },
  "message": "Payment status updated successfully"
}
```

### Todos API

#### Get All Todos

```
GET /api/v1/todos
```

Fetches all todos.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the SimpleWebSite project",
      "completed": false,
      "createdAt": "2023-04-01T12:00:00Z",
      "updatedAt": "2023-04-01T12:00:00Z"
    }
  ],
  "message": "Todos retrieved successfully"
}
```

#### Get Todo by ID

```
GET /api/v1/todos/:id
```

Fetches a specific todo by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the SimpleWebSite project",
    "completed": false,
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  },
  "message": "Todo retrieved successfully"
}
```

#### Create Todo

```
POST /api/v1/todos
```

Creates a new todo.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the SimpleWebSite project"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the SimpleWebSite project",
    "completed": false,
    "createdAt": "2023-04-01T12:00:00Z",
    "updatedAt": "2023-04-01T12:00:00Z"
  },
  "message": "Todo created successfully"
}
```

#### Update Todo

```
PUT /api/v1/todos/:id
```

Updates a todo.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the SimpleWebSite project with all features",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the SimpleWebSite project with all features",
    "completed": true,
    "updatedAt": "2023-04-01T12:30:00Z"
  },
  "message": "Todo updated successfully"
}
```

#### Delete Todo

```
DELETE /api/v1/todos/:id
```

Deletes a todo.

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

#### Toggle Todo Status

```
PATCH /api/v1/todos/:id/toggle
```

Toggles the completion status of a todo.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "completed": true,
    "updatedAt": "2023-04-01T12:30:00Z"
  },
  "message": "Todo status toggled successfully"
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
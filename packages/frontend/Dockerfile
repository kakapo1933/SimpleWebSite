# Build stage
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.6.1

# Copy package.json files for all workspaces
FROM base AS dependencies
COPY package.json pnpm-workspace.yaml ./
COPY packages/common/package.json ./packages/common/
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN pnpm install

# Build common package
FROM dependencies AS build-common
COPY packages/common ./packages/common
RUN pnpm build:common

# Build frontend
FROM build-common AS build-frontend
COPY packages/frontend ./packages/frontend
# Create a production build
RUN pnpm build:frontend

# Production stage - using Nginx to serve static files
FROM nginx:alpine AS production

# Copy Nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files to Nginx serve directory
COPY --from=build-frontend /app/packages/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
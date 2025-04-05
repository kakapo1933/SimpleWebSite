# Use Node.js LTS as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.6.1

# Copy package.json files for all workspaces
FROM base AS dependencies
COPY package.json pnpm-workspace.yaml ./
COPY packages/common/package.json ./packages/common/
COPY packages/backend/package.json ./packages/backend/

# Install dependencies
RUN pnpm install

# Build common package
FROM dependencies AS build-common
COPY packages/common ./packages/common
RUN pnpm build:common

# Build backend
FROM build-common AS build-backend
COPY packages/backend ./packages/backend
RUN pnpm build:backend

# Generate Prisma client
RUN cd packages/backend && pnpm prisma:generate

# Production image
FROM base AS production

# Set environment variables
ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=build-backend /app/packages/common/dist ./packages/common/dist
COPY --from=build-backend /app/packages/common/package.json ./packages/common/
COPY --from=build-backend /app/packages/backend/dist ./packages/backend/dist
COPY --from=build-backend /app/packages/backend/package.json ./packages/backend/
COPY --from=build-backend /app/packages/backend/src/models/schema.prisma ./packages/backend/src/models/
COPY --from=build-backend /app/node_modules ./node_modules
COPY --from=build-backend /app/packages/backend/node_modules ./packages/backend/node_modules

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD ["node", "packages/backend/dist/index.js"]
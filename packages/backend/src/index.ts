import { app } from './app';
import dotenv from 'dotenv';
import { prisma } from './models/PrismaClient';
import { healthCheck } from './utils/healthCheck';

dotenv.config(); // Initialize environment variables
const port = Number(process.env.PORT) || 3001;

// Start server and capture the server instance
const server = app.listen(port, () => {
  healthCheck(prisma).then(); // Prisma health check
  console.log(`Server running on http://localhost:${port}`);
});

// Handle shutdown gracefully
async function shutdownGracefully(): Promise<void> {
  console.log('Shutdown signal received, shutting down gracefully');

  // Stop accepting new connections
  server.close(async (err) => {
    if (err) {
      console.error('Error while closing the server:', err);
      process.exit(1);
    }

    // Disconnect Prisma
    try {
      await prisma.$disconnect();
      console.log('Prisma client disconnected');
    } catch (error) {
      console.error('Error disconnecting Prisma client:', error);
    }

    process.exit(0);
  });
}

// Listen for SIGTERM and SIGINT signals to initiate graceful shutdown
process.on('SIGTERM', shutdownGracefully);
process.on('SIGINT', shutdownGracefully);

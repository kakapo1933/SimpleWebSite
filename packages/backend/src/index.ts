import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { HealthCheckResponse } from 'common';

// Import routes
import userRoutes from './routes/users';

// Initialize environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Health check endpoint using shared types
app.get('/api/health', async (req, res) => {
  try {
    // Simple check to see if we can query the database
    await prisma.$queryRaw`SELECT 1`;
    const response: HealthCheckResponse = {
      status: 'ok',
      message: 'Database connection successful'
    };
    res.json(response);
  } catch (error) {
    console.error('Database connection error:', error);
    const response: HealthCheckResponse = {
      status: 'error',
      message: 'Database connection failed'
    };
    res.status(500).json(response);
  }
});

// Use routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});
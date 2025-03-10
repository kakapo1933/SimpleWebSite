import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use(router);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500)
  .json({
    message: 'Internal server error.',
    error: err.message
  });
});

export { app };
export default app;
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeDb } from './db';
import authRoutes from './routes/auth';
import programRoutes from './routes/programRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Add a simple test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Program routes
app.use('/api', programRoutes);

// Bookmark routes
app.use('/api/bookmarks', bookmarkRoutes);

const PORT = 3001;

// Initialize the database before starting the server
initializeDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend API listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

export default app;

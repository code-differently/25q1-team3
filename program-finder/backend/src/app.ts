import express from 'express';
import cors from 'cors';
import programRoutes from './routes/programRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api', programRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Yaaayy!!!  Backend API is running' });
});

export default app;

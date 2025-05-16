import express from 'express';
import programRoutes from './routes/programRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';

const app = express();

app.use(express.json());
app.use('/api', programRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Yaaayy!!!  Backend API is running' });
});

export default app;

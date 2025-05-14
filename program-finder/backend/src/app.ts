import express from 'express';
import programRoutes from './routes/programRoutes';

const app = express();

app.use(express.json());
app.use('/api', programRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running 🎉' });
});

export default app;

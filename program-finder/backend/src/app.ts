import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running 🎉' });
});

export default app;

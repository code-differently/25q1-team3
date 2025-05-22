import app from './app';
import { initializeDb } from './db';

const PORT = process.env.PORT || 3001;

// Initialize the database before starting the server
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});
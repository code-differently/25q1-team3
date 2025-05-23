import app from './app';
import { initializeDb } from './db';

const app = express();

app.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
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
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});
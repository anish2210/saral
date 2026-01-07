import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './config/db.js';
import onboardingRoutes from './routes/onboarding.js';
import studentRoutes from './routes/students.js';
import paymentRoutes from './routes/payments.js';
import publicRoutes from './routes/public.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (public)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Public routes (no auth required) - must be before clerkMiddleware
app.use('/api/public', publicRoutes);

// Clerk middleware for authenticated routes
app.use(clerkMiddleware());

// Protected routes
app.use('/api', onboardingRoutes);
app.use('/api/students', studentRoutes);
app.use('/api', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

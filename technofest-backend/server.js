require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');

// ✅ Use require consistently (no import)
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
// Use the router that exports an Express router instance
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Warn if JWT secret is missing
if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set. JWT verification will fail. Set it in .env');
}

// Middleware
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));

// Security headers configuration
app.use((req, res, next) => {
    // Allow popups for Google Sign-In
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    // Additional security headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
});
// ------------------------------------------------------------------

// Health check
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// The immediate database connection check is removed to prevent crashes on Vercel.
// The app will start, but API routes will fail until a cloud database is configured.

// Root route
app.get('/', (req, res) => res.send('Server is running'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
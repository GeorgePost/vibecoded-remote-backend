const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { rokuRouter } = require('./routes/roku.routes');
const { errorHandler } = require('./middleware/error.middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // limit each IP to 100 requests per windowMs
});

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

// Routes
app.use('/api/roku', rokuRouter);

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port} in ${process.env.NODE_ENV} mode`);
}); 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ── Security & Utility Middleware ────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: false,   // allow images
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://amankr0075.github.io']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Routes ───────────────────────────────────────────────────
app.use('/api/health', require('./routes/health'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/payment', require('./routes/payment'));

// ── 404 catch-all ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global error handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
🚀 Royal Spice Restaurant API
────────────────────────────────
  Environment : ${process.env.NODE_ENV || 'development'}
  Server URL  : http://localhost:${PORT}
  Health      : http://localhost:${PORT}/api/health
────────────────────────────────
  `);
});

module.exports = app;

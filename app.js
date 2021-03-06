const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Route files
const users = require('./routes/users');
const rentals = require('./routes/rentals');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initialize App variable
const app = express();

// Use CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorizations'],
  credentials: true,
};
// app.use(cors({ origin: 'http://localhost:5500' }));
app.use(cors(corsOptions));

// Body Parses
app.use(express.json());

// Add dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/rentals', rentals);
app.use('/api/v1/user', users);

// Error Handler Middleware
app.use(errorHandler);

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} env on port ${PORT}`.yellow.bold));

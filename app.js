const express = require('express');
const dotenv = require('dotenv');

// Route files
const users = require('./routes/users');

// Middleware Logger
const morgan = require('morgan');

// Load environment variables
dotenv.config({path: './config/config.env'});

// Initialize App variable
const app = express();

// Add dev logging middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/user', users);


// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} env on port ${PORT}`));
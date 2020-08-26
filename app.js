const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors')

// Route files
const users = require('./routes/users');
const { json } = require('express');

// Load environment variables
dotenv.config({path: './config/config.env'});

// Initialize App variable
const app = express();

// Body Parses
app.use(express.json());

// Add dev logging middleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/user', users);


// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} env on port ${PORT}`.yellow.bold));
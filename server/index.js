// index.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const database = require('./database/config'); // Import the database connection

// Redis client
const redisClient = require('./redis/redisClient'); // Import the Redis client

// Importing routes
const userRoutes = require('./router/userInfoRouter'); // Router for user info

// Routes
app.use('/api', userRoutes); // Use user routes || user info details router

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = 9009;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




const express = require('express');
const cors = require('cors');
const app = express();

// Middleware for CORS
//Cross-Origin Resource Sharing 
// By default, a web page can only make requests to the same origin 
app.use(cors());

// Middleware to parse JSON requests
//convert into the javascript object
app.use(express.json());

//database
const database = require('./database/config'); // Import the database connection



//importing routes
const userRoutes = require('./router/userInfoRouter');// router for user info



// Routes
app.use('/api', userRoutes); // Use user routes || userinfo details router






// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = 9009;
app.listen(port, () => {
    console.log("Server is running on port", port);
});

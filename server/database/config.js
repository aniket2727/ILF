const mongoose = require('mongoose');

// MongoDB connection URL using loopback address
const dbURI = 'mongodb://127.0.0.1:27017/efood'; // Your actual database name

// Connect to MongoDB
mongoose.connect(dbURI);

// Event listeners for connection
mongoose.connection.on('connected', () => {
   // console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
   // console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
   // console.log('Mongoose disconnected');
});

// Handling application termination
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
       // console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

// Export mongoose if needed
module.exports = mongoose;

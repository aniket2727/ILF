// routes/userRoutes.js
const express = require('express');
const { registerUser } = require('../controller/userInfoController');
const validateUserRegistration = require('../middleware/userInfoValidationMiddleware'); // Use require for CommonJS
const router = express.Router();

// POST route for user registration with validation middleware
router.post('/register', validateUserRegistration, registerUser);

module.exports = router;

// routes/userRoutes.js
const express = require('express');
const { registerUser } = require('../controller/userInfoController');
const { loginUserController}=require('../controller/loginUserController');
const validateUserRegistration = require('../middleware/userInfoValidationMiddleware'); // Use require for CommonJS
const validateUserLogin=require('../middleware/loginValidationMiddleware')
const router = express.Router();

// POST route for user registration with validation middleware
router.post('/register', validateUserRegistration, registerUser);
router.post('/login',validateUserLogin, loginUserController);

module.exports = router;

const axios = require('axios');
const User = require('../database/schema/userInfoSchema');
const redisClient = require('../redis/redisClient');

// Register User Controller
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email exists in Redis cache asynchronously
        const cachedEmail = await redisClient.get(email);

        if (cachedEmail) {
            return res.status(400).json({ message: 'User already exists (cached)' });
        }

        // Check if user exists in MongoDB
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Cache the email in Redis for future use
            await redisClient.set(email, email); // Use async/await for Redis
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using the microservice
        const response = await axios.post('http://localhost:5000/hash-password', { password });

        if (response.status !== 200) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const hashedPassword = response.data.hashed_password;

        // Create new user
        const userCount = await User.countDocuments(); // Get current user count
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Use the hashed password
            userId: userCount + 1, // Assign userId based on current count
        });

        await newUser.save();

        // Cache the new email in Redis asynchronously
        await redisClient.set(email, email);

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
};

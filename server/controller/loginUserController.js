const axios = require('axios');
const User = require('../database/schema/userInfoSchema');
const bcrypt = require('bcrypt');
const redisClient = require('../redis/redisClient'); // Import Redis client

const loginUserController = async (req, resp) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in Redis cache
        const cachedUser = await redisClient.get(email);
        if (cachedUser) {
            try {
                const userData = JSON.parse(cachedUser); // Parse the cached user data
                const isPasswordValid = await bcrypt.compare(password, userData.password);

                if (!isPasswordValid) {
                    return resp.status(401).json({ message: 'Invalid email or password' });
                }

                // Successful login with cached data
                return resp.status(200).json({ message: 'Login successful (from cache)', user: { name: userData.name, email: userData.email } });
            } catch (parseError) {
                console.error('Error parsing cached user data:', parseError);
                // If parsing fails, fallback to checking in MongoDB
            }
        }

        // If not in Redis, check in MongoDB
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(401).json({ message: 'Invalid email or password' });
        }

        // Hash the input password to compare with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return resp.status(401).json({ message: 'Invalid email or password' });
        }

        // Cache the user data in Redis for future use (without password)
        await redisClient.set(email, JSON.stringify({ name: user.name, email: user.email, password: user.password }));

        // Set expiration for the cached data (optional, e.g., 1 hour)
        await redisClient.expire(email, 3600); // Expire in 1 hour

        // Successful login with MongoDB data
        return resp.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error);
        return resp.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginUserController,
};

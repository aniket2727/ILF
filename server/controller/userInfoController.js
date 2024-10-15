// controllers/userController.js
const User = require('../database/schema/userInfoSchema');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const userCount = await User.countDocuments(); // Get current user count
        const newUser = new User({
            name,
            email,
            password, // Note: Hash the password before saving in a real application
            userId: userCount + 1, // Assign userId based on current count
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
};

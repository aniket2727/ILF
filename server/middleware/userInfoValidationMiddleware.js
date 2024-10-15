// middlewares/validateUser.js

const validateUserRegistration = (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if any field is empty
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // If all checks pass, proceed to the next middleware/controller
    next();
};

module.exports = validateUserRegistration;

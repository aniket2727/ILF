// loginUserController.js

const axios = require('axios');
const User = require('../database/schema/userInfoSchema');
const bcrypt = require('bcrypt');



const loginUserController = async (req, resp) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(401).json({ message: 'Invalid email or password' });
        }

        // Hash the input password to compare with stored hash (no need for external API call)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return resp.status(401).json({ message: 'Invalid email or password' });
        }

        // Successful login
        return resp.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        return resp.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    loginUserController,
};

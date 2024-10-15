


const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        unique: true
    }
});

// Pre-save hook to assign userID based on the ObjectId
userSchema.pre('save', function(next) {
    if (!this.userID) {
        // Set userID to the string representation of the _id
        this.userID = this._id.toString();
    }
    next();
});

// Create the user model
const User = mongoose.model('userRegisterDetails', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    age: {
        type: Number, // Changed from int to Number
        required: false,
    },
    roleId: {
        type: Number,
        ref: 'Role',
        default: 1 // Default to 'user' role
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);

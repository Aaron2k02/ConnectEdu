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
    fullName: {
        type: String,
        required: false,
        unique: true
    },
    phoneNumber: {
        type: Number, // Changed from int to Number
        required: false,
    },
    roleId: {
        type: String,
        default: "1" // Changed from defaultValue to default, and wrapped 1 in quotes
    },
    password: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);

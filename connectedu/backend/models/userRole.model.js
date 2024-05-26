const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    roleId: {
        type: Number,  // Changed from 'number' to 'Number'
        required: true,
        unique: true  // Ensure roleId is unique
    },
    name: {
        type: String,
        required: true,
        unique: true  // Ensure role name is unique
    }
}, {
    timestamps: false
});

module.exports = mongoose.model("Role", userRoleSchema);

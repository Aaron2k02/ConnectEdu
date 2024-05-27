// userProfile.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    skills: {
        type: String,
        required: false,
    },
    qualifications: {
        type: String,
        required: false,
    },
    professionalExperience: {
        type: String,
        required: false,
    },
    educationalBackground: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("UserProfile", userProfileSchema);

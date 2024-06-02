const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    shortTitle: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: [String],
        required: false,
    },
    educatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    topics: {
        type: [String],
        required: false,
    },
    courseDuration: {
        type: Number,
        required: true,
    },
    rateCount: {
        type: Number,
        default: 0,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    totalSales: {
        type: Number,
        default: 0,
    },
    adminFeedback: {
        type: String,
        required: false,
        default: "No feedback available",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);

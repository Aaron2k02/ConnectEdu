const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    courseId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
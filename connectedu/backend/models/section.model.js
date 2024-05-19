const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    videoTitle: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    durationMinutes: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Section", sectionSchema);

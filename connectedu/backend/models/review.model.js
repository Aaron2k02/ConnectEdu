import mongoose from 'mongoose';
const { Schema } = mongoose;

const CourseSectionSchema = new Schema({
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

export default mongoose.model("User", CourseSectionSchema);
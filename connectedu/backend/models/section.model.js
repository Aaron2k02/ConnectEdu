import mongoose from 'mongoose';
const { Schema } = mongoose;

const SectionSchema = new Schema({
    title: {
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
        type: String,
        required: true,
    },
    durationMinutes: {
        type: int,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("Section", SectionSchema);
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    courseId: {
        type: String,
        required: true,
    },
    sectionId: {
        type: String,
        required: true,
    },
    sectionTitle: {
        type: String,
        required: true,
    },
    sectionVideoId: {
        type: String,
        required: true,
    },
    sectionVideoTitle: {
        type: String,
        required: true,
    },
    sectionDescription: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("User", ReviewSchema);
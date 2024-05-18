import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: float,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    thumbnailUrl: {
        type: [String],
        default: 0,
    },
    educatorId: {
        type: String,
        require: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    topics: {
        type: [String],
        require: false
    },
    rateCount: {
        type: int,
        require: false,
    },
    totalStars: {
        type: int,
        require: false,
    },
    totalSales: {
        type: int,
        require: false,
    },
    adminFeedback: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
});

export default mongoose.model("Course", courseSchema);
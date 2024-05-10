import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
    userID: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true,
    },
    shortTitle: {
        type: String,
        require: true,
    },
    shortDescription: {
        type: String,
        require: true,
    },
    totalHours: {
        type: Number,
        require: true,
    },
    coverages: {
        type: [String],
        require: false,
    }, 
    sales: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model("User", courseSchema);
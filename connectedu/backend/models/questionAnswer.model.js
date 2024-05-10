import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionAnswer = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

export default mongoose.model("User", ReviewSchema);
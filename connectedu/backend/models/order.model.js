import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
    courseId: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // to indentify the seller info
    sellerId: {
        type: String,
        required: true,
    },
    // to identify tge buyer info 
    buyerId: {
        type: String,
        required: true,
    },
    // after proper payment this field will be updated 
    isCompleted: {
        type: String,
        required: true,
    },
    payment_intent: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("User", OrderSchema);
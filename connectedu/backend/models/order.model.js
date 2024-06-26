const mongoose = require('mongoose');
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
        ref: 'User',
        required: true,
    },
    // to identify tge buyer info 
    buyerId: {
        type: String,
        ref: 'User',
        required: true,
    },
    // after proper payment this field will be updated 
    isCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    payment_intent: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);
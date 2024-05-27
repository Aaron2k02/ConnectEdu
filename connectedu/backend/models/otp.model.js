const mongoose = require('mongoose');
const { Schema } = mongoose;

const OTPSchema = new Schema({
    email:{type:String, unique:true},
    otp:String,
    createdAt:Date,
    expiresAt:Date,
});

module.exports = mongoose.model("Otp", OTPSchema);
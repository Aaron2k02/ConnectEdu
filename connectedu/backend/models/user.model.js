import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        defaultValue: 'user'
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
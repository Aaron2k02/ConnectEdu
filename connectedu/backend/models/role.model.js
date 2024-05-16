import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new Schema({
    id: {
        type: number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: false
});

export default mongoose.model("Role", RoleSchema);
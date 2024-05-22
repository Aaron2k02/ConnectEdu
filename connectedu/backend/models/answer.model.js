const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true,
        default: ""
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    responderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);
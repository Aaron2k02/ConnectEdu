const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionAnswerSchema = new Schema({
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
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: false,
        default:"No Answer"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('QuestionAnswer', questionAnswerSchema);
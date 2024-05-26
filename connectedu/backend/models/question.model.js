const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    askerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
}
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);

const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const Course = require('../models/course.model');

const askQuestion = async (req, res, next) => {
    try {
        const { content, courseId } = req.body;
        const askerId = req.userId;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if there's an existing question by this user for this course
        let question = await Question.findOne({ courseId: courseId, askerId: askerId });

        if (question) {
            // If question exists, update the content
            question.content = content;
            await question.save();
        } else {
            // If no question exists, create a new one
            question = new Question({
                content: content,
                courseId: courseId,
                askerId: askerId,
            });

            await question.save();

            // Automatically create an answer with default content "No Answer"
            const answer = new Answer({
                content: "No Answer",
                questionId: question._id,
                responderId: course.educatorId,
            });
            await answer.save();

            // Update question with the answerId
            question.answerId = answer._id;
            await question.save();
        }

        res.status(200).json({ question });
    } catch (err) {
        next(err);
    }
};

const respondToQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params;
        const { content } = req.body;
        const responderId = req.userId;

        // Check if the question exists
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Find the answer associated with the question
        const answer = await Answer.findOne({ questionId });

        if (!answer) {
            // If no answer exists, create a new one
            const newAnswer = new Answer({ content, questionId, responderId });
            await newAnswer.save();
            res.status(201).json(newAnswer);
        } else {
            // Update the existing answer's content
            answer.content = content;
            await answer.save();
            res.status(200).json(answer);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
};

const getQuestionAndAnswer = async (req, res, next) => {
    try {
        const { questionId } = req.params;

        // Find the question
        const question = await Question.findById(questionId).populate('askerId').populate('courseId');
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Find the answer associated with the question
        const answer = await Answer.findOne({ questionId });

        res.status(200).json({ question, answer });
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
};

const getQuestions = async (req, res, next) => {
    try {
        const userId = req.userId;

        const answers = await Answer.find({ responderId: userId });
        const questionIds = answers.map(answer => answer.questionId);

        const questionsAsResponder = await Question.find({ _id: { $in: questionIds } })
            .populate('answerId')
            .populate('courseId')  // Populate the course details
            .populate('askerId');

        const questionsAsAsker = await Question.find({ askerId: userId })
            .populate('answerId')
            .populate('courseId')  // Populate the course details
            .populate('askerId');

        const combinedQuestions = [...questionsAsAsker, ...questionsAsResponder];

        const uniqueQuestionsMap = new Map();
        combinedQuestions.forEach(question => uniqueQuestionsMap.set(question._id.toString(), question));
        const uniqueQuestions = Array.from(uniqueQuestionsMap.values());

        res.status(200).json(uniqueQuestions);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Other functions remain unchanged
module.exports = { askQuestion, respondToQuestion, getQuestionAndAnswer, getQuestions };

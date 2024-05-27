const Review = require("../models/review.model.js");
const Course = require("../models/course.model.js");
const Role = require("../models/userRole.model.js");
const { createError } = require("../utils/createError.js");

const createReview = async (req, res, next) => {

    try {

        const courseId = req.body.courseId;

        const course = await Course.findById(courseId);

 
        if (course.educatorId.toString() === req.userId) {
            return next(createError(403, "You cannot rate your own course!"));
        }

        const newReview = new Review({
            userId: req.userId,
            courseId: req.body.courseId,
            rating: req.body.rating,
            content: req.body.content,
        })

        const existingReview = await Review.findOne({
            courseId: courseId,
            userId: req.userId,
        })

        // create condition if the user has already purchased the course using the order model
        if (existingReview) return next(createError(403, "You have already created a review for this course!"));

        const savedReview = await newReview.save();

        res.status(201).send(savedReview);

        await Course.findByIdAndUpdate(courseId, { $inc: { totalStars: req.body.rating, rateCount: 1 } });

    } catch (err) {

        return next(createError(500, "Something went wrong!"));

    }
};

const getReviews = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;

        const reviews = await Review.find({ courseId: courseId }).populate('userId', 'photoUrl username');

        res.status(201).send(reviews);

    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

const deleteReview = async (req, res, next) => {
    try {

    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

module.exports = { createReview, getReviews, deleteReview };
const Order = require("../models/order.model.js");
const { createError } = require("../utils/createError");
const Course = require("../models/course.model.js");
const User = require("../models/user.model");

const createOrder = async (req, res, next) => {
    try {

        const course = await Course.findById(req.params.courseId);

        const userInfo = await User.findById(req.userId);

        if (userInfo._id.toString() === course.educatorId.toString()) {
            return next(createError(403, "You cannot purchase your own course!"));
        }

        // Check if the user has already purchased this course
        const existingOrder = await Order.findOne({
            courseId: course._id,
            buyerId: req.userId,
            isCompleted: true, 
        });

        if (existingOrder) {
            return next(createError(403, "You have already purchased this course!"));
        }

        // res.status(200).send(req.params.courseId);
        const newOrder = new Order({
            courseId: course._id,
            img: course.thumbnailUrl[0],
            title: course.title,
            buyerId: req.userId,
            sellerId: course.educatorId,
            price: course.price,
            payment_intent: "Temporary",
        });

        await newOrder.save();

        res.status(200).send("Successfully");

    } catch (err) {
        next(err);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            $or: [
                { buyerId: req.userId },
                { sellerId: req.userId }
            ],
            isCompleted: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};

const getPurchasedCourses = async (req, res, next) => {
    try {
        // Find orders where the user is the buyer and the order is completed
        const orders = await Order.find({
            buyerId: req.userId,
            isCompleted: true,
        });

        // Get course details for these orders
        const courseIds = orders.map(order => order.courseId);
        const courses = await Course.find({ _id: { $in: courseIds } });

        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getPurchasedCourses,
};
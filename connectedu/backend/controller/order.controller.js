const Order = require("../models/order.model.js");
const { createError } = require("../utils/createError");
const Course = require("../models/course.model.js");
const User = require("../models/user.model");
const Stripe = require("stripe");

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

const checkOutSession = async (req, res, next) => {

    const stripe = new Stripe(process.env.STRIPE)

    const course = await Course.findById(req.params.courseId);

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.price * 100,
            currency: "myr",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // res.status(200).send({ paymentIntent });

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
            payment_intent: paymentIntent.id,
        });

        await newOrder.save();

        // res.status(200).send([paymentIntent.client_secret] );

        res.status(200).send({ clientSecret: paymentIntent.client_secret });

    } catch (err) {
        next(err);
    }
};

const confirmCheckOutSession = async (req, res, next) => {
    try {
        // Find orders where the user is the buyer and the order is completed
        const orders = await Order.findOneAndUpdate({
                payment_intent: req.body.payment_intent
            },
            {
                $set: {
                    isCompleted: true
                }
            }
        )
        res.status(200).json("Order has been confirmed!");
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOrders,
    getPurchasedCourses,
    checkOutSession,
    confirmCheckOutSession
};

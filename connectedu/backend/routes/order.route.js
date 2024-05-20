const express = require("express");
const { verifyToken } = require("../middleware/jwt");
const {
    createOrder,
    getOrders,
    getPurchasedCourses
} = require("../controller/order.controller.js");

const router = express.Router();

router.post("/:courseId", verifyToken, createOrder);

router.get("/", verifyToken, getOrders);

router.get("/purchasedCourses", verifyToken, getPurchasedCourses);

module.exports = router;
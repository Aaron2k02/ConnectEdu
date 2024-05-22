const express = require("express");
const { verifyToken } = require("../middleware/jwt");
const {
    getOrders,
    getPurchasedCourses,
    checkOutSession,
    confirmCheckOutSession
} = require("../controller/order.controller.js");

const router = express.Router();

router.get("/", verifyToken, getOrders);

router.get("/purchasedCourses", verifyToken, getPurchasedCourses);

router.post("/create-checkout-session/:courseId", verifyToken, checkOutSession);

router.put("/", verifyToken, confirmCheckOutSession);

module.exports = router;
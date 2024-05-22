const express = require("express");
const { verifyToken } = require("../middleware/jwt");
const router = express.Router();
const {
    createReview,
    getReviews,
    deleteReview
} = require ("../controller/review.controller.js");

router.post("/", verifyToken, createReview);

router.get("/:courseId", getReviews);

router.delete("/:courseId", deleteReview);

module.exports = router;
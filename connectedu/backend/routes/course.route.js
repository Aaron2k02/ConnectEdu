const express = require("express");
const {
    createCourse,
    deleteCourse,
    getCourse,
    getCourses,
    getCourseSections
} = require("../controller/course.controller.js");
const { verifyToken } = require("../middleware/jwt.js");

const router = express.Router();

router.post("/", verifyToken, createCourse);

router.delete("/:id", verifyToken, deleteCourse);

router.get("/single/:id", verifyToken, getCourse);

// Public access routes
router.get("/", getCourses);

router.get('/:id/sections', verifyToken, getCourseSections);

module.exports = router;

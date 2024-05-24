const express = require("express");
const {
    createCourse,
    manageCourse,
    deleteCourse,
    getCourse,
    getCourses,
    getMyCourses,
    getCourseSections,
    updateCourseFeedback
} = require("../controller/course.controller.js");
const { verifyToken } = require("../middleware/jwt.js");

const router = express.Router();

// router.post("/", verifyToken, createCourse);

router.post("/", verifyToken, manageCourse);

router.get('/myCourses', verifyToken, getMyCourses);  // Educator-specific courses

router.delete("/:id", verifyToken, deleteCourse);

router.get("/single/:id", verifyToken, getCourse);

// Public access routes
router.get("/", getCourses);

router.get('/:id/sections', verifyToken, getCourseSections);

router.put('/feedback/:id', verifyToken, updateCourseFeedback);

module.exports = router;

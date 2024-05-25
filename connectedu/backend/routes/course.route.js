const express = require("express");
const {
    manageCourse,
    deleteCourse,
    getCourse,
    getCourses,
    getMyCourses,
    getCourseSections,
    updateCourseFeedback,
    getCourseCounts,
    getApprovedCourses,
    courseApproval
} = require("../controller/course.controller.js");
const { verifyToken } = require("../middleware/jwt.js");

const router = express.Router();

router.post("/", verifyToken, manageCourse);

router.get('/myCourses', verifyToken, getMyCourses);  // Educator-specific courses

router.delete("/:id", verifyToken, deleteCourse);

router.get("/single/:id", verifyToken, getCourse);

// Public access routes
router.get("/", getApprovedCourses);

router.get("/all", verifyToken, getCourses);

router.get('/:id/sections', verifyToken, getCourseSections);

router.post('/feedback/:id', verifyToken, updateCourseFeedback);

router.get('/counts', verifyToken, getCourseCounts);

router.put('/approval', verifyToken, courseApproval)

module.exports = router;

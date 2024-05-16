const express = require("express");
const { deleteCourse } = require("../controller/course.controller.js");

const router = express.Router();

router.get("/test", deleteCourse);

module.exports = router;

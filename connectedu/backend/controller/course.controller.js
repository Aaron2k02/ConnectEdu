const Course = require("../models/course.model.js");
const { createError } = require("../utils/createError");
const Section = require("../models/section.model.js");
const Role = require("../models/userRole.model.js");

const createCourse = async (req, res, next) => {
    try {
        // Find the user by ID
        // Find the user's role by ID
        const userRole = await Role.findOne({ roleId: req.roleId });

        // res.status(201).json(userRole.name);

        if (userRole.name !== "Educator") {
            return next(createError(403, "You are not authorized to create a course."));
        }

        const { sections, ...courseData } = req.body;

        // Proceed to create the course
        const newCourse = new Course({
            educatorId: req.userId,
            ...courseData,
        });

        try {
            const savedCourse = await newCourse.save();

            if (sections && sections.length > 0) {
                const sectionPromises = sections.map(section => {
                    return new Section({
                        ...section,
                        courseId: savedCourse._id,
                    }).save();
                });

                await Promise.all(sectionPromises);
            }

            res.status(201).json(savedCourse);
        } catch (err) {
            next(err);
        }

    } catch (err) {
        next(err);
    }
};

const deleteCourse = async (req, res, next) => {
    // Implement delete course logic
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course) {
            return next(createError(404, "Course not found!"));
        }
        
        // Check if the educatorId matches the userId from the token 
        if (course.educatorId.toString() !== req.userId) {
            return next(createError(403, "You can delete only your course!"));
        }

        // Delete all sections associated with the course
        await Section.deleteMany({ courseId });

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        res.status(200).send("Course has been deleted!");
    } catch (err) {
        next(err);
    }
};

const getCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return next(createError(404, "Course not found!"));
        }

        // Find the sections associated with the course
        const sections = await Section.find({ courseId });

        res.status(200).json({
            course,
            sections
        });
    } catch (err) {
        next(err);
    }
};

const getCourses = async (req, res, next) => {

    const query = req.query;

    const filters = {
        // fetch the user's course
        ...(query.userId && { userId: query.userId }),
        // spread the object to return the respective results only if there is input from end-user
        ...(query.category && {category: query.category}),
        //  $option: "i" remove case sensitive search
        ...(query.search && {title: { $regex: query.search, $options: "i" }}),
    }
    
    try {
        // Find courses created by the authenticated || user { educatorId: req.userId }
        const courses = await Course.find(filters).sort({ [query.sort]: -1});

        if (courses.length === 0) {
            return next(createError(404, "No courses found for this educator."));
        }

        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCourse,
    deleteCourse,
    getCourse,
    getCourses,
};

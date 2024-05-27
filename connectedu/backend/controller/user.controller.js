const User = require("../models/user.model");
const Role = require("../models/userRole.model.js");
const UserProfile = require("../models/userProfile.model.js");
const { createError } = require("../utils/createError.js");

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Delete user profile associated with the user
        await UserProfile.findOneAndDelete({ userId });

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return next(createError(404, "User not found!"));
        }

        res.status(200).send("User and associated profile have been deleted");
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Fetch user and user profile
        const user = await User.findById(userId);
        const userProfile = await UserProfile.findOne({ userId });

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        res.status(200).send({ user, userProfile });
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

const getUsers = async (req, res, next) => {
    try {
        const userRole = await Role.findOne({ roleId: req.roleId });
        if (!userRole || userRole.name !== "Admin") {
            return next(createError(403, "You are not authorized to get this information."));
        }

        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

const getUserCounts = async (req, res, next) => {
    try {
        
        const totalUsers = await User.countDocuments({ roleId: { $in: [1, 2] } });
        const pendingApplications = await User.countDocuments({ educatorApplication: true });
        const educators = await User.countDocuments({ roleId: 2 });

        res.status(200).json({
            totalUsers,
            pendingApplications,
            educators
        });
    } catch (err) {
        next(createError(500, "Something went wrong!"));
    }
};

const updateUserRole = async (req, res, next) => {

    try {

        const { userId, newRoleId } = req.body;

        const userRole = await Role.findOne({ roleId: req.roleId });

        if (!userRole || userRole.name !== "Admin") {
            return next(createError(403, "You are not authorized to update the user role."));
        }

        const user = await User.findById(userId);

        user.roleId = newRoleId;

        await user.save();

        res.status(200).send("User role has been updated");

    } catch (err) {

        return next(createError(500, "Something went wrong!"));

    }
};

const applyEducator = async (req, res) => {
    
    try {
        const userId = req.userId;
        const { skills, qualifications, professionalExperience, educationalBackground } = req.body;

        const userProfile = await UserProfile.findOneAndUpdate(
            { userId },
            { skills, qualifications, professionalExperience, educationalBackground },
            { new: true, runValidators: true }
        );

        const user = await User.findByIdAndUpdate(
            userId,
            { educatorApplication:true},
            { new: true } // Return the updated document
        );

        if (!userProfile) {
            return res.status(404).send("Profile not found!");
        }

        if(!user){
            return res.status(404).send("User not found!");
        }

        res.status(200).send("Profile updated successfully!");
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
};

const getEducators = async (req, res, next) => {
    try {
        const educators = await User.find({ roleId: 2 }); // Assuming roleId 2 represents educators
        const educatorsWithProfile = await Promise.all(educators.map(async educator => {
            const profile = await UserProfile.findOne({ userId: educator._id });
            return { ...educator.toObject(), profile };
        }));
        res.status(200).json(educatorsWithProfile);
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

module.exports = { deleteUser, getUser, getUsers, getUserCounts, updateUserRole, applyEducator, getEducators};

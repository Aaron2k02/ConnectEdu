const User = require("../models/user.model");
const UserProfile = require("../models/userProfile.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require("../utils/createError");

const register = async (req, res, next) => {
    try {
        // Hash the password with bcrypt
        const hash = bcrypt.hashSync(req.body.password, 5);

        // Create the new user with the hashed password
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();

        const newUserProfile = new UserProfile({
            userId: newUser._id,
            skills: [],
            qualifications: "",
            professionalExperience: "",
            educationalBackground: "",
        });

        await newUserProfile.save();

        const userData = {
            ...newUser._doc,
            profile: newUserProfile,
        };

      
        res.status(201).json(userData);


        res.status(201).send("User has been created and profile has been set up!");
    } catch (err) {
        next(err)
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) {
            return next(createError(400, "Wrong password or username!"));
        }

        const token = jwt.sign({
            id: user._id,
            roleId: user.roleId
        }, process.env.JWT_KEY)

        const userProfile = await UserProfile.findOne({ userId: user._id });
        
        if (!userProfile) {
            return next(createError(404, "User profile not found!"));
        }

        const { password, ...info } = user._doc;

        const userWithProfile = {
            ...info,
            profile: userProfile._doc,
        };

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(userWithProfile);
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

// Middleware and other routes
const logout = (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    }).status(200).send("user has been logged out!");
};

const updateUserProfile = async (req, res) => {
    
    try {
        const { userId } = req.params;
        const { skills, qualifications, professionalExperience, educationalBackground } = req.body;

        const userProfile = await UserProfile.findOneAndUpdate(
            { userId },
            { skills, qualifications, professionalExperience, educationalBackground },
            { new: true, runValidators: true }
        );

        if (!userProfile) {
            return res.status(404).send("Profile not found!");
        }
       


        res.status(200).send("Profile updated successfully!");
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
};

const updatePersonalInfo = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, fullName, phoneNumber } = req.body;

       
        if (!username || !email || !fullName || !phoneNumber) {
            return res.status(400).send("All fields are required!");
        }

       
        const userProfile = await User.findByIdAndUpdate(
            userId,
            { username, email, fullName, phoneNumber },
            { new: true } // Return the updated document
        );

        if (!userProfile) {
            return res.status(404).send("Profile not found!");
        }

        res.status(200).send("Profile updated successfully!");
       
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Something went wrong!");
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { userId } = req.params; // Ensure userId is captured from the URL

        // Find the user by userId (assuming userId is the _id field in MongoDB)
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Compare the current password with the user's stored password
        const isCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isCorrect) {
            return next(createError(400, "Current password is incorrect!"));
        }

        // Hash the new password and save it
        const hash = await bcrypt.hash(newPassword, 5);
        user.password = hash;
        await user.save();

        res.status(200).send("Password changed successfully!");
    } catch (err) {
        console.error(err); // Log the error for debugging
        return next(createError(500, "Something went wrong!"));
    }
};

module.exports = { register, login, logout, updateUserProfile,changePassword ,updatePersonalInfo};
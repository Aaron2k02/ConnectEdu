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

        const { password, ...info } = user._doc;

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info);
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

module.exports = { register, login, logout, updateUserProfile };
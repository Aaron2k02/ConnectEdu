const User = require("../models/user.model");
const { createError } = require("../utils/createError.js");

const deleteUser = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Check if the user ID from the token matches the ID of the user to be deleted
        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }

        // Delete the user
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted");
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        res.status(200).send(user);
    } catch (err) {
        return next(createError(500, "Something went wrong!"));
    }
};

module.exports = { deleteUser, getUser };


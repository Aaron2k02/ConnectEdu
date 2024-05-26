const Role = require("../models/userRole.model.js");

const createRole = async (req, res, next) => {
    try {
        const { roleId, name } = req.body;

        // Check if the role already exists
        const existingRole = await Role.findOne({ roleId });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists' });
        }

        const newRole = new Role({
            ...req.body
        });

        const savedRole = await newRole.save();

        res.status(201).json(savedRole);

    } catch (err) {
        next(err);
    }
};

module.exports = { createRole };

const express = require("express");
const { createRole } = require("../controller/userRole.controller.js");

const router = express.Router();

// Route to create a new role
router.post('/roles', createRole);

module.exports = router;

const express = require("express");
const { deleteUser } = require("../controller/user.controller");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);

module.exports = router;

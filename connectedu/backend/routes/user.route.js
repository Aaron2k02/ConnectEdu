const express = require("express");
const { deleteUser, getUser, getUsers, getUserCounts, updateUserRole,applyEducator } = require("../controller/user.controller");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.put("/updateRole", verifyToken, updateUserRole);
router.get("/counts", verifyToken, getUserCounts);  // Ensure this is before routes with ":id" else the rest of the routes will think that it is a parameter
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);
router.put("/register-educator",verifyToken, applyEducator);

module.exports = router;

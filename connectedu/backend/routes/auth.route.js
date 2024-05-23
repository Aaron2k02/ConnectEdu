const express = require("express");
const { register, login, logout, updateUserProfile,changePassword} = require("../controller/auth.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put('/profile/:userId', updateUserProfile);
router.post('/change-password/:userId', changePassword);


module.exports = router;

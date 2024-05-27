const express = require("express");
const { verifyToken } = require("../middleware/jwt.js");
const { register, login, logout, updateUserProfile, validatePassword, changePassword, updatePersonalInfo, checkUser, checkUserApplication } = require("../controller/auth.controller.js");

const router = express.Router();

router.post("/check-user", checkUser);
router.post("/check-application", verifyToken, checkUserApplication);
router.post("/validate-password", verifyToken, validatePassword);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put('/profile', verifyToken, updateUserProfile);
router.post('/change-password', verifyToken, changePassword);
router.put('/personal-info', verifyToken, updatePersonalInfo);



module.exports = router;

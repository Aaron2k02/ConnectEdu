const express = require("express");
const {sendPasswordResetOTPEmail, verifyOTP, resetUserPassword} = require("../controller/otp.controller.js");
const router = express.Router();



router.post("/forgotPassword", sendPasswordResetOTPEmail);

router.post("/forgotPassword/reset", resetUserPassword);

router.post("/forgotPassword/verify", verifyOTP);

module.exports = router;
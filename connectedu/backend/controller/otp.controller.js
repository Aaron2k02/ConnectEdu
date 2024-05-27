const generateOTP = require("./../utils/generateOtp.js");
const sendEmail = require("./../utils/sendEmail.js");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const { hashData } = require("./../utils/hashData.js");
const bcrypt = require("bcrypt");

const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw new Error("Provide values for email, subject, message");
        }

        await Otp.deleteOne({ email });
        const generatedOTP = await generateOTP();

        const mailOption = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        };
        await sendEmail(mailOption);

        const hashedOTP = await hashData(generatedOTP);
        const newOTP = new Otp({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    }
};

const sendPasswordResetOTPEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "There is no account for the provided email" });
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Enter the code below to reset your password.",
            duration: 1,
        };

        const createdOTP = await sendOTP(otpDetails);
        return res.status(200).json({ message: "OTP sent successfully", otpId: createdOTP._id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const resetUserPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!(email && newPassword)) {
            return res.status(400).json({ error: "Empty credentials are not allowed" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: "Password is too short!" });
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 5);
        const finishChange = await User.updateOne({ email }, { password: hashedNewPassword });
        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!(email && otp)) {
            return res.status(400).json({ error: "Provide values for OTP" });
        }

        const matchedOTPRecord = await Otp.findOne({ email });
        if (!matchedOTPRecord) {
            return res.status(400).json({ error: "No OTP records found" });
        }

        const { expiresAt } = matchedOTPRecord;
        if (expiresAt < Date.now()) {
            await Otp.deleteOne({ email });
            return res.status(400).json({ error: "Code has expired. Request for a new one." });
        }

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { sendOTP, sendPasswordResetOTPEmail, verifyOTP, resetUserPassword };

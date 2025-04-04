const express = require("express");
const { sendOtp, verifyOtp, checkMobile,logout } = require("../controllers/authController");
const { authenticateUser } = require("../Middleware/authMiddleware");
const router = express.Router();

// ✅ Send OTP
router.post("/send-otp", sendOtp);

// ✅ Verify OTP
router.post("/verify-otp", verifyOtp);

// ✅ Register New User
router.post("/check-mobile", checkMobile);
router.post("/logout", authenticateUser, logout);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const requireUser = require("../middleware/requireUser");
const User = require("../models/User");
const EmailOtp = require("../models/EmailOtp");
const { sendOtpEmail } = require("../services/emailService");
const sendResponse = require("../utils/sendResponse");
const {
  OTP_TTL_MS,
  generateOtp,
  hashOtp,
  isOtpMatch,
} = require("../utils/otp");
const { createAuthToken } = require("../utils/authToken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { phone, email, displayName, roles } = req.body;
    if (
      (!phone && !email) ||
      !Array.isArray(roles) ||
      roles.length === 0 ||
      roles.some((role) => !["seller", "buyer"].includes(role))
    ) {
      return sendResponse(res, 400, {
        error: "Provide a phone or email and valid roles.",
      });
    }
    const user = await User.create({
      phone,
      email,
      displayName,
      roles: [...new Set(roles)],
    });
    return sendResponse(res, 201, { user });
  } catch (error) {
    if (error.code === 11000)
      return sendResponse(res, 409, {
        error: "Phone or email is already registered.",
      });
    if (error.name === "ValidationError")
      return sendResponse(res, 400, { error: error.message });
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase();

    if (!email) {
      return sendResponse(res, 400, { error: "A valid email is required." });
    }

    const otp = generateOtp();
    await EmailOtp.findOneAndUpdate(
      { email },
      {
        codeHash: hashOtp(email, otp),
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        attempts: 0,
      },
      { upsert: true, new: true, runValidators: true },
    );
    await sendOtpEmail(email, otp);

    return sendResponse(res, 200, {
      message: "Verification code sent to your email.",
      email,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/verify-otp", async (req, res, next) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase();
    const otp = String(req.body?.otp || "");

    if (!email || !/^\d{6}$/.test(otp)) {
      return sendResponse(res, 400, {
        error: "A valid email and 6-digit OTP are required.",
      });
    }

    const emailOtp = await EmailOtp.findOne({ email });
    if (!emailOtp || emailOtp.expiresAt <= new Date()) {
      if (emailOtp) await EmailOtp.deleteOne({ _id: emailOtp._id });
      return sendResponse(res, 400, { error: "OTP is invalid or expired." });
    }

    const otpHash = hashOtp(email, otp);
    if (!isOtpMatch(emailOtp.codeHash, otpHash)) {
      await EmailOtp.updateOne(
        { _id: emailOtp._id },
        { $inc: { attempts: 1 } },
      );
      return sendResponse(res, 400, { error: "OTP is invalid or expired." });
    }

    await EmailOtp.deleteOne({ _id: emailOtp._id });
    const user = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: { email } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    const { token, expiresIn } = createAuthToken(user._id);
    return sendResponse(res, 200, {
      user,
      userId: user._id,
      token,
      tokenType: "Bearer",
      expiresIn,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-__v");
    if (!user) return sendResponse(res, 404, { error: "User not found." });
    return sendResponse(res, 200, { user });
  } catch (error) {
    return next(error);
  }
});

router.patch("/me", requireUser, async (req, res, next) => {
  try {
    const updates = {};
    if (req.body?.displayName) updates.displayName = req.body.displayName;
    if (req.body?.phone) updates.phone = req.body.phone;
    if (req.body?.email) updates.email = req.body.email;
    if (req.body?.roles !== undefined) {
      if (
        !Array.isArray(req.body.roles) ||
        req.body.roles.length === 0 ||
        req.body.roles.some((role) => !["seller", "buyer"].includes(role))
      ) {
        return sendResponse(res, 400, {
          error: "Roles must include buyer, seller, or both.",
        });
      }
      updates.roles = [...new Set(req.body.roles)];
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!user) return sendResponse(res, 404, { error: "User not found." });
    return sendResponse(res, 200, { user });
  } catch (error) {
    if (error.code === 11000)
      return sendResponse(res, 409, {
        error: "Phone or email is already registered.",
      });
    if (error.name === "ValidationError")
      return sendResponse(res, 400, { error: error.message });
    return next(error);
  }
});

module.exports = router;

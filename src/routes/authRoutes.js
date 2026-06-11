import express from "express";
import {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
  logoutUser,

  // NEW
  forgotPasswordPage,
  sendResetLink,
  resetPasswordPage,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

/* ================= LOGIN ================= */
router.get("/login", loginPage);
router.post("/login", loginUser);

/* ================= REGISTER ================= */
router.get("/register", registerPage);
router.post("/register", registerUser);

/* ================= LOGOUT ================= */
router.get("/logout", logoutUser);

/* ================= FORGOT PASSWORD ================= */
router.get("/forgot-password", forgotPasswordPage);
router.post("/forgot-password", sendResetLink);

/* ================= RESET PASSWORD ================= */
router.get("/reset-password/:token", resetPasswordPage);
router.post("/reset-password/:token", resetPassword);

export default router;
import bcrypt from "bcrypt";
import crypto from "crypto";
import db from "../models/db.js";
import { createUser, getUserByEmail } from "../models/users.js";

/* ================= LOGIN PAGE ================= */
export const loginPage = (req, res) => {
  res.render("login");
};

/* ================= REGISTER PAGE ================= */
export const registerPage = (req, res) => {
  res.render("register");
};

/* ================= REGISTER USER ================= */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await createUser(name, email, hash);

    req.flash("success", "Account created");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Error creating account");
    res.redirect("/register");
  }
};

/* ================= LOGIN USER ================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role
    };

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    req.flash("error", "Login error");
    res.redirect("/login");
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

/* ======================================================
    FORGOT PASSWORD SYSTEM
====================================================== */

/* SHOW FORGOT PASSWORD PAGE */
export const forgotPasswordPage = (req, res) => {
  res.render("forgot-password");
};

/* SEND RESET LINK */
export const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      req.flash("error", "No account with that email");
      return res.redirect("/forgot-password");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await db.query(
      "UPDATE users SET reset_token=$1, reset_token_expiry=$2 WHERE email=$3",
      [token, expiry, email]
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    console.log("RESET LINK:", resetLink);

    req.flash("success", "Reset link generated (check server console)");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to generate reset link");
    res.redirect("/forgot-password");
  }
};

/* SHOW RESET PASSWORD PAGE */
export const resetPasswordPage = async (req, res) => {
  const { token } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_token_expiry > NOW()",
      [token]
    );

    if (result.rows.length === 0) {
      return res.send("Invalid or expired token");
    }

    res.render("reset-password", { token });
  } catch (err) {
    console.error(err);
    res.send("Error loading reset page");
  }
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_token_expiry > NOW()",
      [token]
    );

    if (result.rows.length === 0) {
      return res.send("Invalid or expired token");
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password=$1, reset_token=NULL, reset_token_expiry=NULL WHERE reset_token=$2",
      [hash, token]
    );

    req.flash("success", "Password updated successfully");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("Error resetting password");
  }
};
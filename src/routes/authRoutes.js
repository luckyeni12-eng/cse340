import express from "express";
import {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
  logoutUser
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", loginUser);

router.get("/register", registerPage);
router.post("/register", registerUser);

router.get("/logout", logoutUser);

export default router;
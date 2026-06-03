import express from "express";
import { usersPage } from "../controllers/userController.js";
import { requireLogin, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireLogin, requireRole("admin"), usersPage);

export default router;
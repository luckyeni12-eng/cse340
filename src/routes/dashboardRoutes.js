import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

// Dashboard page
router.get("/dashboard", getDashboard);

export default router;
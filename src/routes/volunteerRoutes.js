import express from "express";
import {
  volunteerProject,
  unvolunteerProject
} from "../controllers/volunteerController.js";

import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ========================= VOLUNTEER ACTIONS ========================= */
router.post("/:id/volunteer", requireLogin, volunteerProject);
router.post("/:id/unvolunteer", requireLogin, unvolunteerProject);

export default router;
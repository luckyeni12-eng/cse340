import express from "express";
import {
  organizationsPage,
  organizationDetailsPage,
} from "../controllers/organizationController.js";

const router = express.Router();

router.get("/", organizationsPage);
router.get("/:id", organizationDetailsPage);

export default router;
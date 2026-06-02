import express from "express";
import {
  organizationsPage,
  organizationDetailsPage,
  newOrganizationPage,
  createOrganizationHandler,
  editOrganizationPage,
  updateOrganizationHandler,
  deleteOrganizationHandler,
} from "../controllers/organizationController.js";

const router = express.Router();

/* ========================= LIST ========================= */
router.get("/", organizationsPage);

/* ========================= CREATE ========================= */
router.get("/new", newOrganizationPage);
router.post("/new", createOrganizationHandler);

/* ========================= EDIT ========================= */
router.get("/edit/:id", editOrganizationPage);
router.post("/edit/:id", updateOrganizationHandler);

/* ========================= DELETE ========================= */
router.post("/delete/:id", deleteOrganizationHandler);

/* ========================= DETAILS (LAST) ========================= */
router.get("/:id", organizationDetailsPage);

export default router;
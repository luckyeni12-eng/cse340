import express from "express";
import {
  categoriesPage,
  categoryDetailsPage,
  newCategoryPage,
  createCategoryHandler,
  editCategoryPage,
  updateCategoryHandler
} from "../controllers/categoryController.js";

const router = express.Router();

/* =========================
   STATIC ROUTES FIRST
========================= */

// Create category
router.get("/new-category", newCategoryPage);
router.post("/new-category", createCategoryHandler);

// Edit category
router.get("/edit-category/:id", editCategoryPage);
router.post("/edit-category/:id", updateCategoryHandler);

/* =========================
   DYNAMIC ROUTES LAST
========================= */

// All categories
router.get("/", categoriesPage);

// Category details
router.get("/:id", categoryDetailsPage);

export default router;
import express from "express";
import {
  categoriesPage,
  categoryDetailsPage,
  newCategoryPage,
  createCategoryHandler,
  editCategoryPage,
  updateCategoryHandler,
  deleteCategoryHandler
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", categoriesPage);

router.get("/new-category", newCategoryPage);
router.post("/new-category", createCategoryHandler);

router.get("/edit-category/:id", editCategoryPage);
router.post("/edit-category/:id", updateCategoryHandler);

// ❌ DELETE
router.post("/delete/:id", deleteCategoryHandler);

router.get("/:id", categoryDetailsPage);

export default router;
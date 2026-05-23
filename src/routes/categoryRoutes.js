import express from "express";
import {
  categoriesPage,
  categoryDetailsPage,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", categoriesPage);
router.get("/:id", categoryDetailsPage);

export default router;
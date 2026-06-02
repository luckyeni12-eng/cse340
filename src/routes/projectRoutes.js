import express from "express";
import {
  getProjectsPage,
  getProjectDetails,
  newProjectPage,
  createProjectHandler,
  editProjectPage,
  updateProjectHandler,
  deleteProjectHandler,
  projectCategoriesPage,
  assignCategoryHandler,
  removeCategoryHandler,
} from "../controllers/projectController.js";

const router = express.Router();

/* CRUD */
router.get("/", getProjectsPage);
router.get("/new", newProjectPage);
router.post("/new", createProjectHandler);

router.get("/edit/:id", editProjectPage);
router.post("/edit/:id", updateProjectHandler);

router.post("/delete/:id", deleteProjectHandler);

/* DETAILS */
router.get("/:id", getProjectDetails);

/* CATEGORY ASSIGNMENT */
router.get("/:id/categories", projectCategoriesPage);
router.post("/:id/categories", assignCategoryHandler);
router.post("/:id/categories/delete/:categoryId", removeCategoryHandler);

export default router;
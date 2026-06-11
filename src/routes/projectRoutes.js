import express from "express";
import db from "../models/db.js";

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

/* =========================
   CRUD
========================= */
router.get("/", getProjectsPage);
router.get("/new", newProjectPage);
router.post("/new", createProjectHandler);

router.get("/edit/:id", editProjectPage);
router.post("/edit/:id", updateProjectHandler);

router.post("/delete/:id", deleteProjectHandler);

/* =========================
   PROJECT DETAILS
========================= */
router.get("/:id", getProjectDetails);

/* =========================
   JOIN PROJECT (FIXED)
========================= */
router.post("/:id/join", async (req, res) => {
  try {
    const userId = req.session.user?.id;
    const projectId = req.params.id;

    if (!userId) {
      return res.status(401).send("You must be logged in to join a project.");
    }

    //  FIX: use db instead of undefined pool
    await db.query(
      `
      INSERT INTO volunteers (user_id, project_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, project_id) DO NOTHING
      `,
      [userId, projectId]
    );

    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Join project error:", err);
    res.status(500).send("Server error");
  }
});

/* =========================
   CATEGORY ASSIGNMENT
========================= */
router.get("/:id/categories", projectCategoriesPage);
router.post("/:id/categories", assignCategoryHandler);
router.post("/:id/categories/delete/:categoryId", removeCategoryHandler);

export default router;
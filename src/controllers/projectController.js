import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getCategoriesByProjectId,
  assignCategoryToProject,
  removeCategoryFromProject,
} from "../models/projects.js";

import db from "../models/db.js";
import { isVolunteer } from "../models/volunteers.js";

/* ========================= LIST ========================= */
export const getProjectsPage = async (req, res) => {
  const projects = await getAllProjects();
  res.render("projects", { title: "Projects", projects });
};

/* ========================= DETAILS ========================= */
export const getProjectDetails = async (req, res) => {
  const project = await getProjectById(req.params.id);
  const categories = await getCategoriesByProjectId(req.params.id);

  if (!project) return res.status(404).send("Project not found");

  // FIX: safely get user from session
  const user = req.session.user || null;

  // FIX: default value so EJS NEVER crashes
  let isUserVolunteer = false;

  // FIX: only check DB if user exists
  if (user) {
    try {
      isUserVolunteer = await isVolunteer(user.id, req.params.id);
    } catch (err) {
      console.error("Volunteer check failed:", err.message);
      isUserVolunteer = false;
    }
  }

  res.render("project-details", {
    title: project.name,
    project,
    categories,
    user,
    isUserVolunteer, 
  });
};

/* ========================= CREATE ========================= */
export const newProjectPage = async (req, res) => {
  const orgs = await db.query("SELECT id, name FROM organizations");
  res.render("new-project", { orgs: orgs.rows });
};

export const createProjectHandler = async (req, res) => {
  const { name, description, organization_id } = req.body;

  await createProject(name, description, organization_id);

  req.flash("success", "Project created");
  res.redirect("/projects");
};

/* ========================= EDIT ========================= */
export const editProjectPage = async (req, res) => {
  const project = await getProjectById(req.params.id);
  const orgs = await db.query("SELECT id, name FROM organizations");

  res.render("edit-project", {
    project,
    orgs: orgs.rows,
  });
};

export const updateProjectHandler = async (req, res) => {
  const { name, description, organization_id } = req.body;

  await updateProject(req.params.id, name, description, organization_id);

  req.flash("success", "Project updated");
  res.redirect("/projects");
};

/* ========================= DELETE ========================= */
export const deleteProjectHandler = async (req, res) => {
  await deleteProject(req.params.id);
  req.flash("success", "Project deleted");
  res.redirect("/projects");
};

/* ========================= CATEGORY ASSIGNMENT PAGE ========================= */
export const projectCategoriesPage = async (req, res) => {
  const project = await getProjectById(req.params.id);
  const categories = await db.query("SELECT * FROM categories");

  const assigned = await getCategoriesByProjectId(req.params.id);

  res.render("project-categories", {
    project,
    categories: categories.rows,
    assigned,
  });
};

export const assignCategoryHandler = async (req, res) => {
  const { category_id } = req.body;

  await assignCategoryToProject(req.params.id, category_id);

  res.redirect(`/projects/${req.params.id}/categories`);
};

export const removeCategoryHandler = async (req, res) => {
  await removeCategoryFromProject(req.params.id, req.params.categoryId);

  res.redirect(`/projects/${req.params.id}/categories`);
};
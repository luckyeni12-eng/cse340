import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory
} from "../models/categories.js";

// LIST
export const categoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  res.render("categories", { title: "Categories", categories });
};

// DETAILS
export const categoryDetailsPage = async (req, res) => {
  const category = await getCategoryById(req.params.id);
  const projects = await getProjectsByCategoryId(req.params.id);

  if (!category) return res.status(404).send("Category not found");

  res.render("category-details", {
    title: category.name,
    category,
    projects
  });
};

// CREATE PAGE
export const newCategoryPage = (req, res) => {
  res.render("new-category", { title: "New Category", error: null });
};

// CREATE
export const createCategoryHandler = async (req, res) => {
  const { name, description, image } = req.body;

  await createCategory(name, description, image);

  req.flash("success", "Category created successfully");
  res.redirect("/categories");
};

// EDIT PAGE
export const editCategoryPage = async (req, res) => {
  const category = await getCategoryById(req.params.id);

  if (!category) return res.status(404).send("Category not found");

  res.render("edit-category", {
    title: "Edit Category",
    category,
    error: null
  });
};

// UPDATE
export const updateCategoryHandler = async (req, res) => {
  const { name, description, image } = req.body;

  await updateCategory(req.params.id, name, description, image);

  req.flash("success", "Category updated successfully");
  res.redirect("/categories");
};

// ❌ DELETE
export const deleteCategoryHandler = async (req, res) => {
  await deleteCategory(req.params.id);

  req.flash("success", "Category deleted successfully");
  res.redirect("/categories");
};
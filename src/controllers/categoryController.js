import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  createCategory,
  updateCategory
} from "../models/categories.js";

/* =========================
   LIST CATEGORIES
========================= */
export const categoriesPage = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render("categories", { title: "Categories", categories });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* =========================
   CATEGORY DETAILS
========================= */
export const categoryDetailsPage = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    const projects = await getProjectsByCategoryId(req.params.id);

    if (!category) return res.status(404).send("Category not found");

    res.render("category-details", {
      title: category.name,
      category,
      projects
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* =========================
   SHOW CREATE FORM
========================= */
export const newCategoryPage = (req, res) => {
  res.render("new-category", { title: "New Category", error: null });
};

/* =========================
   CREATE CATEGORY (POST)
========================= */
export const createCategoryHandler = async (req, res) => {
  try {
    const { name, description, image } = req.body;  

    // SERVER VALIDATION
    if (!name || name.length < 3 || name.length > 100) {
      return res.status(400).render("new-category", {
        title: "New Category",
        error: "Name must be 3–100 characters"
      });
    }

    await createCategory(name, description, image); 

    res.redirect("/categories");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* =========================
   SHOW EDIT FORM
========================= */
export const editCategoryPage = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    if (!category) return res.status(404).send("Category not found");

    res.render("edit-category", {
      title: "Edit Category",
      category,
      error: null
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* =========================
   UPDATE CATEGORY (POST)
========================= */
export const updateCategoryHandler = async (req, res) => {
  try {
    const { name, description, image } = req.body; 

    if (!name || name.length < 3 || name.length > 100) {
      const category = await getCategoryById(req.params.id);

      return res.status(400).render("edit-category", {
        title: "Edit Category",
        category,
        error: "Name must be 3–100 characters"
      });
    }

    await updateCategory(req.params.id, name, description, image); 

    res.redirect("/categories");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
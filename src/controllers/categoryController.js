import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
} from "../models/categories.js";

export const categoriesPage = async (req, res) => {
  try {
    const categories = await getAllCategories();

    console.log("Categories loaded:", categories);

    res.render("categories", {
      title: "Categories",
      currentYear: new Date().getFullYear(),
      categories,
    });
  } catch (err) {
    console.error("CATEGORIES ERROR:", err);

    res
      .status(500)
      .send(`Error loading categories: ${err.message}`);
  }
};

export const categoryDetailsPage = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    const projects = await getProjectsByCategoryId(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("category-details", {
      title: category.name,
      currentYear: new Date().getFullYear(),
      category,
      projects,
    });
  } catch (err) {
    console.error("CATEGORY DETAILS ERROR:", err);

    res
      .status(500)
      .send(`Error loading category: ${err.message}`);
  }
};
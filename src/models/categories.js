import db from "./db.js";

// GET ALL CATEGORIES
export async function getAllCategories() {
  const result = await db.query(
    "SELECT id, name, description, image FROM categories ORDER BY name"
  );
  return result.rows;
}

// GET CATEGORY BY ID
export async function getCategoryById(id) {
  const result = await db.query(
    "SELECT id, name, description, image FROM categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// GET PROJECTS IN CATEGORY
export async function getProjectsByCategoryId(id) {
  const result = await db.query(
    `
    SELECT p.id, p.name, p.description
    FROM projects p
    JOIN project_categories pc ON p.id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.name
    `,
    [id]
  );

  return result.rows;
}
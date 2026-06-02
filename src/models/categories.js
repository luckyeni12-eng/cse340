import db from "./db.js";

// GET ALL
export async function getAllCategories() {
  const result = await db.query(
    "SELECT id, name, description, image FROM categories ORDER BY name"
  );
  return result.rows;
}

// GET BY ID
export async function getCategoryById(id) {
  const result = await db.query(
    "SELECT id, name, description, image FROM categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// PROJECTS BY CATEGORY
export async function getProjectsByCategoryId(id) {
  const result = await db.query(
    `SELECT p.id, p.name, p.description
     FROM projects p
     JOIN project_categories pc ON p.id = pc.project_id
     WHERE pc.category_id = $1
     ORDER BY p.name`,
    [id]
  );
  return result.rows;
}

// CREATE
export async function createCategory(name, description = null, image = null) {
  const result = await db.query(
    `INSERT INTO categories (name, description, image)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, image]
  );
  return result.rows[0];
}

// UPDATE
export async function updateCategory(id, name, description = null, image = null) {
  const result = await db.query(
    `UPDATE categories
     SET name=$1, description=$2, image=$3
     WHERE id=$4
     RETURNING *`,
    [name, description, image, id]
  );
  return result.rows[0];
}

// ❌ NEW: DELETE CATEGORY
export async function deleteCategory(id) {
  await db.query("DELETE FROM categories WHERE id = $1", [id]);
}
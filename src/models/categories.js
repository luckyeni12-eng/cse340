import db from "./db.js";

/**
 * Get all categories
 */
export async function getAllCategories() {
  const result = await db.query(
    "SELECT id, name FROM categories ORDER BY name ASC"
  );

  return result.rows;
}
import pool from "../models/db.js"

/**
 * Get all categories from the database
 */
export async function getAllCategories() {
    const result = await pool.query(
        "SELECT id, name FROM categories ORDER BY name ASC"
    );

    return result.rows;
}
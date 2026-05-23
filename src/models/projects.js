import db from "./db.js";

// GET ALL PROJECTS
export async function getAllProjects() {
  const result = await db.query(`
    SELECT id, name, description, organization_id
    FROM projects
    ORDER BY id
  `);

  return result.rows;
}

// GET PROJECT BY ID
export async function getProjectById(id) {
  const result = await db.query(
    `
    SELECT id, name, description, organization_id
    FROM projects
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

// GET CATEGORIES FOR PROJECT
export async function getCategoriesByProjectId(id) {
  const result = await db.query(
    `
    SELECT c.id, c.name
    FROM categories c
    JOIN project_categories pc ON c.id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
    `,
    [id]
  );

  return result.rows;
}
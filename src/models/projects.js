import db from "./db.js";

/* ========================= PROJECTS ========================= */

export async function getAllProjects() {
  const result = await db.query(`
    SELECT
      id,
      name,
      description,
      organization_id,
      image_path
    FROM projects
    ORDER BY id
  `);

  return result.rows;
}

export async function getProjectById(id) {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      description,
      organization_id,
      image_path
    FROM projects
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

/* ========================= CREATE / UPDATE ========================= */

export async function createProject(
  name,
  description,
  organization_id,
  image_path
) {
  const result = await db.query(
    `
    INSERT INTO projects (
      name,
      description,
      organization_id,
      image_path
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, description, organization_id, image_path]
  );

  return result.rows[0];
}

export async function updateProject(
  id,
  name,
  description,
  organization_id,
  image_path
) {
  const result = await db.query(
    `
    UPDATE projects
    SET
      name = $1,
      description = $2,
      organization_id = $3,
      image_path = $4
    WHERE id = $5
    RETURNING *
    `,
    [name, description, organization_id, image_path, id]
  );

  return result.rows[0];
}

/* ========================= DELETE ========================= */

export async function deleteProject(id) {
  await db.query(
    "DELETE FROM projects WHERE id = $1",
    [id]
  );
}

/* ========================= CATEGORIES (ASSIGNMENT) ========================= */

export async function getCategoriesByProjectId(id) {
  const result = await db.query(
    `
    SELECT
      c.id,
      c.name
    FROM categories c
    JOIN project_categories pc
      ON c.id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
    `,
    [id]
  );

  return result.rows;
}

export async function assignCategoryToProject(projectId, categoryId) {
  await db.query(
    `
    INSERT INTO project_categories (
      project_id,
      category_id
    )
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [projectId, categoryId]
  );
}

export async function removeCategoryFromProject(projectId, categoryId) {
  await db.query(
    `
    DELETE FROM project_categories
    WHERE project_id = $1
      AND category_id = $2
    `,
    [projectId, categoryId]
  );
}
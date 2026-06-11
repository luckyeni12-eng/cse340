import db from "./db.js";

/* =========================
   JOIN PROJECT
========================= */
export const addVolunteer = async (userId, projectId) => {
  return db.query(
    `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    `,
    [userId, projectId]
  );
};

/* =========================
   REMOVE VOLUNTEER
========================= */
export const removeVolunteer = async (userId, projectId) => {
  return db.query(
    `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    `,
    [userId, projectId]
  );
};

/* =========================
   CHECK IF USER JOINED
========================= */
export const isVolunteer = async (userId, projectId) => {
  const result = await db.query(
    `
    SELECT 1 FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    LIMIT 1
    `,
    [userId, projectId]
  );

  return result.rows.length > 0;
};

/* =========================
   GET USER PROJECTS (DASHBOARD)
========================= */
export const getUserVolunteerProjects = async (userId) => {
  const result = await db.query(
    `
    SELECT p.*
    FROM projects p
    JOIN volunteers v ON p.id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.id DESC
    `,
    [userId]
  );

  return result.rows;
};
import db from "./db.js";

export const getAllOrganizations = async () => {
  const result = await db.query(`
    SELECT id, name, description, contact_email, logo_filename
    FROM organizations
  `);
  return result.rows;
};

export const getOrganizationById = async (id) => {
  const result = await db.query(
    `SELECT id, name, description, contact_email, logo_filename
     FROM organizations
     WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getProjectsByOrganizationId = async (id) => {
  const result = await db.query(
    `SELECT id, name, description
     FROM projects
     WHERE organization_id = $1
     ORDER BY id`,
    [id]
  );
  return result.rows;
};

// CREATE
export const createOrganization = async (name, description, contact_email) => {
  await db.query(
    `INSERT INTO organizations (name, description, contact_email)
     VALUES ($1, $2, $3)`,
    [name, description, contact_email]
  );
};

// UPDATE
export const updateOrganization = async (id, name, description, contact_email) => {
  await db.query(
    `UPDATE organizations
     SET name=$1, description=$2, contact_email=$3
     WHERE id=$4`,
    [name, description, contact_email, id]
  );
};

// DELETE
export const deleteOrganization = async (id) => {
  await db.query("DELETE FROM organizations WHERE id=$1", [id]);
};
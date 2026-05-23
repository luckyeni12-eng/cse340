import db from "./db.js";

/**
 * Get all organizations
 */
export const getAllOrganizations = async () => {
  const query = `
    SELECT id, name, description, contact_email, logo_filename
    FROM organizations;
  `;

  const result = await db.query(query);
  return result.rows;
};

/**
 * Get organization by ID
 */
export const getOrganizationById = async (id) => {
  const query = `
    SELECT id, name, description, contact_email, logo_filename
    FROM organizations
    WHERE id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

/**
 * Get projects for organization (FIXED)
 */
export const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT id, name, description, organization_id
    FROM projects
    WHERE organization_id = $1
    ORDER BY id;
  `;

  const result = await db.query(query, [organizationId]);
  return result.rows;
};
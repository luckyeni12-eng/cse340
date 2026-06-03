import db from "./db.js";

export const createUser = async (name, email, passwordHash) => {
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,'user')",
    [name, email, passwordHash]
  );
};

export const getUserByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await db.query(
    "SELECT id, name, email, role FROM users ORDER BY id"
  );
  return result.rows;
};
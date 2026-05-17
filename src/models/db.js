import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

/**
 * Render + production-safe PostgreSQL pool
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // 🔥 REQUIRED for Render / cloud Postgres
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/**
 * Safe query wrapper (optional logging)
 */
const db = {
  query: (text, params) => pool.query(text, params),

  close: () => pool.end(),
};

/**
 * Test DB connection
 */
export const testConnection = async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("DB connected:", result.rows[0]);
    return true;
  } catch (err) {
    console.error("DB connection failed:", err.message);
    throw err;
  }
};

export default db;
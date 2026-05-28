import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* =========================
   SAFELY DETECT ENV
========================= */
const isProduction = process.env.NODE_ENV === "production";

/* =========================
   POSTGRES POOL
========================= */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: isProduction
    ? { rejectUnauthorized: false } // Render
    : false, // Localhost
});

/* =========================
   DB WRAPPER
========================= */
const db = {
  query: (text, params) => pool.query(text, params),
};

/* =========================
   TEST CONNECTION
========================= */
const testConnection = async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful:", result.rows[0].now);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export default db;
export { testConnection };
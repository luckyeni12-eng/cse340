import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import categoryRoutes from "./src/routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";

import { testConnection } from "./src/models/db.js";

dotenv.config();

const app = express();

/* =========================
   PATH SETUP
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   PORT (RENDER SAFE)
========================= */
const PORT = process.env.PORT || 5500;

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

/* =========================
   VIEW ENGINE
========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =========================
   GLOBAL LOCALS
========================= */
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

/* =========================
   REQUEST LOGGER
========================= */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* =========================
   ROUTES
========================= */
app.use("/categories", categoryRoutes);
app.use("/projects", projectRoutes);
app.use("/organizations", organizationRoutes);

/* =========================
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).send(`Cannot GET ${req.originalUrl}`);
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, async () => {
  const url = `http://localhost:${PORT}`;

  console.log(`Server running at: ${url}`);

  try {
    await testConnection();
    console.log("Database connected successfully");
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }
});
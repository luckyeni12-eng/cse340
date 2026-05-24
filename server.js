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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5500;

/* =========================
   MIDDLEWARE
========================= */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   VIEW ENGINE
========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =========================
   GLOBAL LOCALS (FIX FOOTER ONCE)
========================= */
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

/* =========================
   REQUEST LOGGERs
========================= */
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

/* =========================
   ROUTES
========================= */
app.use("/categories", categoryRoutes);
app.use("/projects", projectRoutes);
app.use("/organizations", organizationRoutes);

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

/* =========================
   404
========================= */
app.use((req, res) => {
  res.status(404).send(`Cannot GET ${req.originalUrl}`);
});

/* =========================
   START SERVER
========================= */
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    await testConnection();
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }
});
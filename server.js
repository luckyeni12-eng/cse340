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

const port = process.env.PORT || 5500;

/* =========================
   MIDDLEWARE
========================= */

/**
 * ✅ FIX 1: Serve ALL static assets from /public
 * This is what Render will use in production
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * ✅ FIX 2 (IMPORTANT SAFETY NET):
 * Explicit image route in case DB or frontend calls /images/*
 */
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
   HEALTH CHECK (Render useful)
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
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    await testConnection();
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }
});
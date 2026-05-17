import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllCategories } from "./src/models/categories.js";
import { testConnection } from "./src/models/db.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5500;
const currentYear = new Date().getFullYear();

// ================= MIDDLEWARE =================
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================= ROUTES =================

// HOME
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    currentYear,
  });
});

// ORGANIZATIONS
app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      currentYear,
      organizations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error loading organizations");
  }
});

// PROJECTS
app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Service Projects",
    currentYear,
  });
});

// CATEGORIES
app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Project Categories",
      currentYear,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error loading categories");
  }
});

// ================= START sSERVER =================
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  try {
    await testConnection();
  } catch (err) {
    console.error("Warning: DB not connected on startup");
  }
});
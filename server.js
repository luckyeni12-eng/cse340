import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5500;

const currentYear = new Date().getFullYear();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// ================= HOME =================
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        currentYear
    });
});

// ================= ORGANIZATIONS =================
app.get("/organizations", async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
        title: "Organizations",
        currentYear,
        organizations
    });
});

// ================= PROJECTS =================
app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Service Projects",
        currentYear
    });
});

// ================= CATEGORIES (UPDATED FOR WEEK 2 assignment) =================
app.get("/categories", async (req, res) => {
    const categories = await getAllCategories();

    res.render("categories", {
        title: "Project Categories",
        currentYear,
        categories
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
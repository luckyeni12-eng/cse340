import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";

import categoryRoutes from "./src/routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";
import volunteerRoutes from "./src/routes/volunteerRoutes.js";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import { requireLogin } from "./src/middleware/authMiddleware.js";
import { testConnection } from "./src/models/db.js";

// dashboard controller
import { getDashboard } from "./src/controllers/dashboardController.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5500;

/* ========================= VIEW ENGINE ========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ========================= STATIC FILES (🔥 FIX FOR CSS/NAVY BLUE) ========================= */
app.use(express.static(path.join(__dirname, "public")));

/* ========================= CORE MIDDLEWARE ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= SESSION ========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "week4-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

/* ========================= FLASH ========================= */
app.use(flash());

/* ========================= GLOBAL LOCALS ========================= */
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // footer year (safe everywhere)
  res.locals.currentYear = new Date().getFullYear();

  next();
});

/* ========================= ROUTES ========================= */
app.use("/", authRoutes);
app.use("/users", requireLogin, userRoutes);

app.use("/categories", categoryRoutes);
app.use("/projects", projectRoutes);
app.use("/organizations", organizationRoutes);
app.use("/projects", volunteerRoutes);

/* ========================= HOME ========================= */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ========================= DASHBOARD ========================= */
app.get("/dashboard", requireLogin, getDashboard);

/* ========================= SERVER START ========================= */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await testConnection();
});
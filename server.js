import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";

import categoryRoutes from "./src/routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import { requireLogin } from "./src/middleware/authMiddleware.js";

import { testConnection } from "./src/models/db.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5500;

/* ========================= DEBUG: CONFIRM FILE LOADED ========================= */
console.log("🔥 SERVER.JS LOADED SUCCESSFULLY");

/* ========================= VIEW ENGINE ========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ========================= STATIC FILES ========================= */
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

/* ========================= BODY PARSER ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= SESSION ========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "week4-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

/* ========================= FLASH ========================= */
app.use(flash());

/* ========================= GLOBAL LOCALS ========================= */
app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  /* DEBUG SESSION */
  console.log("🧠 SESSION USER:", req.session?.user);

  next();
});

/* ========================= REQUEST LOGGER (IMPORTANT DEBUG TOOL) ========================= */
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

/* ========================= AUTH ROUTES ========================= */
app.use("/", authRoutes);

/* ========================= PROTECTED USER ROUTES ========================= */
app.use("/users", requireLogin, userRoutes);

/* ========================= MAIN ROUTES ========================= */
app.use("/categories", categoryRoutes);
app.use("/projects", projectRoutes);
app.use("/organizations", organizationRoutes);

/* ========================= HOME ========================= */
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

/* ========================= DASHBOARD DEBUG ROUTE ========================= */
app.get("/dashboard", requireLogin, (req, res) => {
  console.log("🎯 DASHBOARD ROUTE HIT");

  console.log("👤 USER IN DASHBOARD:", req.session?.user);

  if (!req.session?.user) {
    console.log("❌ NO USER FOUND IN SESSION → REDIRECTING");
    return res.redirect("/login");
  }

  res.render("dashboard", {
    title: "Dashboard",
    user: req.session.user
  });
});

/* ========================= HEALTH CHECK ========================= */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* ========================= 404 HANDLER (DEBUG VERSION) ========================= */
app.use((req, res) => {
  console.log("❌ 404 HIT:", req.method, req.url);

  res.status(404).send(`
    <h1 style="color:red;">404 ERROR</h1>
    <p>Route not found: <strong>${req.originalUrl}</strong></p>
  `);
});

/* ========================= ERROR HANDLER ========================= */
app.use((err, req, res, next) => {
  console.log("🔥 SERVER ERROR CAUGHT");
  console.error(err.message);
  console.error(err.stack);

  res.status(err.status || 500).send(`
    <h1 style="color:red;">Server Error</h1>
    <p><strong>${err.message}</strong></p>
    <pre>${err.stack}</pre>
  `);
});

/* ========================= START SERVER ========================= */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await testConnection();
});
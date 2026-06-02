import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";

import categoryRoutes from "./src/routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";

import { testConnection } from "./src/models/db.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5500;

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
    secret: "week4-secret",
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
  res.locals.currentYear = new Date().getFullYear();
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

/* ========================= REQUEST LOGGER ========================= */
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* ========================= ROUTES ========================= */
app.use("/categories", categoryRoutes);
app.use("/projects", projectRoutes);
app.use("/organizations", organizationRoutes);

/* ========================= HOME ========================= */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ========================= HEALTH CHECK ========================= */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* ========================= 404 HANDLER ========================= */
app.use((req, res) => {
  res.status(404).send(`Cannot GET ${req.originalUrl}`);
});

/* ========================= ERROR HANDLER (MUST BE LAST) ========================= */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR MESSAGE:");
  console.error(err.message);

  console.error("🔥 STACK TRACE:");
  console.error(err.stack);

  res.status(err.status || 500).send(`
    <h1 style="color:red;">Server Error</h1>
    <p><strong>${err.message}</strong></p>

    <details>
      <summary>Stack Trace</summary>
      <pre>${err.stack}</pre>
    </details>
  `);
});

/* ========================= START SERVER ========================= */
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testConnection();
});
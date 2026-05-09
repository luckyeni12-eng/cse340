import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 5500

// Dynamic copyright year
const currentYear = new Date().getFullYear()

// Static middleware
app.use(express.static(path.join(__dirname, "public")))

// View engine
app.set("view engine", "ejs")

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    currentYear
  })
})

app.get("/organizations", (req, res) => {
  res.render("organizations", {
    title: "Organizations",
    currentYear
  })
})

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Service Projects",
    currentYear
  })
})

app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Project Categories",
    currentYear
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})


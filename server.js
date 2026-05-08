import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// changed port to 5500
const port = 5500

// Static middleware
app.use(express.static(path.join(__dirname, "public")))

// View engine
app.set("view engine", "ejs")

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  })
})

app.get("/organizations", (req, res) => {
  res.render("organizations", {
    title: "Organizations"
  })
})

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Service Projects"
  })
})

app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Project Categories"
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
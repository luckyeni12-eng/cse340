import express from "express";
import dotenv from "dotenv";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();

// Render provides PORT dynamically
const PORT = process.env.PORT || 10000;

app.use(express.json());

// TEST ROUTE (very important for debugging)
app.get("/db-test", async (req, res) => {
  try {
    const data = await getAllCategories();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Example route
app.get("/categories", async (req, res) => {
  try {
    const data = await getAllCategories();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load categories" });
  }
});

// IMPORTANT: listen on Render port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
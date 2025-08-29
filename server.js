import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File path for storing JSON data
const dataFile = path.join(process.cwd(), "data.json");

// Save data to JSON file
app.post("/save", (req, res) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Load data from JSON file
app.get("/load", (req, res) => {
  try {
    if (!fs.existsSync(dataFile)) {
      return res.json({});
    }
    const data = fs.readFileSync(dataFile, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Lynx prototype API is running 🚀");
});

// Start server locally (Vercel will handle it automatically in prod)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;

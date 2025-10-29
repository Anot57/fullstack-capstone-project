const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db"); // ✅ import DB connection

// GET /api/search?name=toy&category=kids&condition=new&age_years=5
router.get("/", async (req, res) => {
  try {
    // ✅ Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("gifts"); // adjust if your collection name differs

    // ✅ Build the query object
    const query = {};

    // ✅ Filter by name (only if it exists and not empty)
    if (req.query.name && req.query.name.trim() !== "") {
      query.name = { $regex: req.query.name, $options: "i" }; // case-insensitive
    }

    // ✅ Add the other filters
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.condition) {
      query.condition = req.query.condition;
    }
    if (req.query.age_years) {
      query.age_years = { $lte: parseInt(req.query.age_years) };
    }

    // ✅ Fetch filtered gifts
    const gifts = await collection.find(query).toArray();

    res.status(200).json(gifts);
  } catch (error) {
    console.error("❌ Error fetching gifts:", error);
    res.status(500).json({ message: "Error searching gifts", error: error.message });
  }
});

module.exports = router;

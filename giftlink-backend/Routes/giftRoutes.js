const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

// Task 2: /api/gifts — fetch all gifts
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (err) {
    console.error("Error fetching gifts:", err);
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
});

// Task 3: /api/gifts/:id — fetch gift by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const id = req.params.id;
    const gift = await collection.findOne({ id: id });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    res.json(gift);
  } catch (err) {
    console.error("Error fetching gift by ID:", err);
    res.status(500).json({ error: "Failed to fetch gift" });
  }
});

module.exports = router;

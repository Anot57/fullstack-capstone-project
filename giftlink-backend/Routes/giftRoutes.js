const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Fetch all gifts
router.get("/", async (req, res) => {
  try {
    console.log("📡 GET /api/gifts route hit");

    if (!mongoose.connection.db) {
      console.error("❌ No MongoDB connection established yet");
      return res.status(500).json({ message: "No database connection" });
    }

    const gifts = await mongoose.connection.db.collection("gifts").find({}).toArray();

    console.log("✅ Gifts fetched from DB:", gifts.length);
    res.json(gifts);
  } catch (error) {
    console.error("❌ Error fetching gifts:", error);
    res.status(500).json({ message: "Error fetching gifts" });
  }
});

// ✅ Fetch single gift by ID
router.get("/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const id = req.params.id;
    console.log("🔍 Fetching gift by ID:", id);

    const gift = await mongoose.connection.db.collection("gifts").findOne({ _id: new ObjectId(id) });

    if (!gift) {
      console.warn("⚠️ Gift not found for ID:", id);
      return res.status(404).json({ message: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    console.error("❌ Error fetching gift by ID:", error);
    res.status(500).json({ message: "Error fetching gift" });
  }
});

module.exports = router;

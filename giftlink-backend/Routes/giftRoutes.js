const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Get all gifts
router.get("/", async (req, res) => {
  try {
    const gifts = await mongoose.connection.db.collection("gifts").find({}).toArray();
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching gifts" });
  }
});

// Get a specific gift by ID
router.get("/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const id = req.params.id;
    const gift = await mongoose.connection.db.collection("gifts").findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching gift" });
  }
});

module.exports = router;

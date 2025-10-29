const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("../models/db");
const logger = console; // You can replace with a proper logger if available

const router = express.Router();

// Load JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ✅ REGISTER ENDPOINT
router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");

    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const result = await collection.insertOne(newUser);

    // Create JWT
    const payload = { user: { id: result.insertedId.toString() } };
    const authtoken = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({
      authtoken,
      name: firstName,
      email: email,
      message: "Registration successful",
    });
  } catch (e) {
    logger.error("Error registering user:", e.message);
    return res.status(500).send("Internal server error");
  }
});

// ✅ LOGIN ENDPOINT
router.post("/login", async (req, res) => {
  try {
    // Task 1: Connect to MongoDB
    const db = await connectToDatabase();

    // Task 2: Access users collection
    const collection = db.collection("users");

    // Task 3: Check for user credentials
    const theUser = await collection.findOne({ email: req.body.email });

    if (theUser) {
      // Task 4: Compare password
      const result = await bcryptjs.compare(req.body.password, theUser.password);
      if (!result) {
        logger.error("Passwords do not match");
        return res.status(404).json({ error: "Wrong password" });
      }

      // Task 5: Fetch user details
      const userName = theUser.firstName;
      const userEmail = theUser.email;

      // Task 6: Create JWT
      const payload = { user: { id: theUser._id.toString() } };
      const authtoken = jwt.sign(payload, JWT_SECRET);

      // Send response
      return res.json({ authtoken, userName, userEmail });
    } else {
      // Task 7: Handle user not found
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    logger.error("Error logging in:", e.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;

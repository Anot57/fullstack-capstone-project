const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;

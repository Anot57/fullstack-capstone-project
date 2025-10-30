const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./models/db");

// Import routes safely
let giftRoutes, searchRoutes, authRoutes;

try {
  giftRoutes = require("./Routes/giftRoutes");
  searchRoutes = require("./Routes/searchRoutes");
  authRoutes = require("./Routes/authRoutes");
} catch (err) {
  console.error("❌ Error loading routes:", err.message);
}

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Start the server only after DB connection succeeds
connectToDatabase()
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");

    // ✅ Mount routes only if they’re functions (express routers)
    if (typeof giftRoutes === "function") app.use("/api/gifts", giftRoutes);
    else console.error("⚠️ giftRoutes is not a valid router");

    if (typeof searchRoutes === "function") app.use("/api/search", searchRoutes);
    else console.error("⚠️ searchRoutes is not a valid router");

    if (typeof authRoutes === "function") app.use("/api/auth", authRoutes);
    else console.error("⚠️ authRoutes is not a valid router");

    // ✅ Start server
    const PORT = process.env.PORT || 3060;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

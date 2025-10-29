const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./models/db");

// Import routes
const giftRoutes = require("./Routes/giftRoutes");
const searchRoutes = require("./Routes/searchRoutes");
const authRoutes = require("./Routes/authRoutes"); // ✅ Step 3 Task 1

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gifts", giftRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes); // ✅ Step 3 Task 2

// Start server
const PORT = process.env.PORT || 3060;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectToDatabase();
});

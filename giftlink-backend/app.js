const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./models/db");
const giftRoutes = require("./routes/giftRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gifts", giftRoutes);

// Start server and connect to MongoDB
const PORT = process.env.PORT || 3060;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectToDatabase();
});

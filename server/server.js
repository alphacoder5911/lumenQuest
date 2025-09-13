// server.js
import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import planRoutes from "./Routes/plans.js";
import subscriptionRoutes from "./Routes/subscriptions.js";
import billingRoutes from "./Routes/billing.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/billing", billingRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

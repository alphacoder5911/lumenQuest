import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/auth.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import planRoutes from "../Routes/plans.js";
import subscriptionRoutes from "../Routes/subscriptions.js";
import billingRoutes from "../Routes/billing.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LumenQuest API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/billing", billingRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
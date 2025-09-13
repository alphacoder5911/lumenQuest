// src/routes/notificationRoutes.js
import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationSent,
} from "../services/notificationService.js";

const router = express.Router();

// Create a new notification
router.post("/", async (req, res) => {
  try {
    const { userId, subscriptionId, type, message } = req.body;
    const notification = await createNotification(userId, subscriptionId, type, message);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all notifications for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await getUserNotifications(parseInt(userId));
    res.json(notifications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark a notification as sent
router.patch("/:id/sent", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await markNotificationSent(parseInt(id));
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

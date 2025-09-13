// Use ES Module import
import prisma from "../db.js"; // make sure to include .js extension

// Create a notification
async function createNotification(userId, subscriptionId, type, message) {
  return prisma.notification.create({
    data: {
      userId,
      subscriptionId,
      type,
      message,
    },
  });
}

// Mark a notification as sent
async function markNotificationSent(notificationId) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { sentAt: new Date(), status: "SENT" },
  });
}

// Get all notifications for a user
async function getUserNotifications(userId) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });
}

// Export functions using ESM syntax
export { createNotification, markNotificationSent, getUserNotifications };

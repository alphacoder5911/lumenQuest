import prisma from "../db.js";
import { createNotification } from "./notificationService.js";

async function checkExpiringSubscriptions() {
  const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const expiring = await prisma.subscription.findMany({
    where: {
      status: "ACTIVE",
      terminatedDate: { lte: threeDaysFromNow },
    },
  });

  for (const sub of expiring) {
    await createNotification(
      sub.userId,
      sub.id,
      "EXPIRY_WARNING",
      `Your plan will expire on ${sub.terminatedDate.toDateString()}`
    );
  }
}

async function checkUsageAlerts() {
  const subs = await prisma.subscription.findMany({
    where: { status: "ACTIVE" },
    include: { plan: true },
  });

  for (const sub of subs) {
    if (sub.usageGb && sub.plan?.quotaGb && sub.usageGb >= sub.plan.quotaGb * 0.8) {
      await createNotification(
        sub.userId,
        sub.id,
        "USAGE_ALERT",
        `You have used ${sub.usageGb}GB of ${sub.plan.quotaGb}GB`
      );
    }
  }
}

async function runAlerts() {
  await checkExpiringSubscriptions();
  await checkUsageAlerts();
}

export { runAlerts };

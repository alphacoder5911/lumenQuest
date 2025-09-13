import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ------------------- SUBSCRIPTIONS -------------------

// Subscribe to a plan
router.post("/", async (req, res) => {
  const { userId, planId, type } = req.body; // type: monthly/yearly
  try {
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        type,
        status: "ACTIVE",
        startDate: new Date(),
      },
      include: { plan: true } // to get plan price
    });

    // Automatically create a billing record
    await prisma.billing.create({
      data: {
        subscriptionId: subscription.id,
        amount: subscription.plan.price,
        paymentStatus: "PENDING",
        billingDate: new Date(),
      },
    });

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upgrade / Downgrade subscription
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { planId, type } = req.body;
  try {
    const updated = await prisma.subscription.update({
      where: { id: Number(id) },
      data: {
        planId,
        type,
        lastRenewedDate: new Date(),
      },
      include: { plan: true } // to get updated plan price
    });

    // Create billing for the new plan
    await prisma.billing.create({
      data: {
        subscriptionId: updated.id,
        amount: updated.plan.price,
        paymentStatus: "PENDING",
        billingDate: new Date(),
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel subscription
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const canceled = await prisma.subscription.update({
      where: { id: Number(id) },
      data: { status: "CANCELLED", terminatedDate: new Date() },
    });
    res.json(canceled);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Queue a subscription (like Jio app)
router.post("/:id/queue", async (req, res) => {
  const { id } = req.params; // current subscription id
  const { userId, planId, type } = req.body;

  try {
    const queued = await prisma.subscription.create({
      data: {
        userId: Number(userId),
        planId,
        type,
        status: "QUEUED",
        startDate: new Date(), // could calculate based on current subscription end
      },
      include: { plan: true } // to get plan price
    });

    // Optional: create billing immediately or upon activation
    await prisma.billing.create({
      data: {
        subscriptionId: queued.id,
        amount: queued.plan.price,
        paymentStatus: "PENDING",
        billingDate: new Date(),
      },
    });

    res.json(queued);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all subscriptions for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: Number(userId) },
      include: { plan: true, bills: true },
      orderBy: { startDate: "desc" },
    });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get subscription details
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: Number(id) },
      include: { plan: true, bills: true },
    });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

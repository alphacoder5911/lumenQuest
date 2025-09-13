import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ------------------- BILLING -------------------

// Create a bill
router.post("/", async (req, res) => {
  const { subscriptionId, amount, paymentStatus } = req.body;
  try {
    const bill = await prisma.billing.create({
      data: {
        subscriptionId,
        amount,
        billingDate: new Date(),
        paymentStatus,
      },
    });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;
  try {
    const updated = await prisma.billing.update({
      where: { id: Number(id) },
      data: { paymentStatus },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bills for a subscription
router.get("/subscription/:subscriptionId", async (req, res) => {
  const { subscriptionId } = req.params;
  try {
    const bills = await prisma.billing.findMany({
      where: { subscriptionId: Number(subscriptionId) },
      orderBy: { billingDate: "desc" },
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bills for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await prisma.billing.findMany({
      where: {
        subscription: { userId: Number(userId) },
      },
      include: { subscription: { include: { plan: true } } },
      orderBy: { billingDate: "desc" },
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

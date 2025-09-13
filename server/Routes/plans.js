import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create a plan
router.post("/", async (req, res) => {
  const { name, price, quotaGb, autoRenew, status } = req.body;
  try {
    const plan = await prisma.plan.create({ data: { name, price, quotaGb, autoRenew, status } });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a plan
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.plan.update({ where: { id: Number(id) }, data });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a plan
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.plan.delete({ where: { id: Number(id) } });
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all plans
router.get("/", async (req, res) => {
  const plans = await prisma.plan.findMany();
  res.json(plans);
});

// Get plan details
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const plan = await prisma.plan.findUnique({ where: { id: Number(id) } });
  res.json(plan);
});

export default router;

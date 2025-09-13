import { PrismaClient } from "@prisma/client";
import { createNotification } from "../services/notificationService.js";
import planService from '../services/planService.js';

const prisma = new PrismaClient();

// Get plans with statistics (from adminpart-b)
export const getPlansWithStats = async (req, res, next) => {
  try {
    const plans = await planService.getPlansWithStats();
    res.json(plans);
  } catch (err) {
    next(err);
  }
};

// Create plan with notification feature (combined from both branches)
export const createPlan = async (req, res, next) => {
  try {
    const plan = await planService.createPlan(req.body);

    // Notify all active users about new plan (from notif branch)
    const users = await prisma.user.findMany({ where: { status: "active" } });
    for (const user of users) {
      await createNotification(
        user.id,
        0,
        "NEW_PLAN",
        `A new plan "${plan.name}" is now available at $${plan.price}.`
      );
    }

    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
};

// Update plan (from adminpart-b)
export const updatePlan = async (req, res, next) => {
  try {
    const plan = await planService.updatePlan(req.params.planId, req.body);
    res.json(plan);
  } catch (err) {
    next(err);
  }
};

// Soft delete plan (from adminpart-b)
export const softDeletePlan = async (req, res, next) => {
  try {
    const plan = await planService.softDeletePlan(req.params.planId);
    res.json(plan);
  } catch (err) {
    if (err.message === 'Cannot delete plan with active subscriptions') {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};
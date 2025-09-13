const { createNotification } = require("../services/notificationService");

async function createPlan(req, res) {
  const plan = await prisma.plan.create({ data: req.body });

  // notify all active users
  const users = await prisma.user.findMany({ where: { status: "active" } });
  for (const user of users) {
    await createNotification(
      user.id,
      0,
      "NEW_PLAN",
      `A new plan "${plan.name}" is now available at $${plan.price}.`
    );
  }

  res.json(plan);
}

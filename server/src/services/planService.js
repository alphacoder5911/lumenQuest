const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPlansWithStats = async () => {
  const plans = await prisma.plan.findMany({
    include: {
      subscriptions: true,
      discounts: true,
    },
  });

  // Add subscription statistics to each plan
  return plans.map(plan => {
    const activeCount = plan.subscriptions.filter(sub => sub.status === 'ACTIVE').length;
    const cancelledCount = plan.subscriptions.filter(sub => sub.status === 'CANCELLED').length;
    return {
      ...plan,
      stats: {
        activeSubscriptions: activeCount,
        cancelledSubscriptions: cancelledCount,
        totalSubscriptions: plan.subscriptions.length,
      },
    };
  });
};

exports.createPlan = async (data) => {
  return prisma.plan.create({ data });
};

exports.updatePlan = async (id, data) => {
  return prisma.plan.update({ where: { id: Number(id) }, data });
};

exports.softDeletePlan = async (id) => {
  // Check for active subscriptions
  const activeSubs = await prisma.subscription.count({
    where: { planId: Number(id), status: 'ACTIVE' },
  });
  if (activeSubs > 0) {
    throw new Error('Cannot delete plan with active subscriptions');
  }
  // Soft delete: set status to 'Inactive'
  return prisma.plan.update({
    where: { id: Number(id) },
    data: { status: 'Inactive' },
  });
};
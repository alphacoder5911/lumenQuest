const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTopPlans = async () => {
  // Example: Get plans ordered by number of active subscriptions (current month)
  const plans = await prisma.plan.findMany({
    include: {
      subscriptions: {
        where: {
          status: 'ACTIVE',
          startDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }
    }
  });
  return plans
    .map(plan => ({
      id: plan.id,
      name: plan.name,
      activeSubscriptions: plan.subscriptions.length
    }))
    .sort((a, b) => b.activeSubscriptions - a.activeSubscriptions);
};

// exports.getTrends = async () => {
//   // Example: Monthly active vs cancelled subscriptions
//   // You may want to aggregate by month using raw SQL or Prisma groupBy (if supported)
//   // This is a placeholder
//   return [];
// };

// exports.getPlanAnalytics = async () => {
//   // Example: Usage rates and revenue per plan
//   // You may want to sum usageGb and billing amounts per plan
//   // This is a placeholder
//   return [];
// };
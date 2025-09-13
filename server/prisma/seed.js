import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding subscriptions...");

  const subscriptions = [
    { userId: 1, planId: 1, type: "monthly", status: "ACTIVE" },
    { userId: 1, planId: 2, type: "yearly", status: "QUEUED" },
    { userId: 2, planId: 1, type: "monthly", status: "ACTIVE" },
    { userId: 2, planId: 2, type: "yearly", status: "CANCELLED" },
  ];

  for (const sub of subscriptions) {
    await prisma.subscription.create({
      data: {
        ...sub,
        startDate: new Date(),
      },
    });
  }

  console.log("Subscriptions seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

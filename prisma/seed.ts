// Example script retrieved from:
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createManyAndReturn({
    data: [{ name: "user" }, { name: "admin" }],
  });
  console.log("Roles created", roles);

  const offerStatus = await prisma.offerStatus.createManyAndReturn({
    data: [
      { status: "Pending" },
      { status: "Accepted" },
      { status: "Rejected" },
    ],
  });

  console.log("Offer statuses created", offerStatus);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

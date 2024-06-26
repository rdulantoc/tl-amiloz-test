// Example script retrieved from:
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  InstallmentStatus,
  LoanStatus,
  OfferStatus,
  UserRoles,
} from "../src/types/enums";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createManyAndReturn({
    data: [{ name: UserRoles.USER }, { name: UserRoles.ADMIN }],
  });
  console.log("Roles created", roles);

  const hashedPassword = bcrypt.hashSync("1234", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      lastName: "Beloz",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: {
        connect: {
          name: UserRoles.ADMIN,
        },
      },
    },
  });
  console.log("Admin user created", admin);

  const offerStatus = await prisma.offerStatus.createManyAndReturn({
    data: [
      { status: OfferStatus.PENDING },
      { status: OfferStatus.ACCEPTED },
      { status: OfferStatus.REJECTED },
    ],
  });

  console.log("Offer statuses created", offerStatus);

  const loanStatus = await prisma.loanStatus.createManyAndReturn({
    data: [
      { status: LoanStatus.ACTIVE },
      { status: LoanStatus.PAID },
      { status: LoanStatus.DEFAULTED },
      { status: LoanStatus.PENDING },
    ],
  });

  console.log("Loan statuses created", loanStatus);

  const installmentStatus = await prisma.installmentStatus.createManyAndReturn({
    data: [
      { status: InstallmentStatus.PENDING },
      { status: InstallmentStatus.COMPLETED },
      { status: InstallmentStatus.PARTIAL },
    ],
  });

  console.log("Installment statuses created", installmentStatus);
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

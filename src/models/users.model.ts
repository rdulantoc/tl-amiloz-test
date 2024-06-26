import { User } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class UsersModel {
  static async create(data: Partial<User>) {
    return prisma.user.create({ data } as { data: User });
  }

  static async findByEmail({ email }: { email: string }) {
    return prisma.user.findUnique({
      where: { email },
      include: { role: { select: { name: true } } },
    });
  }

  static async findById({ id }: { id: string }) {
    return prisma.user.findUnique({
      where: { id },
      include: { role: { select: { name: true } } },
    });
  }
}

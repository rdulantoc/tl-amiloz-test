import { prisma } from "../clients/prisma";

export class UserRoleModel {
  static async findById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  }
}

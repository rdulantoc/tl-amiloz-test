import { prisma } from "../clients/prisma";

export class LoanStatusModel {
  static async getId(status: string) {
    const loanStatus = await prisma.loanStatus.findFirst({
      select: { id: true },
      where: { status: status },
    });
    return loanStatus!.id;
  }
}

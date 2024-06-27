import { prisma } from "../clients/prisma";
import { addWeeks } from "../utils/addWeeks";

const DEFAULT_INSTALLMENT_STATUS = "Pending";

export class InstallmentsModel {
  static async createMany(
    loanId: string,
    term: number,
    installmentAmount: number,
    startDate: Date
  ) {
    const defaultInstallmentStatus = await prisma.installmentStatus.findFirst({
      select: { id: true },
      where: { status: DEFAULT_INSTALLMENT_STATUS },
    });
    const installmentStatusId = defaultInstallmentStatus!.id;

    const baseInstallments = Array(term).fill({
      loanId,
      installmentStatusId,
      dueAmount: installmentAmount,
    });

    const installments = baseInstallments.map((item, index) => ({
      ...item,
      dueDate: addWeeks(startDate, index + 1),
    }));

    return prisma.installment.createManyAndReturn({
      data: installments,
    });
  }
}

import { Installment } from "@prisma/client";
import { prisma } from "../clients/prisma";
import { InstallmentStatus } from "../types/enums";
import { addWeeks } from "../utils/addWeeks";

const DEFAULT_INSTALLMENT_STATUS = InstallmentStatus.PENDING;

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

  static async findClosestUnpaidInstallment(loanId: string) {
    return prisma.installment.findFirst({
      where: {
        loanId,
        NOT: {
          status: {
            status: InstallmentStatus.COMPLETED,
          },
        },
        dueDate: {
          gte: new Date(Date.now()),
        },
      },
      orderBy: { dueDate: "asc" },
      include: {
        status: { select: { status: true } },
        loan: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  static async registerPayment(
    installment: Installment,
    newPaidAmount: number
  ) {
    const nextStatus =
      installment.dueAmount === newPaidAmount
        ? InstallmentStatus.COMPLETED
        : InstallmentStatus.PARTIAL;

    return prisma.installment.update({
      where: {
        id: installment.id,
      },
      data: {
        paidAmount: newPaidAmount,
        status: {
          connect: {
            status: nextStatus,
          },
        },
      },
    });
  }

  static async revertPayment(installment: Installment, revertedAmount: number) {
    const newPaidAmount = installment.paidAmount - revertedAmount;
    const nextStatus =
      newPaidAmount === 0
        ? InstallmentStatus.PENDING
        : InstallmentStatus.PARTIAL;

    return prisma.installment.update({
      where: { id: installment.id },
      data: {
        paidAmount: newPaidAmount,
        status: {
          connect: { status: nextStatus },
        },
      },
    });
  }
}

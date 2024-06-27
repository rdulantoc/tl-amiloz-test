import { Payment } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class PaymentsModel {
  static async registerPayment(data: Partial<Payment>) {
    return prisma.payment.create({ data } as { data: Payment });
  }

  static async findById(paymentId: string) {
    return prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        installment: true,
      },
    });
  }

  static async revert(paymentId: string) {
    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        isReverted: true,
      },
      include: {
        installment: true,
      },
    });
  }
}

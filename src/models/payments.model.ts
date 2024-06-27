import { Payment } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class PaymentsModel {
  static async registerPayment(data: Partial<Payment>) {
    return prisma.payment.create({ data } as { data: Payment });
  }
}

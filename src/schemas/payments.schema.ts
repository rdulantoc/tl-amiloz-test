import { z } from "zod";

export const registerPaymentSchema = z.object({
  params: z.object({
    loanId: z.string().uuid("Invalid loan Id"),
  }),
  body: z.object({
    amount: z.number().positive(),
    installmentId: z.string().uuid("Invalid installment Id"),
  }),
});

export const revertPaymentSchema = z.object({
  params: z.object({
    paymentId: z.string().uuid("Invalid payment Id"),
  }),
});

import { z } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterPaymentInput:
 *      type: object
 *      required:
 *        - amount
 *        - installmentId
 *      properties:
 *        amount:
 *          type: number
 *          default: 100
 *        installmentId:
 *          type: string
 *    PaymentResponse:
 *      type: object
 *      properties:
 *        payment:
 *          $ref: '#/components/schemas/Payment'
 *        installment:
 *          $ref: '#/components/schemas/Installment'
 *    Payment:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        installmentId:
 *          type: string
 *        amount:
 *          type: number
 *        isReverted:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
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

import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateLoanInput:
 *      type: object
 *      required:
 *        - offerId
 *      properties:
 *        offerId:
 *          type: string
 *    CreateLoanResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        userId:
 *          type: string
 *        offerId:
 *          type: string
 *        loanedAmount:
 *          type: number
 *        dueAmount:
 *          type: number
 *        term:
 *          type: number
 *        interestRate:
 *          type: number
 *        loanStatusId:
 *          type: number
 *        startDate:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        installments:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Installment'
 *    Installment:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        loanId:
 *          type: string
 *        installmentStatusId:
 *          type: number
 *        dueAmount:
 *          type: number
 *        dueDate:
 *          type: string
 *        paidAmount:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createLoanSchema = z.object({
  body: z.object({
    offerId: z.string().uuid("Invalid offer Id"),
  }),
  params: z.object({
    userId: z.string().uuid("Invalid user Id"),
  }),
});

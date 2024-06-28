import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateOfferInput:
 *      type: object
 *      required:
 *        - offers
 *      properties:
 *        offers:
 *          type: array
 *          minItems: 2
 *          items:
 *            type: object
 *            properties:
 *              amount:
 *                type: number
 *                default: 1000
 *              term:
 *                type: number
 *                default: 6
 *              interestRate:
 *                type: number
 *                default: 0.10
 *              offerStatusId:
 *                type: number
 *                default: 1
 *              startDate:
 *                type: string
 *                default: "2024-07-10"
 *    CreateOfferResponse:
 *      type: object
 *      properties:
 *        offers:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              userId:
 *                type: string
 *              amount:
 *                type: number
 *              term:
 *                type: number
 *              interestRate:
 *                type: number
 *              offerStatusId:
 *                type: number
 *              startDate:
 *                type: string
 *              createdAt:
 *                type: string
 *              updatedAt:
 *                type: string
 */

const offerSchema = z.object({
  amount: z.number().positive("Amount should be greater than 0"),
  term: z
    .number()
    .positive("Term should be greater than 0")
    .int("Term should be an integer"),
  interestRate: z
    .number()
    .positive("Interest rate should be greater than 0")
    .max(1, "Interest rate should be lesser than 1"),
  offerStatusId: z.number().int(),
  startDate: z.coerce.date(),
});

export const createOfferSchema = z.object({
  body: z.object({
    offers: z
      .array(offerSchema, { invalid_type_error: "Invalid offer" })
      .min(2, "Minimum 2 offers are required"),
  }),
  params: z.object({
    userId: z.string().uuid("Invalid user Id"),
  }),
});

import { z } from "zod";

export const createOfferSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    term: z.number().positive().int(),
    interestRate: z.number().positive(),
    offerStatusId: z.number().int(),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
});

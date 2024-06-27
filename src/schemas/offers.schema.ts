import { z } from "zod";
const offerSchema = z.object({
  amount: z.number().positive(),
  term: z.number().positive().int(),
  interestRate: z.number().positive().max(1),
  offerStatusId: z.number().int(),
});

export const createOfferSchema = z.object({
  body: z.object({
    offers: z
      .array(offerSchema, { invalid_type_error: "Invalid offer" })
      .min(2, "Minimum 2 offers are required"),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
});

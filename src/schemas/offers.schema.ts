import { z } from "zod";
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

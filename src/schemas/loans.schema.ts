import { z } from "zod";

export const createLoanSchema = z.object({
  body: z.object({
    offerId: z.string().uuid("Invalid offer Id"),
  }),
  params: z.object({
    userId: z.string().uuid("Invalid user Id"),
  }),
});

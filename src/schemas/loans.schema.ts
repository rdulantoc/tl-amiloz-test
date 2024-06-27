import { z } from "zod";

export const loanSchema = z.object({
  body: z.object({
    offerId: z.string().uuid(),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
});

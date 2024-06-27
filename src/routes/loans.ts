import { Router } from "express";
import { LoansController } from "../controllers/loans.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { loanSchema } from "../schemas/loans.schema";

export const loansRouter = Router();

loansRouter.post(
  "/:userId/prestamos",
  validateSchema(loanSchema),
  LoansController.createLoan
);

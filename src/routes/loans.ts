import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { registerPaymentSchema } from "../schemas/payments.schema";

export const loansRouter = Router();

loansRouter.post(
  "/:loanId/pagos",
  validateSchema(registerPaymentSchema),
  PaymentsController.registerPayment
);

import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { revertPaymentSchema } from "../schemas/payments.schema";

export const paymentsRouter = Router();

paymentsRouter.post(
  "/:paymentId/revertir",
  validateSchema(revertPaymentSchema),
  PaymentsController.revert
);

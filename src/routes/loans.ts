import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";

export const loansRouter = Router();

loansRouter.post("/:loanId/pagos", PaymentsController.registerPayment);

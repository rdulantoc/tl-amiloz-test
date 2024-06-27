import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";

export const paymentsRouter = Router();

paymentsRouter.post("/:paymentId/revertir", PaymentsController.revert);

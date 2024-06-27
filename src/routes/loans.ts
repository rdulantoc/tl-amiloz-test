import { Router } from "express";
import { LoansController } from "../controllers/loans.controller";

export const loansRouter = Router();

loansRouter.post("/:userId/prestamos", LoansController.createLoan);

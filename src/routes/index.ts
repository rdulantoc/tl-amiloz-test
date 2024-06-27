import { Router } from "express";
import { loansRouter } from "./loans";
import { paymentsRouter } from "./payments";
import { usersRouter } from "./users";

export const mainRouter = Router();

mainRouter.use("/usuarios", usersRouter);
mainRouter.use("/prestamos", loansRouter);
mainRouter.use("/pagos", paymentsRouter);

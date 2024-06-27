import { Router } from "express";
import { loansRouter } from "./loans";
import { usersRouter } from "./users";

export const mainRouter = Router();

mainRouter.use("/usuarios", usersRouter);
mainRouter.use("/prestamos", loansRouter);

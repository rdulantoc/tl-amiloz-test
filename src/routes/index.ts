import { Router } from "express";
import { usersRouter } from "./users";

export const mainRouter = Router();

mainRouter.use("/usuarios", usersRouter);

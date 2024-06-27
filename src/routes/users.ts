import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../schemas/users.schema";
import { loansRouter } from "./loans";
import { offersRouter } from "./offers";

export const usersRouter = Router();

usersRouter.post(
  "/",
  validateSchema(createUserSchema),
  UsersController.createUser
);

usersRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  UsersController.login
);

usersRouter.use("/", offersRouter);
usersRouter.use("/", loansRouter);

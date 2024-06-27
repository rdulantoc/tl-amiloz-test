import { Router } from "express";
import { LoansController } from "../controllers/loans.controller";
import { UsersController } from "../controllers/users.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createLoanSchema } from "../schemas/loans.schema";
import { createUserSchema, loginUserSchema } from "../schemas/users.schema";
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
usersRouter.post(
  "/:userId/prestamos",
  validateSchema(createLoanSchema),
  LoansController.createLoan
);

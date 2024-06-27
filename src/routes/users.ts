import { Router } from "express";
import { LoansController } from "../controllers/loans.controller";
import { UsersController } from "../controllers/users.controller";
import { authenticateToken } from "../middleware/authMiddleware";
import { validateRole } from "../middleware/roleMiddleware";
import { validateSchema } from "../middleware/validationMiddleware";
import { createLoanSchema } from "../schemas/loans.schema";
import { createUserSchema, loginUserSchema } from "../schemas/users.schema";
import { UserRoles } from "../types/enums";
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

usersRouter.use(
  "/",
  authenticateToken,
  validateRole(UserRoles.ADMIN),
  offersRouter
);
usersRouter.post(
  "/:userId/prestamos",
  authenticateToken,
  validateRole(UserRoles.USER),
  validateSchema(createLoanSchema),
  LoansController.createLoan
);

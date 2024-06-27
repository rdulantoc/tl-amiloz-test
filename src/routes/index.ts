import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { validateRole } from "../middleware/roleMiddleware";
import { UserRoles } from "../types/enums";
import { loansRouter } from "./loans";
import { paymentsRouter } from "./payments";
import { usersRouter } from "./users";

export const mainRouter = Router();

mainRouter.use("/usuarios", usersRouter);
mainRouter.use(
  "/prestamos",
  authenticateToken,
  validateRole(UserRoles.USER),
  loansRouter
);
mainRouter.use(
  "/pagos",
  authenticateToken,
  validateRole(UserRoles.USER),
  paymentsRouter
);

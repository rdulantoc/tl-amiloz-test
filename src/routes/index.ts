import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { validateRole } from "../middleware/roleMiddleware";
import { UserRoles } from "../types/enums";
import { loansRouter } from "./loans";
import { paymentsRouter } from "./payments";
import { usersRouter } from "./users";

export const mainRouter = Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *    tags:
 *    - Healthcheck
 *    description: Responds if the app is up and running
 *    responses:
 *      200:
 *        description: App is up and running
 */
mainRouter.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(200)
);

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

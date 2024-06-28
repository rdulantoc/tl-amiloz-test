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

/**
 * @openapi
 * '/usuarios':
 *  post:
 *    tags:
 *    - Users
 *    summary: Create a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Internal Server Error
 */
usersRouter.post(
  "/",
  validateSchema(createUserSchema),
  UsersController.createUser
);

/**
 * @openapi
 * '/usuarios/login':
 *  post:
 *    tags:
 *    - Users
 *    summary: User login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Internal Server Error
 */
usersRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  UsersController.login
);

/**
 * @openapi
 * '/usuarios/{userId}/prestamos':
 *  post:
 *    tags:
 *    - Loans
 *    summary: Create a loan
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: User ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateLoanInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateLoanResponse'
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 *      500:
 *        description: Internal Server Error
 */
usersRouter.post(
  "/:userId/prestamos",
  authenticateToken,
  validateRole(UserRoles.USER),
  validateSchema(createLoanSchema),
  LoansController.createLoan
);

usersRouter.use(
  "/",
  authenticateToken,
  validateRole(UserRoles.ADMIN),
  offersRouter
);

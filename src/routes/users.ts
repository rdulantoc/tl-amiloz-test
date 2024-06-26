import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createUserSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "/",
  validateSchema(createUserSchema),
  UsersController.createUser
);

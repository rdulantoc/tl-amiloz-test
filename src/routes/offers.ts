import { Router } from "express";
import { OffersController } from "../controllers/offers.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createOfferSchema } from "../schemas/offers.schema";

export const offersRouter = Router();

offersRouter.post(
  "/:userId/ofertas",
  validateSchema(createOfferSchema),
  OffersController.createOffer
);

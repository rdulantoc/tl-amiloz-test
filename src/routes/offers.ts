import { Router } from "express";
import { OfferController } from "../controllers/offers.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createOfferSchema } from "../schemas/offers.schema";

export const offersRouter = Router();

offersRouter.post(
  "/:userId/ofertas",
  validateSchema(createOfferSchema),
  OfferController.createOffer
);

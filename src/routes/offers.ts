import { Router } from "express";
import { OffersController } from "../controllers/offers.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { createOfferSchema } from "../schemas/offers.schema";

export const offersRouter = Router();

/**
 * @openapi
 * '/usuarios/{userId}/ofertas':
 *  post:
 *    tags:
 *      - Offers
 *    summary: Create an offer
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
 *            $ref: '#/components/schemas/CreateOfferInput'
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateOfferResponse'
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Internal Server Error
 */
offersRouter.post(
  "/:userId/ofertas",
  validateSchema(createOfferSchema),
  OffersController.createOffer
);

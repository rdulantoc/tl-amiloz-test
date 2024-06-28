import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { revertPaymentSchema } from "../schemas/payments.schema";

export const paymentsRouter = Router();

/**
 * @openapi
 * '/pagos/{paymentId}/revertir':
 *  post:
 *    tags:
 *      - Payments
 *    summary: Revert a payment
 *    parameters:
 *      - name: paymentId
 *        in: path
 *        description: Payment ID
 *        required: true
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentResponse'
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not Found
 *      405:
 *        description: Method Not Allowed
 *      500:
 *        description: Internal Server Error
 */
paymentsRouter.post(
  "/:paymentId/revertir",
  validateSchema(revertPaymentSchema),
  PaymentsController.revert
);

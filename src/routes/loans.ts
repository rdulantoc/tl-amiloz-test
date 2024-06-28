import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";
import { validateSchema } from "../middleware/validationMiddleware";
import { registerPaymentSchema } from "../schemas/payments.schema";

export const loansRouter = Router();

/**
 * @openapi
 * '/prestamos/{loanId}/pagos':
 *  post:
 *    tags:
 *      - Payments
 *    summary: Register a payment
 *    parameters:
 *      - name: loanId
 *        in: path
 *        description: Loan ID
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterPaymentInput'
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
loansRouter.post(
  "/:loanId/pagos",
  validateSchema(registerPaymentSchema),
  PaymentsController.registerPayment
);

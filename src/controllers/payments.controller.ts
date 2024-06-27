import { Request, Response } from "express";
import { InstallmentsModel } from "../models/installments.model";
import { PaymentsModel } from "../models/payments.model";
export class PaymentsController {
  static async registerPayment(req: Request, res: Response) {
    try {
      const { loanId } = req.params;
      const { amount, installmentId } = req.body;

      const installment =
        await InstallmentsModel.findClosestUnpaidInstallment(loanId);
      // register payment amount
      // Update installment to modify paidAmount and/or status

      if (!installment)
        return res
          .status(404)
          .json({ error: "Could not register payment. Installment not found" });

      if (installment.id !== installmentId)
        return res.status(405).json({
          error:
            "Could not register payment. Please select the closest installment",
        });

      const newPaidAmount = installment.paidAmount + amount;
      if (newPaidAmount > installment.dueAmount)
        return res.status(405).json({
          error:
            "Could not register payment. Amount is higher than unpaid amount",
        });

      // Register payment amount
      const payment = await PaymentsModel.registerPayment({
        installmentId,
        amount,
      });

      // Update installment to modify paidAmount and/or status
      const updatedInstallment = await InstallmentsModel.registerPayment(
        installment,
        newPaidAmount
      );

      res.status(201).send({ payment, installment: updatedInstallment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not register payment" });
    }
  }
}

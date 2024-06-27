import { Request, Response } from "express";
import { InstallmentsModel } from "../models/installments.model";
import { LoansModel } from "../models/loans.model";
import { PaymentsModel } from "../models/payments.model";
export class PaymentsController {
  static async registerPayment(req: Request, res: Response) {
    try {
      const { loanId } = req.params;
      const { amount, installmentId } = req.body;

      const installment =
        await InstallmentsModel.findClosestUnpaidInstallment(loanId);

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

      const payment = await PaymentsModel.registerPayment({
        installmentId,
        amount,
      });

      const updatedInstallment = await InstallmentsModel.registerPayment(
        installment,
        newPaidAmount
      );

      await LoansModel.updateStatus(loanId);

      res.status(201).send({ payment, installment: updatedInstallment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not register payment" });
    }
  }

  static async revert(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;

      const payment = await PaymentsModel.findById(paymentId);

      if (!payment)
        return res
          .status(404)
          .json({ error: "Could not revert payment. Payment not found" });

      const { installment, amount, isReverted } = payment;
      const { loanId } = installment;

      if (isReverted)
        return res
          .status(405)
          .json({
            error: "Could not revert payment. Payment is already reverted",
          });

      const revertedPayment = await PaymentsModel.revert(paymentId);
      const updatedInstallment = await InstallmentsModel.revertPayment(
        installment,
        amount
      );

      await LoansModel.updateStatus(loanId);

      res
        .status(201)
        .send({ revertedPayment, installment: updatedInstallment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not revert payment" });
    }
  }
}

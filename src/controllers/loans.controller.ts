import { Request, Response } from "express";
import { LoansModel } from "../models/loans.model";
import { OffersModel } from "../models/offers.model";
import { UsersModel } from "../models/users.model";

export class LoansController {
  static async createLoan(req: Request, res: Response) {
    const { userId } = req.params;
    const { offerId } = req.body;
    try {
      const user = await UsersModel.findById({ id: userId });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Could not create loan. User not found" });
      }

      const offer = await OffersModel.findById(offerId);
      if (!offer) {
        return res
          .status(404)
          .json({ error: "Could not create loan. Offer not found" });
      }

      if (offer.userId !== user.id)
        return res.status(403).json({
          error: "Could not create loan. Offer does not correspond to user",
        });

      const loan = await LoansModel.create(offer);

      return res.status(201).send(loan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not create loan" });
    }
  }
}

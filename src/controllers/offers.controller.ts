import { Request, Response } from "express";
import { OfferModel } from "../models/offers.model";
import { UsersModel } from "../models/users.model";

export class OfferController {
  static async createOffer(req: Request, res: Response) {
    const { userId } = req.params;
    const { amount, term, interestRate, offerStatusId } = req.body;

    try {
      const user = await UsersModel.findById({ id: userId });

      if (!user) {
        return res
          .status(404)
          .json({ error: "Could not create offer. User not found" });
      }

      const offer = await OfferModel.create({
        userId,
        amount,
        term,
        interestRate,
        offerStatusId,
      });

      return res.status(201).send(offer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not create offer" });
    }
  }
}

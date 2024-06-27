import { Offer } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class OfferModel {
  static async create(data: Partial<Offer>) {
    return prisma.offer.create({ data } as { data: Offer });
  }
}

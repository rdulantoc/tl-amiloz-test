import { Offer } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class OfferModel {
  static async create(data: Partial<Offer>) {
    return prisma.offer.create({ data } as { data: Offer });
  }

  static async createMany(userId: string, data: Partial<Offer>[]) {
    const offers = data.map((offer) => ({ ...offer, userId }));
    return prisma.offer.createManyAndReturn({ data: offers } as {
      data: Offer[];
    });
  }
}

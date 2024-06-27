import { Offer } from "@prisma/client";
import { prisma } from "../clients/prisma";

export class OffersModel {
  static async create(data: Partial<Offer>) {
    return prisma.offer.create({ data } as { data: Offer });
  }

  static async createMany(userId: string, data: Partial<Offer>[]) {
    const offers = data.map((offer) => ({
      ...offer,
      userId,
      startDate: new Date(offer.startDate ?? Date.now()),
    }));
    return prisma.offer.createManyAndReturn({ data: offers } as {
      data: Offer[];
    });
  }

  static async findById(offerId: string) {
    return prisma.offer.findUnique({ where: { id: offerId } });
  }
}

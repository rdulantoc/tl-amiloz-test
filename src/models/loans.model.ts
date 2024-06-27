import { Offer } from "@prisma/client";
import { prisma } from "../clients/prisma";
import { calculateInstallmentAmount } from "../utils/calculateInstallmentAmount";
import { InstallmentsModel } from "./installments.model";
import { LoanStatusModel } from "./loanStatus.model";
import { OffersModel } from "./offers.model";

const DEFAULT_LOAN_STATUS = "Pending";

export class LoansModel {
  static async create(offer: Offer) {
    const {
      userId,
      amount: loanedAmount,
      term,
      interestRate,
      id: offerId,
      startDate,
    } = offer;
    const installmentAmount = calculateInstallmentAmount(
      loanedAmount,
      interestRate,
      term
    );
    const dueAmount = term * installmentAmount;

    const loanStatusId = await LoanStatusModel.getId(DEFAULT_LOAN_STATUS);

    const loan = {
      userId,
      loanedAmount,
      term,
      interestRate,
      offerId,
      dueAmount,
      loanStatusId,
      startDate,
    };

    const createdLoan = await prisma.loan.create({
      data: loan,
    });
    const { id: loanId } = createdLoan;

    const createdInstallments = await InstallmentsModel.createMany(
      loanId,
      term,
      installmentAmount,
      startDate
    );

    await OffersModel.acceptOffer(offer);

    return { ...createdLoan, installments: createdInstallments };
  }

  static async updateStatus(loanId: string) {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      select: {
        installment: {
          select: {
            status: true,
          },
        },
      },
    });

    const isPaid = loan?.installment.every(
      (item) => item.status.status === "Completed"
    );

    const status = isPaid ? "Paid" : "Active";

    return prisma.loan.update({
      where: {
        id: loanId,
      },
      data: {
        status: {
          connect: {
            status,
          },
        },
      },
    });
  }
}

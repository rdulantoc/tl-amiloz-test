import { Offer } from "@prisma/client";
import { prisma } from "../clients/prisma";
import { calculateInstallmentAmount } from "../utils/calculateInstallmentAmount";
import { InstallmentsModel } from "./installments.model";

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

    const defaultLoanStatus = await prisma.loanStatus.findFirst({
      select: { id: true },
      where: { status: DEFAULT_LOAN_STATUS },
    });
    const loanStatusId = defaultLoanStatus!.id;

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

    return { ...createdLoan, installments: createdInstallments };
  }
}

export const calculateInstallmentAmount = (
  loanedAmount: number,
  interestRate: number,
  term: number
) => {
  const compoundFactor = Math.pow(1 + interestRate, term);
  return (loanedAmount * interestRate * compoundFactor) / (compoundFactor - 1);
};

import { BillingPeriod } from '@realgimm5/frontend-common/gql/types';

export const calcContractBillingInstallment = (baseFee: number | null, period: BillingPeriod | null) => {
  if (!baseFee || !period) {
    return null;
  }

  switch (period) {
    case BillingPeriod.Bimonthly:
      return baseFee / 6;
    case BillingPeriod.Monthly:
      return baseFee / 12;
    case BillingPeriod.PerQuadrimester:
      return baseFee / 3;
    case BillingPeriod.PerQuarter:
      return baseFee / 4;
    case BillingPeriod.PerSemester:
      return baseFee / 2;
    case BillingPeriod.Yearly:
      return baseFee;
  }
};

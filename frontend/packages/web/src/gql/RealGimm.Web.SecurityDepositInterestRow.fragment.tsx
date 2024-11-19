// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type SecurityDepositInterestRowFragment = {
  __typename?: 'SecurityDepositInterestRow';
  since?: string | null;
  until?: string | null;
  baseAmount: number;
  calculationDate: string;
  interestAmount: number;
  appliedInterestRate: number;
  id: number;
};

export const SecurityDepositInterestRowFragmentDoc = gql`
  fragment SecurityDepositInterestRowFragment on SecurityDepositInterestRow {
    since
    until
    baseAmount
    calculationDate
    interestAmount
    appliedInterestRate
    id
  }
`;

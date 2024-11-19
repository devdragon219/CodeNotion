// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ValuationFragment = {
  __typename?: 'Valuation';
  referenceYear: number;
  iasValue?: number | null;
  rbaValue?: number | null;
  mortgageAmount?: number | null;
  transferYear?: number | null;
  revampOperations?: number | null;
  id: number;
};

export const ValuationFragmentDoc = gql`
  fragment ValuationFragment on Valuation {
    referenceYear
    iasValue
    rbaValue
    mortgageAmount
    transferYear
    revampOperations
    id
  }
`;

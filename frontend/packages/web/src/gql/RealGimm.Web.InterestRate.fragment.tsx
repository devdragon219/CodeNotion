// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type InterestRateFragment = {
  __typename?: 'InterestRate';
  id: number;
  since?: string | null;
  until?: string | null;
  rate: number;
};

export const InterestRateFragmentDoc = gql`
  fragment InterestRateFragment on InterestRate {
    id
    since
    until
    rate
  }
`;

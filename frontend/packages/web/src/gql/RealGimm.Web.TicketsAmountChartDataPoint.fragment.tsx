// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TicketsAmountChartDataPointFragment = {
  __typename?: 'TicketsAmountChartDataPoint';
  excludedAmount: number;
  nonExcludedAmount: number;
};

export const TicketsAmountChartDataPointFragmentDoc = gql`
  fragment TicketsAmountChartDataPointFragment on TicketsAmountChartDataPoint {
    excludedAmount
    nonExcludedAmount
  }
`;

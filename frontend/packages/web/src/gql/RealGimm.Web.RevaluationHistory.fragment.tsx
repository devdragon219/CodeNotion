// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type RevaluationHistoryFragment = {
  __typename?: 'RevaluationHistory';
  since: string;
  baseYearlyRate: number;
  indexPercent: number;
  revaluationAmount: number;
  yearlyRateWithRevaluation: number;
  id: number;
};

export const RevaluationHistoryFragmentDoc = gql`
  fragment RevaluationHistoryFragment on RevaluationHistory {
    since
    baseYearlyRate
    indexPercent
    revaluationAmount
    yearlyRateWithRevaluation
    id
  }
`;

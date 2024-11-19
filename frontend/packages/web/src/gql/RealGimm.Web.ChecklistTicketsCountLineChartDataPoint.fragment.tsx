// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ChecklistTicketsCountLineChartDataPointFragment = {
  __typename?: 'ChecklistTicketsCountLineChartDataPoint';
  preventiveCount: number;
  onTriggerConditionCount: number;
};

export const ChecklistTicketsCountLineChartDataPointFragmentDoc = gql`
  fragment ChecklistTicketsCountLineChartDataPointFragment on ChecklistTicketsCountLineChartDataPoint {
    preventiveCount
    onTriggerConditionCount
  }
`;

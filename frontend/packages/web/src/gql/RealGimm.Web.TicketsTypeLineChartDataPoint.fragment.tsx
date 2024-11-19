// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TicketsTypeLineChartDataPointFragment = {
  __typename?: 'TicketsTypeLineChartDataPoint';
  issuesCount: number;
  preventiveCount: number;
  onTriggerConditionCount: number;
};

export const TicketsTypeLineChartDataPointFragmentDoc = gql`
  fragment TicketsTypeLineChartDataPointFragment on TicketsTypeLineChartDataPoint {
    issuesCount
    preventiveCount
    onTriggerConditionCount
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type IssuesStatusLineChartDataPointFragment = {
  __typename?: 'IssuesStatusLineChartDataPoint';
  newCount: number;
  assignedCount: number;
  inProgressCount: number;
  resolvedCount: number;
  completedCount: number;
};

export const IssuesStatusLineChartDataPointFragmentDoc = gql`
  fragment IssuesStatusLineChartDataPointFragment on IssuesStatusLineChartDataPoint {
    newCount
    assignedCount
    inProgressCount
    resolvedCount
    completedCount
  }
`;

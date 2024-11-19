// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type IssuesExcludedFromMaintenanceContractLineChartDataPointFragment = {
  __typename?: 'IssuesExcludedFromMaintenanceContractLineChartDataPoint';
  excludedCount: number;
  nonExcludedCount: number;
};

export const IssuesExcludedFromMaintenanceContractLineChartDataPointFragmentDoc = gql`
  fragment IssuesExcludedFromMaintenanceContractLineChartDataPointFragment on IssuesExcludedFromMaintenanceContractLineChartDataPoint {
    excludedCount
    nonExcludedCount
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type UsageTypeDistributionFragment = {
  __typename?: 'UsageTypeDistribution';
  percentage: number;
  usageTypeName: string;
};

export const UsageTypeDistributionFragmentDoc = gql`
  fragment UsageTypeDistributionFragment on UsageTypeDistribution {
    percentage
    usageTypeName
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateUnitTypeDistributionFragment = {
  __typename?: 'EstateUnitTypeDistribution';
  percentage: number;
  estateUnitType: Types.EstateUnitType;
};

export const EstateUnitTypeDistributionFragmentDoc = gql`
  fragment EstateUnitTypeDistributionFragment on EstateUnitTypeDistribution {
    percentage
    estateUnitType
  }
`;

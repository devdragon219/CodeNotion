// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CostChargeAnalysisValueFragment = {
  __typename?: 'CostChargeAnalysisValue';
  totalConsumption: number;
  consumptionPerGrossSurface?: number | null;
  consumptionPerHeatingCoolingSurface?: number | null;
  totalCost: number;
  costPerGrossSurface?: number | null;
  costPerHeatingCoolingSurface?: number | null;
};

export const CostChargeAnalysisValueFragmentDoc = gql`
  fragment CostChargeAnalysisValueFragment on CostChargeAnalysisValue {
    totalConsumption
    consumptionPerGrossSurface
    consumptionPerHeatingCoolingSurface
    totalCost
    costPerGrossSurface
    costPerHeatingCoolingSurface
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CostChargeAnalysisValueFragmentDoc } from './RealGimm.Web.CostChargeAnalysisValue.fragment';

export type CostChargeAnalysisFragment = {
  __typename?: 'CostChargeAnalysis';
  measurementUnit: string;
  surface: {
    __typename?: 'CostChargeAnalysisSurface';
    currentYear?: { __typename?: 'CostChargeAnalysisSurfaceValue'; area: number; date: string } | null;
    previousYear?: { __typename?: 'CostChargeAnalysisSurfaceValue'; area: number; date: string } | null;
  };
  consumption: {
    __typename?: 'CostChargeAnalysisConsumption';
    currentYearValue: number;
    previousYearValue: number;
    difference: number;
    differencePercentage?: number | null;
  };
  cost: {
    __typename?: 'CostChargeAnalysisCost';
    currentYearValue: number;
    previousYearValue: number;
    difference: number;
    differencePercentage?: number | null;
  };
  perYear: Array<{
    __typename?: 'KeyValuePairOfInt32AndCostChargeYearlyAnalysis';
    key: number;
    value: {
      __typename?: 'CostChargeYearlyAnalysis';
      value: {
        __typename?: 'CostChargeAnalysisValue';
        totalConsumption: number;
        consumptionPerGrossSurface?: number | null;
        consumptionPerHeatingCoolingSurface?: number | null;
        totalCost: number;
        costPerGrossSurface?: number | null;
        costPerHeatingCoolingSurface?: number | null;
      };
      perMonth?: Array<{
        __typename?: 'KeyValuePairOfInt32AndCostChargeAnalysisValue';
        key: number;
        value: {
          __typename?: 'CostChargeAnalysisValue';
          totalConsumption: number;
          consumptionPerGrossSurface?: number | null;
          consumptionPerHeatingCoolingSurface?: number | null;
          totalCost: number;
          costPerGrossSurface?: number | null;
          costPerHeatingCoolingSurface?: number | null;
        };
      }> | null;
    };
  }>;
};

export const CostChargeAnalysisFragmentDoc = gql`
  fragment CostChargeAnalysisFragment on CostChargeAnalysis {
    measurementUnit
    surface {
      currentYear {
        area
        date
      }
      previousYear {
        area
        date
      }
    }
    consumption {
      currentYearValue
      previousYearValue
      difference
      differencePercentage
    }
    cost {
      currentYearValue
      previousYearValue
      difference
      differencePercentage
    }
    perYear {
      key
      value {
        value {
          ...CostChargeAnalysisValueFragment
        }
        perMonth {
          key
          value {
            ...CostChargeAnalysisValueFragment
          }
        }
      }
    }
  }
`;

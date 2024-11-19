// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';

export type CadastralUnitIncomeFragment = {
  __typename?: 'CadastralUnitIncome';
  macroCategory?: string | null;
  microCategory?: string | null;
  metric?: Types.IncomeMetric | null;
  metricAmount?: number | null;
  metricRentedAmount?: number | null;
  registeredSurface?: number | null;
  type?: Types.IncomeType | null;
  cadastralAmount?: number | null;
  farmAmount?: number | null;
  landAmount?: number | null;
  marketValue?: number | null;
  cadastralCategory?: {
    __typename?: 'CadastralCategory';
    id: number;
    description: string;
    externalCode?: string | null;
  } | null;
  cadastralLandCategory?: {
    __typename?: 'CadastralLandCategory';
    id: number;
    description: string;
    internalCode: string;
    countryISO: string;
    ordering: number;
  } | null;
};

export const CadastralUnitIncomeFragmentDoc = gql`
  fragment CadastralUnitIncomeFragment on CadastralUnitIncome {
    cadastralCategory {
      ...CadastralCategoryFragment
    }
    cadastralLandCategory {
      ...CadastralLandCategoryFragment
    }
    macroCategory
    microCategory
    metric
    metricAmount
    metricRentedAmount
    registeredSurface
    type
    cadastralAmount
    farmAmount
    landAmount
    marketValue
  }
`;

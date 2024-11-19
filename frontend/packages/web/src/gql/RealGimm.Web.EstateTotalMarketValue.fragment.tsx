// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateTotalMarketValueFragment = {
  __typename?: 'EstateTotalMarketValue';
  totalSurfaceAreaSqM: number;
  notes?: string | null;
  coefficients: Array<{
    __typename?: 'EstateTotalMarketValueCoefficient';
    id: number;
    type: Types.EstateTotalMarketValueCoefficientType;
    value: number;
  }>;
  marketValues: Array<{
    __typename?: 'EstateMarketValue';
    id: number;
    type: Types.EstateMarketValueType;
    value: number;
  }>;
};

export const EstateTotalMarketValueFragmentDoc = gql`
  fragment EstateTotalMarketValueFragment on EstateTotalMarketValue {
    totalSurfaceAreaSqM
    notes
    coefficients {
      id
      type
      value
    }
    marketValues {
      id
      type
      value
    }
  }
`;

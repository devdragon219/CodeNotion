// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TaxConfigSubTableRowFragment_TaxConfigCoefficientSubTableRow = {
  __typename?: 'TaxConfigCoefficientSubTableRow';
  id: number;
  referenceYear: string;
  coefficient?: number | null;
};

export type TaxConfigSubTableRowFragment_TaxConfigRateSubTableRow = {
  __typename?: 'TaxConfigRateSubTableRow';
  id: number;
  code: string;
  description: string;
  rate?: number | null;
};

export type TaxConfigSubTableRowFragment =
  | TaxConfigSubTableRowFragment_TaxConfigCoefficientSubTableRow
  | TaxConfigSubTableRowFragment_TaxConfigRateSubTableRow;

export const TaxConfigSubTableRowFragmentDoc = gql`
  fragment TaxConfigSubTableRowFragment on TaxConfigSubTableRow {
    ... on TaxConfigCoefficientSubTableRow {
      id
      referenceYear
      coefficient
    }
    ... on TaxConfigRateSubTableRow {
      id
      code
      description
      rate
    }
  }
`;

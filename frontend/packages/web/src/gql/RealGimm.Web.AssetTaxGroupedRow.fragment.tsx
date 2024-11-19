// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type AssetTaxFragment = {
  __typename?: 'AssetTaxGroupedRow';
  expectedDueDate?: string | null;
  lastUpdate?: string | null;
  managementSubject?: string | null;
  managementSubjectId: number;
  totalAmount?: number | null;
  totalTaxableAmount?: number | null;
  year: number;
  assetTaxCalculation: { __typename?: 'AssetTaxCalculation'; id: number; taxCalculator: string };
  payments?: Array<{
    __typename?: 'AssetTaxPayment';
    issue?: Types.CalculationIssue | null;
    isDefinitive: boolean;
    isIssueOverridden: boolean;
    id: number;
    assetTaxCalculation?: {
      __typename?: 'AssetTaxCalculation';
      id: number;
      cadastralUnit: {
        __typename?: 'CadastralUnit';
        id: number;
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
          estate: { __typename?: 'Estate'; id: number; internalCode: string };
        };
      };
    } | null;
  }> | null;
};

export const AssetTaxFragmentDoc = gql`
  fragment AssetTaxFragment on AssetTaxGroupedRow {
    assetTaxCalculation {
      id
      taxCalculator
    }
    expectedDueDate
    lastUpdate
    managementSubject
    managementSubjectId
    totalAmount
    totalTaxableAmount
    year
    payments {
      assetTaxCalculation {
        id
        cadastralUnit {
          id
          estateUnit {
            id
            internalCode
            estate {
              id
              internalCode
            }
          }
        }
      }
      issue
      isDefinitive
      isIssueOverridden
      id
    }
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ColumnFragmentDoc } from './RealGimm.Web.Column.fragment';
import { TableFragmentDoc } from './RealGimm.Web.Table.fragment';
import { TaxCalculatorFragmentDoc } from './RealGimm.Web.TaxCalculator.fragment';
import { TaxConfigColumnFragmentDoc } from './RealGimm.Web.TaxConfigColumn.fragment';
import { TaxConfigMainTableRowFragmentDoc } from './RealGimm.Web.TaxConfigMainTableRow.fragment';
import { TaxConfigSubTableRowFragmentDoc } from './RealGimm.Web.TaxConfigSubTableRow.fragment';

export type TaxConfigValueBundleFragment = {
  __typename?: 'TaxConfigValueBundle';
  calculator: {
    __typename?: 'TaxCalculator';
    id: string;
    description: string;
    configuration:
      | {
          __typename?: 'ItaILIAConfiguration';
          availableMainTables: Array<{
            __typename?: 'Table';
            code: string;
            canAddRemoveRows: boolean;
            columns: Array<{
              __typename?: 'Column';
              code: string;
              sourceField?: string | null;
              sourceKey: string;
              filterKey?: string | null;
              valueType: Types.SubValueType;
              isVisibleInTable: boolean;
              isVisibleInDetail: boolean;
              isReadonly: boolean;
              isMandatory: boolean;
            }>;
          }>;
          availableSubTables: Array<{
            __typename?: 'KeyValuePairOfStringAndTable__';
            key: string;
            value: Array<{
              __typename?: 'Table';
              code: string;
              canAddRemoveRows: boolean;
              columns: Array<{
                __typename?: 'Column';
                code: string;
                sourceField?: string | null;
                sourceKey: string;
                filterKey?: string | null;
                valueType: Types.SubValueType;
                isVisibleInTable: boolean;
                isVisibleInDetail: boolean;
                isReadonly: boolean;
                isMandatory: boolean;
              }>;
            }>;
          }>;
        }
      | {
          __typename?: 'ItaIMUConfiguration';
          availableMainTables: Array<{
            __typename?: 'Table';
            code: string;
            canAddRemoveRows: boolean;
            columns: Array<{
              __typename?: 'Column';
              code: string;
              sourceField?: string | null;
              sourceKey: string;
              filterKey?: string | null;
              valueType: Types.SubValueType;
              isVisibleInTable: boolean;
              isVisibleInDetail: boolean;
              isReadonly: boolean;
              isMandatory: boolean;
            }>;
          }>;
          availableSubTables: Array<{
            __typename?: 'KeyValuePairOfStringAndTable__';
            key: string;
            value: Array<{
              __typename?: 'Table';
              code: string;
              canAddRemoveRows: boolean;
              columns: Array<{
                __typename?: 'Column';
                code: string;
                sourceField?: string | null;
                sourceKey: string;
                filterKey?: string | null;
                valueType: Types.SubValueType;
                isVisibleInTable: boolean;
                isVisibleInDetail: boolean;
                isReadonly: boolean;
                isMandatory: boolean;
              }>;
            }>;
          }>;
        };
  };
  mainValue:
    | {
        __typename?: 'TaxConfigGenericRow';
        id: number;
        year: number;
        otherColumns: Array<{
          __typename?: 'TaxConfigColumn';
          key: string;
          type: Types.SubValueType;
          numberValue?: number | null;
          stringValue?: string | null;
          booleanValue?: boolean | null;
          dateValue?: string | null;
        }>;
      }
    | {
        __typename?: 'TaxConfigGroupedRow';
        id: number;
        groupingReference?: string | null;
        year: number;
        city?: {
          __typename?: 'City';
          guid: string;
          id: number;
          name: string;
          countyName?: string | null;
          countryName?: string | null;
          countryISO: string;
          cadastralCode?: string | null;
        } | null;
        otherColumns: Array<{
          __typename?: 'TaxConfigColumn';
          key: string;
          type: Types.SubValueType;
          numberValue?: number | null;
          stringValue?: string | null;
          booleanValue?: boolean | null;
          dateValue?: string | null;
        }>;
      };
  allSubTableValues: Array<{
    __typename?: 'KeyValuePairOfStringAndITaxConfigSubTableRow__';
    key: string;
    value: Array<
      | {
          __typename?: 'TaxConfigCoefficientSubTableRow';
          id: number;
          referenceYear: string;
          coefficient?: number | null;
        }
      | { __typename?: 'TaxConfigRateSubTableRow'; id: number; code: string; description: string; rate?: number | null }
    >;
  }>;
};

export const TaxConfigValueBundleFragmentDoc = gql`
  fragment TaxConfigValueBundleFragment on TaxConfigValueBundle {
    calculator {
      ...TaxCalculatorFragment
    }
    mainValue {
      ...TaxConfigMainTableRowFragment
    }
    allSubTableValues {
      key
      value {
        ...TaxConfigSubTableRowFragment
      }
    }
  }
`;

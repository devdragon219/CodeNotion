// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ColumnFragmentDoc } from './RealGimm.Web.Column.fragment';
import { TableFragmentDoc } from './RealGimm.Web.Table.fragment';

export type TaxCalculatorFragment = {
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

export const TaxCalculatorFragmentDoc = gql`
  fragment TaxCalculatorFragment on TaxCalculator {
    id
    description
    configuration {
      availableMainTables {
        ...TableFragment
      }
      availableSubTables {
        key
        value {
          ...TableFragment
        }
      }
    }
  }
`;

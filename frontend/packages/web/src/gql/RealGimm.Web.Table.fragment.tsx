// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ColumnFragmentDoc } from './RealGimm.Web.Column.fragment';

export type TableFragment = {
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
};

export const TableFragmentDoc = gql`
  fragment TableFragment on Table {
    code
    columns {
      ...ColumnFragment
    }
    canAddRemoveRows
  }
`;

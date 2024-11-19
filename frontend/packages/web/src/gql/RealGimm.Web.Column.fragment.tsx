// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ColumnFragment = {
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
};

export const ColumnFragmentDoc = gql`
  fragment ColumnFragment on Column {
    code
    sourceField
    sourceKey
    filterKey
    valueType
    isVisibleInTable
    isVisibleInDetail
    isReadonly
    isMandatory
  }
`;

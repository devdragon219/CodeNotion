// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TaxConfigColumnFragment = {
  __typename?: 'TaxConfigColumn';
  key: string;
  type: Types.SubValueType;
  numberValue?: number | null;
  stringValue?: string | null;
  booleanValue?: boolean | null;
  dateValue?: string | null;
};

export const TaxConfigColumnFragmentDoc = gql`
  fragment TaxConfigColumnFragment on TaxConfigColumn {
    key
    type
    numberValue
    stringValue
    booleanValue
    dateValue
  }
`;

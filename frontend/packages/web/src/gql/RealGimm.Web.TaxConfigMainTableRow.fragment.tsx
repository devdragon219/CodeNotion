// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { TaxConfigColumnFragmentDoc } from './RealGimm.Web.TaxConfigColumn.fragment';

export type TaxConfigMainTableRowFragment_TaxConfigGenericRow = {
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
};

export type TaxConfigMainTableRowFragment_TaxConfigGroupedRow = {
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

export type TaxConfigMainTableRowFragment =
  | TaxConfigMainTableRowFragment_TaxConfigGenericRow
  | TaxConfigMainTableRowFragment_TaxConfigGroupedRow;

export const TaxConfigMainTableRowFragmentDoc = gql`
  fragment TaxConfigMainTableRowFragment on TaxConfigMainTableRow {
    ... on TaxConfigGenericRow {
      id
      year
      otherColumns {
        ...TaxConfigColumnFragment
      }
    }
    ... on TaxConfigGroupedRow {
      id
      groupingReference
      year
      city {
        ...CityFragment
      }
      otherColumns {
        ...TaxConfigColumnFragment
      }
    }
  }
`;

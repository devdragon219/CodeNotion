// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type PriceListFragment = {
  __typename?: 'PriceList';
  internalCode: string;
  name: string;
  ordering: number;
  id: number;
};

export type PriceListDetailFragment = {
  __typename?: 'PriceList';
  internalCode: string;
  name: string;
  ordering: number;
  isDefault: boolean;
  id: number;
};

export const PriceListFragmentDoc = gql`
  fragment PriceListFragment on PriceList {
    internalCode
    name
    ordering
    id
  }
`;
export const PriceListDetailFragmentDoc = gql`
  fragment PriceListDetailFragment on PriceList {
    internalCode
    name
    ordering
    isDefault
    id
  }
`;

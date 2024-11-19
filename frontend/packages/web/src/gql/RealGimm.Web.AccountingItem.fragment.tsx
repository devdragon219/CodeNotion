// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type AccountingItemFragment = {
  __typename?: 'AccountingItem';
  id: number;
  description: string;
  internalCode: string;
  externalCode: string;
};

export const AccountingItemFragmentDoc = gql`
  fragment AccountingItemFragment on AccountingItem {
    id
    description
    internalCode
    externalCode
  }
`;

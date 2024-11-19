// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type BillRowFragment = {
  __typename?: 'BillRow';
  since?: string | null;
  until?: string | null;
  amount: number;
  id: number;
  itemType: {
    __typename?: 'BillItemType';
    description: string;
    id: number;
    defaultAccountingItem?: { __typename?: 'AccountingItem'; internalCode: string } | null;
  };
  vatRate: { __typename?: 'VATRate'; internalCode: string; description: string; ratePercent: number; id: number };
};

export const BillRowFragmentDoc = gql`
  fragment BillRowFragment on BillRow {
    itemType {
      description
      id
      defaultAccountingItem {
        internalCode
      }
    }
    since
    until
    amount
    vatRate {
      internalCode
      description
      ratePercent
      id
    }
    id
  }
`;

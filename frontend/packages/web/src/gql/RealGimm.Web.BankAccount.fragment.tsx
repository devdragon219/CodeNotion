// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type BankAccountFragment = {
  __typename?: 'BankAccount';
  bankAccountType: Types.BankAccountType;
  referenceCode?: string | null;
  referenceCodeType: Types.BankAccountCodeType;
  notes?: string | null;
  accountHolder?: string | null;
  id: number;
};

export const BankAccountFragmentDoc = gql`
  fragment BankAccountFragment on BankAccount {
    bankAccountType
    referenceCode
    referenceCodeType
    notes
    accountHolder
    id
  }
`;

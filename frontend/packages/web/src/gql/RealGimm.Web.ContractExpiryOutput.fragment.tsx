// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ContractExpiryOutputFragment = {
  __typename?: 'ContractExpiryOutput';
  contractId: number;
  internalCode: string;
  typeDescription?: string | null;
  daysToExpiration: number;
  managementSubjectName?: string | null;
  billingBaseFee?: number | null;
};

export const ContractExpiryOutputFragmentDoc = gql`
  fragment ContractExpiryOutputFragment on ContractExpiryOutput {
    contractId
    internalCode
    typeDescription
    daysToExpiration
    managementSubjectName
    billingBaseFee
  }
`;

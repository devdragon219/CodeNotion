// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type BillFullListOutputFragment = {
  __typename?: 'BillFullListOutput';
  id: number;
  contractId: number;
  contractInternalCode: string;
  since?: string | null;
  mainCounterpartSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  contractManagementSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
};

export const BillFullListOutputFragmentDoc = gql`
  fragment BillFullListOutputFragment on BillFullListOutput {
    id
    contractId
    contractInternalCode
    since
    mainCounterpartSubject {
      id
      name
    }
    contractManagementSubject {
      id
      name
    }
  }
`;

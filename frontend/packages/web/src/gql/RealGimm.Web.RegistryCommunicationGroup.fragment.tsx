// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { RegistryCommunicationGroupIdFragmentDoc } from './RealGimm.Web.RegistryCommunicationGroupId.fragment';
import { RegistryCommunicationManagementSubjectFragmentDoc } from './RealGimm.Web.Subject.fragment';

export type RegistryCommunicationGroupFragment = {
  __typename?: 'RegistryCommunicationGroup';
  debtAmount?: number | null;
  hasAnomalies: boolean;
  anomaliesCount: number;
  id: {
    __typename?: 'RegistryCommunicationGroupId';
    managementSubjectId: number;
    isActiveContract: boolean;
    communicationType: Types.CommunicationType;
    endDate?: string | null;
    date?: string | null;
    requestingSubjectLegalRepresentativeId?: number | null;
    debtBankAccountId?: number | null;
  };
  managementSubject:
    | {
        __typename?: 'LegalSubject';
        id: number;
        name: string;
        bankAccounts: Array<{ __typename?: 'BankAccount'; id: number; referenceCode?: string | null }>;
        officers: Array<{
          __typename?: 'SubjectRelation';
          id: number;
          subordinate:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
        }>;
      }
    | {
        __typename?: 'ManagementSubject';
        id: number;
        name: string;
        bankAccounts: Array<{ __typename?: 'BankAccount'; id: number; referenceCode?: string | null }>;
        officers: Array<{
          __typename?: 'SubjectRelation';
          id: number;
          subordinate:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
        }>;
      }
    | {
        __typename?: 'PhysicalSubject';
        id: number;
        name: string;
        bankAccounts: Array<{ __typename?: 'BankAccount'; id: number; referenceCode?: string | null }>;
        officers: Array<{
          __typename?: 'SubjectRelation';
          id: number;
          subordinate:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
        }>;
      };
  requestingSubjectLegalRepresentative?:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string }
    | null;
  debtBankAccount?: { __typename?: 'BankAccount'; id: number; referenceCode?: string | null } | null;
};

export const RegistryCommunicationGroupFragmentDoc = gql`
  fragment RegistryCommunicationGroupFragment on RegistryCommunicationGroup {
    id {
      ...RegistryCommunicationGroupIdFragment
    }
    debtAmount
    managementSubject {
      ...RegistryCommunicationManagementSubjectFragment
    }
    requestingSubjectLegalRepresentative {
      id
      name
    }
    debtBankAccount {
      id
      referenceCode
    }
    hasAnomalies
    anomaliesCount
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type RegistryCommunicationGroupIdFragment = {
  __typename?: 'RegistryCommunicationGroupId';
  managementSubjectId: number;
  isActiveContract: boolean;
  communicationType: Types.CommunicationType;
  endDate?: string | null;
  date?: string | null;
  requestingSubjectLegalRepresentativeId?: number | null;
  debtBankAccountId?: number | null;
};

export const RegistryCommunicationGroupIdFragmentDoc = gql`
  fragment RegistryCommunicationGroupIdFragment on RegistryCommunicationGroupId {
    managementSubjectId
    isActiveContract
    communicationType
    endDate
    date
    requestingSubjectLegalRepresentativeId
    debtBankAccountId
  }
`;

// @ts-nocheck
import gql from 'graphql-tag';

import * as Types from './types';

export type UserProfileFragment = {
  __typename?: 'User';
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  status: Types.UserStatus;
  enabledSince?: string | null;
  managementSubjects: Array<
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string }
  >;
  contacts: Array<{
    __typename?: 'IAMContact';
    id: number;
    contactType: Types.ContactType;
    contactInfo?: string | null;
    contactInfoType: Types.ContactInfoType;
  }>;
};

export const UserProfileFragmentDoc = gql`
  fragment UserProfileFragment on User {
    id
    firstName
    lastName
    userName
    status
    enabledSince
    managementSubjects {
      id
      name
    }
    contacts {
      id
      contactType
      contactInfo
      contactInfoType
    }
  }
`;

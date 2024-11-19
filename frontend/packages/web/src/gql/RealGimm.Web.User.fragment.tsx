// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { GroupDetailFragmentDoc } from './RealGimm.Web.Group.fragment';
import { UserContactFragmentDoc } from './RealGimm.Web.IAMContact.fragment';
import { OrgUnitFragmentDoc } from './RealGimm.Web.OrgUnit.fragment';
import { GroupPermissionSummaryFragmentDoc } from './RealGimm.Web.PermissionSummary.fragment';

export type UserFragment = {
  __typename?: 'User';
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  status: Types.UserStatus;
  type: Types.UserType;
  officeAccess: Types.OfficeAccess;
  managementSubjects: Array<
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string }
  >;
  groups: Array<{ __typename?: 'Group'; id: number; name: string }>;
};

export type UserDetailFragment = {
  __typename?: 'User';
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  type: Types.UserType;
  officeAccess: Types.OfficeAccess;
  status: Types.UserStatus;
  enabledSince?: string | null;
  ceasedDate?: string | null;
  lockedSince?: string | null;
  suspensionReason?: string | null;
  supplierSubject?:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string }
    | null;
  groups: Array<{
    __typename?: 'Group';
    id: number;
    name: string;
    description?: string | null;
    permissionSummary: Array<{
      __typename?: 'PermissionSummary';
      feature: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    }>;
  }>;
  managementSubjects: Array<
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string }
  >;
  managementOrgUnits: Array<{
    __typename?: 'OrgUnit';
    id: number;
    name?: string | null;
    internalCode: string;
    externalCode?: string | null;
    entryStatus: Types.EntryStatus;
    closureDate?: string | null;
    orgUnitType: Types.OrgUnitType;
    cities: Array<{
      __typename?: 'City';
      guid: string;
      id: number;
      name: string;
      countyName?: string | null;
      countryName?: string | null;
      countryISO: string;
      cadastralCode?: string | null;
    }>;
    parentSubject:
      | {
          __typename: 'LegalSubject';
          name: string;
          id: number;
          personType: Types.PersonType;
          companyGroupParent?: {
            __typename?: 'SubjectRelation';
            main:
              | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
          } | null;
          relationSubordinates: Array<{
            __typename?: 'SubjectRelation';
            relationType: Types.SubjectRelationType;
            main:
              | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
          }>;
        }
      | {
          __typename: 'ManagementSubject';
          name: string;
          id: number;
          personType: Types.PersonType;
          companyGroupParent?: {
            __typename?: 'SubjectRelation';
            main:
              | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
          } | null;
          relationSubordinates: Array<{
            __typename?: 'SubjectRelation';
            relationType: Types.SubjectRelationType;
            main:
              | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
          }>;
        }
      | {
          __typename: 'PhysicalSubject';
          name: string;
          id: number;
          personType: Types.PersonType;
          relationSubordinates: Array<{
            __typename?: 'SubjectRelation';
            relationType: Types.SubjectRelationType;
            main:
              | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
              | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
          }>;
        };
    parentOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null; orgUnitType: Types.OrgUnitType } | null;
    contacts: Array<{
      __typename?: 'Contact';
      id: number;
      contactInfo?: string | null;
      contactInfoType: Types.ContactInfoType;
      contactType: Types.ContactType;
    }>;
  }>;
  contacts: Array<{
    __typename?: 'IAMContact';
    id: number;
    contactInfoType: Types.ContactInfoType;
    contactInfo?: string | null;
    contactType: Types.ContactType;
  }>;
};

export type TicketUserFragment = {
  __typename?: 'User';
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
};

export const UserFragmentDoc = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    userName
    status
    managementSubjects {
      id
      name
    }
    type
    officeAccess
    groups {
      id
      name
    }
  }
`;
export const UserDetailFragmentDoc = gql`
  fragment UserDetailFragment on User {
    id
    firstName
    lastName
    userName
    type
    officeAccess
    supplierSubject {
      id
      name
    }
    status
    enabledSince
    ceasedDate
    lockedSince
    suspensionReason
    groups {
      ...GroupDetailFragment
    }
    managementSubjects {
      id
      name
    }
    managementOrgUnits {
      ...OrgUnitFragment
    }
    contacts {
      ...UserContactFragment
    }
  }
`;
export const TicketUserFragmentDoc = gql`
  fragment TicketUserFragment on User {
    id
    firstName
    lastName
    userName
  }
`;

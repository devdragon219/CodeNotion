// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';

export type OrgUnitFragment = {
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
};

export const OrgUnitFragmentDoc = gql`
  fragment OrgUnitFragment on OrgUnit {
    id
    name
    internalCode
    externalCode
    entryStatus
    closureDate
    orgUnitType
    cities {
      ...CityFragment
    }
    parentSubject {
      __typename
      name
      id
      personType
      relationSubordinates {
        relationType
        main {
          name
          id
          personType
        }
      }
      ... on ManagementSubject {
        companyGroupParent {
          main {
            name
            id
            personType
          }
        }
      }
      ... on LegalSubject {
        companyGroupParent {
          main {
            name
            id
            personType
          }
        }
      }
    }
    parentOrgUnit {
      id
      name
      orgUnitType
    }
    contacts {
      ...ContactFragment
    }
  }
`;

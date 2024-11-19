// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { AdministratorFragmentDoc } from './RealGimm.Web.Subject.fragment';

export type AdministrationFragment = {
  __typename?: 'Administration';
  id: number;
  administrationType: Types.AdministrationType;
  since: string;
  until?: string | null;
  isPaymentDataIncluded: boolean;
  estate: { __typename?: 'Estate'; id: number; internalCode: string };
  administratorSubject:
    | {
        __typename?: 'LegalSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'ManagementSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'PhysicalSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
      };
  bankAccount?: {
    __typename?: 'BankAccount';
    id: number;
    referenceCode?: string | null;
    accountHolder?: string | null;
  } | null;
};

export type AdministrationDetailFragment = {
  __typename?: 'Administration';
  administrationType: Types.AdministrationType;
  paymentType: Types.PaymentType;
  since: string;
  until?: string | null;
  notes?: string | null;
  isPaymentDataIncluded: boolean;
  id: number;
  terms: Array<{ __typename?: 'AdministrationTerm'; id: number }>;
  estate: {
    __typename?: 'Estate';
    id: number;
    internalCode: string;
    name?: string | null;
    mainUsageType: {
      __typename?: 'EstateMainUsageType';
      id: number;
      name: string;
      internalCode: string;
      ordering: number;
    };
  };
  administratorSubject:
    | {
        __typename: 'LegalSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
        contacts: Array<{
          __typename?: 'Contact';
          id: number;
          contactInfo?: string | null;
          contactInfoType: Types.ContactInfoType;
          contactType: Types.ContactType;
        }>;
        bankAccounts: Array<{
          __typename?: 'BankAccount';
          bankAccountType: Types.BankAccountType;
          referenceCode?: string | null;
          referenceCodeType: Types.BankAccountCodeType;
          notes?: string | null;
          accountHolder?: string | null;
          id: number;
        }>;
      }
    | {
        __typename: 'ManagementSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
        contacts: Array<{
          __typename?: 'Contact';
          id: number;
          contactInfo?: string | null;
          contactInfoType: Types.ContactInfoType;
          contactType: Types.ContactType;
        }>;
        bankAccounts: Array<{
          __typename?: 'BankAccount';
          bankAccountType: Types.BankAccountType;
          referenceCode?: string | null;
          referenceCodeType: Types.BankAccountCodeType;
          notes?: string | null;
          accountHolder?: string | null;
          id: number;
        }>;
      }
    | {
        __typename: 'PhysicalSubject';
        id: number;
        name: string;
        addresses: Array<{
          __typename?: 'Address';
          id: number;
          addressType: Types.AddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
        }>;
        contacts: Array<{
          __typename?: 'Contact';
          id: number;
          contactInfo?: string | null;
          contactInfoType: Types.ContactInfoType;
          contactType: Types.ContactType;
        }>;
        bankAccounts: Array<{
          __typename?: 'BankAccount';
          bankAccountType: Types.BankAccountType;
          referenceCode?: string | null;
          referenceCodeType: Types.BankAccountCodeType;
          notes?: string | null;
          accountHolder?: string | null;
          id: number;
        }>;
      };
  bankAccount?: {
    __typename?: 'BankAccount';
    bankAccountType: Types.BankAccountType;
    referenceCode?: string | null;
    referenceCodeType: Types.BankAccountCodeType;
    notes?: string | null;
    accountHolder?: string | null;
    id: number;
  } | null;
};

export const AdministrationFragmentDoc = gql`
  fragment AdministrationFragment on Administration {
    id
    estate {
      id
      internalCode
    }
    administrationType
    administratorSubject {
      id
      name
    }
    since
    until
    isPaymentDataIncluded
    bankAccount {
      id
      referenceCode
      accountHolder
    }
    administratorSubject {
      id
      addresses {
        ...AddressFragment
      }
    }
  }
`;
export const AdministrationDetailFragmentDoc = gql`
  fragment AdministrationDetailFragment on Administration {
    administrationType
    paymentType
    since
    until
    notes
    isPaymentDataIncluded
    id
    terms {
      id
    }
    estate {
      id
      internalCode
      name
      mainUsageType {
        ...MainUsageTypeFragment
      }
    }
    administratorSubject {
      ...AdministratorFragment
    }
    bankAccount {
      ...BankAccountFragment
    }
  }
`;

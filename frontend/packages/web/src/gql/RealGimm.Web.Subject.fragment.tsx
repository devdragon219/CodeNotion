// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { SubjectCategoryFragmentDoc } from './RealGimm.Web.SubjectCategory';
import { SubjectRelationFragmentDoc } from './RealGimm.Web.SubjectRelation.fragment';

export type SubjectFragment_LegalSubject = {
  __typename: 'LegalSubject';
  legalSubjectType: Types.LegalSubjectType;
  baseCountryTaxIdCode?: string | null;
  additionalTaxIdCode?: string | null;
  interGroupSignature?: string | null;
  id: number;
  internalCode: string;
  name: string;
  entryStatus: Types.EntryStatus;
  externalSourceCode?: string | null;
  companyGroupParent?: {
    __typename?: 'SubjectRelation';
    id: number;
    groupRelationType?: Types.CompanyGroup | null;
    main:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  } | null;
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
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    main:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    until?: string | null;
    id: number;
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
  officers: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    since?: string | null;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
};

export type SubjectFragment_ManagementSubject = {
  __typename: 'ManagementSubject';
  baseCountryTaxIdCode?: string | null;
  additionalTaxIdCode?: string | null;
  id: number;
  internalCode: string;
  name: string;
  entryStatus: Types.EntryStatus;
  externalSourceCode?: string | null;
  companyGroupParent?: {
    __typename?: 'SubjectRelation';
    id: number;
    groupRelationType?: Types.CompanyGroup | null;
    main:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  } | null;
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
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    main:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    until?: string | null;
    id: number;
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
  officers: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    since?: string | null;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
};

export type SubjectFragment_PhysicalSubject = {
  __typename: 'PhysicalSubject';
  professionalTaxIdCode?: string | null;
  birthCountryTaxIdCode?: string | null;
  id: number;
  internalCode: string;
  name: string;
  entryStatus: Types.EntryStatus;
  externalSourceCode?: string | null;
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
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    main:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    until?: string | null;
    id: number;
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
  officers: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    id: number;
    since?: string | null;
    subordinate:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  }>;
};

export type SubjectFragment =
  | SubjectFragment_LegalSubject
  | SubjectFragment_ManagementSubject
  | SubjectFragment_PhysicalSubject;

export type SubjectDetailFragment_LegalSubject = {
  __typename: 'LegalSubject';
  fullName: string;
  shorthandDescription?: string | null;
  baseCountryTaxIdCode?: string | null;
  additionalTaxIdCode?: string | null;
  additionalGovIdCode?: string | null;
  bankingId1?: string | null;
  bankingId2?: string | null;
  businessStart?: string | null;
  companiesHouseIdCode?: string | null;
  shareCapital?: number | null;
  interGroupSignature?: string | null;
  legalSubjectType: Types.LegalSubjectType;
  name: string;
  id: number;
  personType: Types.PersonType;
  internalCode: string;
  externalSourceCode?: string | null;
  entryStatus: Types.EntryStatus;
  closureDate?: string | null;
  companyGroupParent?: {
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  } | null;
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
  bankAccounts: Array<{
    __typename?: 'BankAccount';
    bankAccountType: Types.BankAccountType;
    referenceCode?: string | null;
    referenceCodeType: Types.BankAccountCodeType;
    notes?: string | null;
    accountHolder?: string | null;
    id: number;
  }>;
  contacts: Array<{
    __typename?: 'Contact';
    id: number;
    contactInfo?: string | null;
    contactInfoType: Types.ContactInfoType;
    contactType: Types.ContactType;
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    name: string;
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  officers: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    since?: string | null;
    until?: string | null;
    id: number;
  }>;
};

export type SubjectDetailFragment_ManagementSubject = {
  __typename: 'ManagementSubject';
  fullName: string;
  shorthandDescription?: string | null;
  baseCountryTaxIdCode?: string | null;
  additionalTaxIdCode?: string | null;
  additionalGovIdCode?: string | null;
  bankingId1?: string | null;
  bankingId2?: string | null;
  businessStart?: string | null;
  managementCode?: string | null;
  companiesHouseIdCode?: string | null;
  shareCapital?: number | null;
  interGroupSignature?: string | null;
  name: string;
  id: number;
  personType: Types.PersonType;
  internalCode: string;
  externalSourceCode?: string | null;
  entryStatus: Types.EntryStatus;
  closureDate?: string | null;
  companyGroupParent?: {
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  } | null;
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
  bankAccounts: Array<{
    __typename?: 'BankAccount';
    bankAccountType: Types.BankAccountType;
    referenceCode?: string | null;
    referenceCodeType: Types.BankAccountCodeType;
    notes?: string | null;
    accountHolder?: string | null;
    id: number;
  }>;
  contacts: Array<{
    __typename?: 'Contact';
    id: number;
    contactInfo?: string | null;
    contactInfoType: Types.ContactInfoType;
    contactType: Types.ContactType;
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    name: string;
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  officers: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    since?: string | null;
    until?: string | null;
    id: number;
  }>;
};

export type SubjectDetailFragment_PhysicalSubject = {
  __typename: 'PhysicalSubject';
  firstName?: string | null;
  lastName?: string | null;
  birthCountryTaxIdCode?: string | null;
  professionalTaxIdCode?: string | null;
  birthDate?: string | null;
  birthSex?: Types.BirthSex | null;
  name: string;
  id: number;
  personType: Types.PersonType;
  internalCode: string;
  externalSourceCode?: string | null;
  entryStatus: Types.EntryStatus;
  closureDate?: string | null;
  birthLocation?: {
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
  } | null;
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
  bankAccounts: Array<{
    __typename?: 'BankAccount';
    bankAccountType: Types.BankAccountType;
    referenceCode?: string | null;
    referenceCodeType: Types.BankAccountCodeType;
    notes?: string | null;
    accountHolder?: string | null;
    id: number;
  }>;
  contacts: Array<{
    __typename?: 'Contact';
    id: number;
    contactInfo?: string | null;
    contactInfoType: Types.ContactInfoType;
    contactType: Types.ContactType;
  }>;
  categories: Array<{
    __typename?: 'SubjectCategory';
    name: string;
    id: number;
    function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
  }>;
  heirs: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  officers: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  owningMgmtSubjects: Array<{
    __typename?: 'SubjectRelation';
    since?: string | null;
    until?: string | null;
    groupRelationType?: Types.CompanyGroup | null;
    officerRelationType?: Types.OfficerType | null;
    relationType: Types.SubjectRelationType;
    id: number;
    main:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
    subordinate:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  }>;
  taxStatuses: Array<{
    __typename?: 'TaxStatus';
    taxStatusType: Types.TaxStatusType;
    since?: string | null;
    until?: string | null;
    id: number;
  }>;
};

export type SubjectDetailFragment =
  | SubjectDetailFragment_LegalSubject
  | SubjectDetailFragment_ManagementSubject
  | SubjectDetailFragment_PhysicalSubject;

export type AdministratorFragment_LegalSubject = {
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
};

export type AdministratorFragment_ManagementSubject = {
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
};

export type AdministratorFragment_PhysicalSubject = {
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

export type AdministratorFragment =
  | AdministratorFragment_LegalSubject
  | AdministratorFragment_ManagementSubject
  | AdministratorFragment_PhysicalSubject;

export type RegistryCommunicationManagementSubjectFragment_LegalSubject = {
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
};

export type RegistryCommunicationManagementSubjectFragment_ManagementSubject = {
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
};

export type RegistryCommunicationManagementSubjectFragment_PhysicalSubject = {
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

export type RegistryCommunicationManagementSubjectFragment =
  | RegistryCommunicationManagementSubjectFragment_LegalSubject
  | RegistryCommunicationManagementSubjectFragment_ManagementSubject
  | RegistryCommunicationManagementSubjectFragment_PhysicalSubject;

export const SubjectFragmentDoc = gql`
  fragment SubjectFragment on ISubject {
    id
    internalCode
    name
    __typename
    ... on LegalSubject {
      legalSubjectType
      baseCountryTaxIdCode
      additionalTaxIdCode
      interGroupSignature
      companyGroupParent {
        id
        groupRelationType
        main {
          id
          name
        }
      }
    }
    entryStatus
    ... on ManagementSubject {
      baseCountryTaxIdCode
      additionalTaxIdCode
      companyGroupParent {
        id
        groupRelationType
        main {
          id
          name
        }
      }
    }
    ... on PhysicalSubject {
      professionalTaxIdCode
      birthCountryTaxIdCode
    }
    addresses {
      ...AddressFragment
    }
    owningMgmtSubjects {
      id
      main {
        id
        name
      }
    }
    categories {
      id
      function {
        isCompanyGroup
      }
    }
    externalSourceCode
    taxStatuses {
      taxStatusType
      until
      id
    }
    contacts {
      ...ContactFragment
    }
    bankAccounts {
      ...BankAccountFragment
    }
    officers {
      id
      subordinate {
        id
        name
      }
    }
    heirs {
      id
      since
      subordinate {
        id
        name
      }
    }
  }
`;
export const SubjectDetailFragmentDoc = gql`
  fragment SubjectDetailFragment on ISubject {
    __typename
    name
    id
    personType
    internalCode
    externalSourceCode
    entryStatus
    closureDate
    addresses {
      ...AddressFragment
    }
    bankAccounts {
      ...BankAccountFragment
    }
    contacts {
      ...ContactFragment
    }
    categories {
      ...SubjectCategoryFragment
    }
    heirs {
      ...SubjectRelationFragment
    }
    officers {
      ...SubjectRelationFragment
    }
    owningMgmtSubjects {
      ...SubjectRelationFragment
    }
    taxStatuses {
      taxStatusType
      since
      until
      id
    }
    ... on LegalSubject {
      fullName
      shorthandDescription
      baseCountryTaxIdCode
      additionalTaxIdCode
      additionalGovIdCode
      bankingId1
      bankingId2
      businessStart
      companiesHouseIdCode
      shareCapital
      interGroupSignature
      legalSubjectType
      companyGroupParent {
        ...SubjectRelationFragment
      }
    }
    ... on ManagementSubject {
      fullName
      shorthandDescription
      baseCountryTaxIdCode
      additionalTaxIdCode
      additionalGovIdCode
      bankingId1
      bankingId2
      businessStart
      managementCode
      companiesHouseIdCode
      shareCapital
      interGroupSignature
      companyGroupParent {
        ...SubjectRelationFragment
      }
    }
    ... on PhysicalSubject {
      firstName
      lastName
      birthCountryTaxIdCode
      professionalTaxIdCode
      birthDate
      birthLocation {
        ...AddressFragment
      }
      birthSex
    }
  }
`;
export const AdministratorFragmentDoc = gql`
  fragment AdministratorFragment on ISubject {
    __typename
    id
    name
    addresses {
      ...AddressFragment
    }
    contacts {
      ...ContactFragment
    }
    bankAccounts {
      ...BankAccountFragment
    }
  }
`;
export const RegistryCommunicationManagementSubjectFragmentDoc = gql`
  fragment RegistryCommunicationManagementSubjectFragment on ISubject {
    id
    name
    bankAccounts {
      id
      referenceCode
    }
    officers {
      id
      subordinate {
        id
        name
      }
    }
  }
`;

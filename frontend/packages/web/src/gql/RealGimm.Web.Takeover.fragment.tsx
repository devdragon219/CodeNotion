// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { SubjectDetailFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { SubjectCategoryFragmentDoc } from './RealGimm.Web.SubjectCategory';
import { SubjectRelationFragmentDoc } from './RealGimm.Web.SubjectRelation.fragment';

export type TakeoverFragment = {
  __typename?: 'Takeover';
  originalSubjectId: number;
  newSubjectId: number;
  legalRepresentativeSubjectId?: number | null;
  takeoverDate: string;
  effectiveDate: string;
  type: Types.TakeoverType;
  id: number;
  originalSubject:
    | {
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
      }
    | {
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
      }
    | {
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
  newSubject:
    | {
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
      }
    | {
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
      }
    | {
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
  legalRepresentativeSubject?:
    | {
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
      }
    | {
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
      }
    | {
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
      }
    | null;
};

export const TakeoverFragmentDoc = gql`
  fragment TakeoverFragment on Takeover {
    originalSubjectId
    newSubjectId
    legalRepresentativeSubjectId
    takeoverDate
    effectiveDate
    type
    id
    originalSubject {
      ...SubjectDetailFragment
    }
    newSubject {
      ...SubjectDetailFragment
    }
    legalRepresentativeSubject {
      ...SubjectDetailFragment
    }
  }
`;

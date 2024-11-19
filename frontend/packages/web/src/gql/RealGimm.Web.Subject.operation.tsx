// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { SubjectDetailFragmentDoc, SubjectFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { SubjectCategoryFragmentDoc } from './RealGimm.Web.SubjectCategory';
import { SubjectRelationFragmentDoc } from './RealGimm.Web.SubjectRelation.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetSubjectsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.SubjectFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectSortInput> | Types.SubjectSortInput>;
}>;

export type GetSubjectsQuery = {
  __typename?: 'Query';
  subject: {
    __typename?: 'SubjectQueries';
    listSubjects?: {
      __typename?: 'ListSubjectsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<
        | {
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
          }
        | {
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
          }
        | {
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
          }
      > | null;
    } | null;
  };
};

export type GetSubjectInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetSubjectInternalCodeQuery = {
  __typename?: 'Query';
  subject: { __typename?: 'SubjectQueries'; proposeNewInternalCode?: string | null };
};

export type CreateLegalSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.LegalSubjectInput;
}>;

export type CreateLegalSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    addLegalSubject: {
      __typename?: 'ResultOfLegalSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'LegalSubject'; id: number } | null;
    };
  };
};

export type CreateManagementSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.ManagementSubjectInput;
}>;

export type CreateManagementSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    addManagementSubject: {
      __typename?: 'ResultOfManagementSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'ManagementSubject'; id: number } | null;
    };
  };
};

export type CreatePhysicalSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.PhysicalSubjectInput;
}>;

export type CreatePhysicalSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    addPhysicalSubject: {
      __typename?: 'ResultOfPhysicalSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'PhysicalSubject'; id: number } | null;
    };
  };
};

export type DeleteSubjectMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    delete: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type DeleteSubjectsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteSubjectsMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    deleteByIds: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type ExportSubjectsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SubjectFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectSortInput> | Types.SubjectSortInput>;
}>;

export type ExportSubjectsQuery = {
  __typename?: 'Query';
  subject: {
    __typename?: 'SubjectQueries';
    exportSubjectsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetSubjectQueryVariables = Types.Exact<{
  subjectId: Types.Scalars['Int']['input'];
}>;

export type GetSubjectQuery = {
  __typename?: 'Query';
  subject: {
    __typename?: 'SubjectQueries';
    subject?:
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
};

export type CanUseSubjectInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentSubjectId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseSubjectInternalCodeQuery = {
  __typename?: 'Query';
  subject: { __typename?: 'SubjectQueries'; canUseInternalCode: boolean };
};

export type CanUseInterGroupSignatureQueryVariables = Types.Exact<{
  signature: Types.Scalars['String']['input'];
  companyGroupId: Types.Scalars['Int']['input'];
  currentSubjectId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseInterGroupSignatureQuery = {
  __typename?: 'Query';
  subject: { __typename?: 'SubjectQueries'; canUseInterGroupSignature: boolean };
};

export type CheckItalianTaxIdQueryVariables = Types.Exact<{
  firstName: Types.Scalars['String']['input'];
  lastName: Types.Scalars['String']['input'];
  gender: Types.Scalars['String']['input'];
  birthDate: Types.Scalars['Date']['input'];
  cityIstatCode: Types.Scalars['String']['input'];
  taxId: Types.Scalars['String']['input'];
}>;

export type CheckItalianTaxIdQuery = {
  __typename?: 'Query';
  subject: { __typename?: 'SubjectQueries'; checkItalianTaxID: boolean };
};

export type CanBeGroupLeaderQueryVariables = Types.Exact<{
  managementSubjectId: Types.Scalars['Int']['input'];
  subjectId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanBeGroupLeaderQuery = {
  __typename?: 'Query';
  subject: { __typename?: 'SubjectQueries'; canBeGroupLeader: boolean };
};

export type UpdateLegalSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.LegalSubjectInput;
}>;

export type UpdateLegalSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    updateLegalSubject: {
      __typename?: 'ResultOfLegalSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type UpdateManagementSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.ManagementSubjectInput;
}>;

export type UpdateManagementSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    updateManagementSubject: {
      __typename?: 'ResultOfManagementSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type UpdatePhysicalSubjectMutationVariables = Types.Exact<{
  subjectInput: Types.PhysicalSubjectInput;
}>;

export type UpdatePhysicalSubjectMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    updatePhysicalSubject: {
      __typename?: 'ResultOfPhysicalSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type AddSubjectDocumentsMutationVariables = Types.Exact<{
  subjectId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddSubjectDocumentsMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    document: {
      __typename?: 'SubjectDocumentMutations';
      addRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type DeleteSubjectDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteSubjectDocumentsMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    document: {
      __typename?: 'SubjectDocumentMutations';
      deleteRange: {
        __typename?: 'ResultOfDocument__';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type UpdateSubjectDocumentMutationVariables = Types.Exact<{
  subjectId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateSubjectDocumentMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    document: {
      __typename?: 'SubjectDocumentMutations';
      update: {
        __typename?: 'ResultOfDocument';
        errors?: Array<string | null> | null;
        isSuccess: boolean;
        validationErrors?: Array<{
          __typename?: 'ValidationError';
          identifier?: string | null;
          errorMessage?: string | null;
          errorCode?: string | null;
          severity: Types.ValidationSeverity;
        } | null> | null;
      };
    };
  };
};

export type GetAllSubjectsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SubjectFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectSortInput> | Types.SubjectSortInput>;
}>;

export type GetAllSubjectsQuery = {
  __typename?: 'Query';
  subject: {
    __typename?: 'SubjectQueries';
    listSubjectsFull: Array<
      | {
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
        }
      | {
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
        }
      | {
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
        }
    >;
  };
};

export type AddHeirsMutationVariables = Types.Exact<{
  subjectId: Types.Scalars['Int']['input'];
  heirs: Array<Types.HeirInput> | Types.HeirInput;
}>;

export type AddHeirsMutation = {
  __typename?: 'Mutation';
  subject: {
    __typename?: 'SubjectMutations';
    addHeirs: {
      __typename?: 'ResultOfPhysicalSubject';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type GetSubjectDocumentsQueryVariables = Types.Exact<{
  subjectId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<Array<Types.DocumentSortInput> | Types.DocumentSortInput>;
}>;

export type GetSubjectDocumentsQuery = {
  __typename?: 'Query';
  subject: {
    __typename?: 'SubjectQueries';
    subject?:
      | {
          __typename?: 'LegalSubject';
          documents: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }
      | {
          __typename?: 'ManagementSubject';
          documents: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }
      | {
          __typename?: 'PhysicalSubject';
          documents: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }
      | null;
  };
};

export const GetSubjectsDocument = gql`
  query getSubjects(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: SubjectFilterInput
    $order: [SubjectSortInput!]
  ) {
    subject {
      listSubjects(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...SubjectFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${SubjectFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${BankAccountFragmentDoc}
`;

export function useGetSubjectsQuery(options?: Omit<Urql.UseQueryArgs<GetSubjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>({ query: GetSubjectsDocument, ...options });
}
export const GetSubjectInternalCodeDocument = gql`
  query getSubjectInternalCode {
    subject {
      proposeNewInternalCode
    }
  }
`;

export function useGetSubjectInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetSubjectInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetSubjectInternalCodeQuery, GetSubjectInternalCodeQueryVariables>({
    query: GetSubjectInternalCodeDocument,
    ...options,
  });
}
export const CreateLegalSubjectDocument = gql`
  mutation createLegalSubject($subjectInput: LegalSubjectInput!) {
    subject {
      addLegalSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreateLegalSubjectMutation() {
  return Urql.useMutation<CreateLegalSubjectMutation, CreateLegalSubjectMutationVariables>(CreateLegalSubjectDocument);
}
export const CreateManagementSubjectDocument = gql`
  mutation createManagementSubject($subjectInput: ManagementSubjectInput!) {
    subject {
      addManagementSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreateManagementSubjectMutation() {
  return Urql.useMutation<CreateManagementSubjectMutation, CreateManagementSubjectMutationVariables>(
    CreateManagementSubjectDocument,
  );
}
export const CreatePhysicalSubjectDocument = gql`
  mutation createPhysicalSubject($subjectInput: PhysicalSubjectInput!) {
    subject {
      addPhysicalSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreatePhysicalSubjectMutation() {
  return Urql.useMutation<CreatePhysicalSubjectMutation, CreatePhysicalSubjectMutationVariables>(
    CreatePhysicalSubjectDocument,
  );
}
export const DeleteSubjectDocument = gql`
  mutation deleteSubject($id: Int!) {
    subject {
      delete(subjectId: $id) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteSubjectMutation() {
  return Urql.useMutation<DeleteSubjectMutation, DeleteSubjectMutationVariables>(DeleteSubjectDocument);
}
export const DeleteSubjectsDocument = gql`
  mutation deleteSubjects($ids: [Int!]!) {
    subject {
      deleteByIds(subjectIds: $ids) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteSubjectsMutation() {
  return Urql.useMutation<DeleteSubjectsMutation, DeleteSubjectsMutationVariables>(DeleteSubjectsDocument);
}
export const ExportSubjectsDocument = gql`
  query exportSubjects($where: SubjectFilterInput, $order: [SubjectSortInput!]) {
    subject {
      exportSubjectsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportSubjectsQuery(options?: Omit<Urql.UseQueryArgs<ExportSubjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportSubjectsQuery, ExportSubjectsQueryVariables>({
    query: ExportSubjectsDocument,
    ...options,
  });
}
export const GetSubjectDocument = gql`
  query getSubject($subjectId: Int!) {
    subject {
      subject(subjectId: $subjectId) {
        ...SubjectDetailFragment
      }
    }
  }
  ${SubjectDetailFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${BankAccountFragmentDoc}
  ${ContactFragmentDoc}
  ${SubjectCategoryFragmentDoc}
  ${SubjectRelationFragmentDoc}
`;

export function useGetSubjectQuery(options: Omit<Urql.UseQueryArgs<GetSubjectQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubjectQuery, GetSubjectQueryVariables>({ query: GetSubjectDocument, ...options });
}
export const CanUseSubjectInternalCodeDocument = gql`
  query canUseSubjectInternalCode($internalCode: String!, $currentSubjectId: Int) {
    subject {
      canUseInternalCode(internalCode: $internalCode, currentSubjectId: $currentSubjectId)
    }
  }
`;

export function useCanUseSubjectInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseSubjectInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseSubjectInternalCodeQuery, CanUseSubjectInternalCodeQueryVariables>({
    query: CanUseSubjectInternalCodeDocument,
    ...options,
  });
}
export const CanUseInterGroupSignatureDocument = gql`
  query canUseInterGroupSignature($signature: String!, $companyGroupId: Int!, $currentSubjectId: Int) {
    subject {
      canUseInterGroupSignature(
        signature: $signature
        companyGroupId: $companyGroupId
        currentSubjectId: $currentSubjectId
      )
    }
  }
`;

export function useCanUseInterGroupSignatureQuery(
  options: Omit<Urql.UseQueryArgs<CanUseInterGroupSignatureQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseInterGroupSignatureQuery, CanUseInterGroupSignatureQueryVariables>({
    query: CanUseInterGroupSignatureDocument,
    ...options,
  });
}
export const CheckItalianTaxIdDocument = gql`
  query checkItalianTaxID(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $birthDate: Date!
    $cityIstatCode: String!
    $taxId: String!
  ) {
    subject {
      checkItalianTaxID(
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        birthDate: $birthDate
        cityIstatCode: $cityIstatCode
        taxId: $taxId
      )
    }
  }
`;

export function useCheckItalianTaxIdQuery(options: Omit<Urql.UseQueryArgs<CheckItalianTaxIdQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckItalianTaxIdQuery, CheckItalianTaxIdQueryVariables>({
    query: CheckItalianTaxIdDocument,
    ...options,
  });
}
export const CanBeGroupLeaderDocument = gql`
  query canBeGroupLeader($managementSubjectId: Int!, $subjectId: Int) {
    subject {
      canBeGroupLeader(managementSubjectId: $managementSubjectId, subjectId: $subjectId)
    }
  }
`;

export function useCanBeGroupLeaderQuery(options: Omit<Urql.UseQueryArgs<CanBeGroupLeaderQueryVariables>, 'query'>) {
  return Urql.useQuery<CanBeGroupLeaderQuery, CanBeGroupLeaderQueryVariables>({
    query: CanBeGroupLeaderDocument,
    ...options,
  });
}
export const UpdateLegalSubjectDocument = gql`
  mutation updateLegalSubject($subjectInput: LegalSubjectInput!) {
    subject {
      updateLegalSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateLegalSubjectMutation() {
  return Urql.useMutation<UpdateLegalSubjectMutation, UpdateLegalSubjectMutationVariables>(UpdateLegalSubjectDocument);
}
export const UpdateManagementSubjectDocument = gql`
  mutation updateManagementSubject($subjectInput: ManagementSubjectInput!) {
    subject {
      updateManagementSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateManagementSubjectMutation() {
  return Urql.useMutation<UpdateManagementSubjectMutation, UpdateManagementSubjectMutationVariables>(
    UpdateManagementSubjectDocument,
  );
}
export const UpdatePhysicalSubjectDocument = gql`
  mutation updatePhysicalSubject($subjectInput: PhysicalSubjectInput!) {
    subject {
      updatePhysicalSubject(input: $subjectInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdatePhysicalSubjectMutation() {
  return Urql.useMutation<UpdatePhysicalSubjectMutation, UpdatePhysicalSubjectMutationVariables>(
    UpdatePhysicalSubjectDocument,
  );
}
export const AddSubjectDocumentsDocument = gql`
  mutation addSubjectDocuments($subjectId: Int!, $inputs: [DocumentInput!]!) {
    subject {
      document {
        addRange(subjectId: $subjectId, inputs: $inputs) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddSubjectDocumentsMutation() {
  return Urql.useMutation<AddSubjectDocumentsMutation, AddSubjectDocumentsMutationVariables>(
    AddSubjectDocumentsDocument,
  );
}
export const DeleteSubjectDocumentsDocument = gql`
  mutation deleteSubjectDocuments($entityId: Int!, $cmisIds: [String!]!) {
    subject {
      document {
        deleteRange(subjectId: $entityId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteSubjectDocumentsMutation() {
  return Urql.useMutation<DeleteSubjectDocumentsMutation, DeleteSubjectDocumentsMutationVariables>(
    DeleteSubjectDocumentsDocument,
  );
}
export const UpdateSubjectDocumentDocument = gql`
  mutation updateSubjectDocument($subjectId: Int!, $input: DocumentInput!) {
    subject {
      document {
        update(subjectId: $subjectId, input: $input) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateSubjectDocumentMutation() {
  return Urql.useMutation<UpdateSubjectDocumentMutation, UpdateSubjectDocumentMutationVariables>(
    UpdateSubjectDocumentDocument,
  );
}
export const GetAllSubjectsDocument = gql`
  query getAllSubjects($where: SubjectFilterInput, $order: [SubjectSortInput!]) {
    subject {
      listSubjectsFull(where: $where, order: $order) {
        ...SubjectFragment
      }
    }
  }
  ${SubjectFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${BankAccountFragmentDoc}
`;

export function useGetAllSubjectsQuery(options?: Omit<Urql.UseQueryArgs<GetAllSubjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllSubjectsQuery, GetAllSubjectsQueryVariables>({
    query: GetAllSubjectsDocument,
    ...options,
  });
}
export const AddHeirsDocument = gql`
  mutation addHeirs($subjectId: Int!, $heirs: [HeirInput!]!) {
    subject {
      addHeirs(subjectId: $subjectId, heirs: $heirs) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddHeirsMutation() {
  return Urql.useMutation<AddHeirsMutation, AddHeirsMutationVariables>(AddHeirsDocument);
}
export const GetSubjectDocumentsDocument = gql`
  query getSubjectDocuments($subjectId: Int!, $where: DocumentFilterInput, $order: [DocumentSortInput!]) {
    subject {
      subject(subjectId: $subjectId) {
        ... on LegalSubject {
          documents(where: $where, order: $order) {
            ...DocumentFragment
          }
        }
        ... on ManagementSubject {
          documents(where: $where, order: $order) {
            ...DocumentFragment
          }
        }
        ... on PhysicalSubject {
          documents(where: $where, order: $order) {
            ...DocumentFragment
          }
        }
      }
    }
  }
  ${DocumentFragmentDoc}
`;

export function useGetSubjectDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetSubjectDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetSubjectDocumentsQuery, GetSubjectDocumentsQueryVariables>({
    query: GetSubjectDocumentsDocument,
    ...options,
  });
}

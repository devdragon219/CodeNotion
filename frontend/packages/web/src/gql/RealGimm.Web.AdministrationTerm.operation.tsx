// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { AdministrationDetailFragmentDoc } from './RealGimm.Web.Administration.fragment';
import {
  AdministrationTermDetailFragmentDoc,
  AdministrationTermFragmentDoc,
} from './RealGimm.Web.AdministrationTerm.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { BillItemTypeFragmentDoc } from './RealGimm.Web.BillItemType.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { AdministratorFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { TermGroupedInstallmentPaymentFragmentDoc } from './RealGimm.Web.TermGroupedInstallmentPayment.fragment';
import { TermInstallmentFragmentDoc } from './RealGimm.Web.TermInstallment.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type GetAdministrationTermsQueryVariables = Types.Exact<{
  administrationId: Types.Scalars['Int']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AdministrationTermFilterInput>;
  order?: Types.InputMaybe<Array<Types.AdministrationTermSortInput> | Types.AdministrationTermSortInput>;
}>;

export type GetAdministrationTermsQuery = {
  __typename?: 'Query';
  administration: {
    __typename?: 'AdministrationQueries';
    listAdministrationTerms?: {
      __typename?: 'ListAdministrationTermsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AdministrationTerm';
        id: number;
        termType: Types.TermType;
        name: string;
        expectedAmount: number;
        since: string;
        until: string;
        installments: Array<{
          __typename?: 'TermInstallment';
          id: number;
          installmentNumber: number;
          dueDate: string;
          amount: number;
          since: string;
          until: string;
          notes?: string | null;
          billItemType: {
            __typename?: 'BillItemType';
            id: number;
            internalCode: string;
            description: string;
            isPositive: boolean;
            isForContractFee: boolean;
            isForContractCosts: boolean;
            isForAdministration: boolean;
            isForTax: boolean;
            defaultAccountingItem?: {
              __typename?: 'AccountingItem';
              id: number;
              description: string;
              internalCode: string;
              externalCode: string;
            } | null;
            activeSubjectVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            activeExemptVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            activeNonTaxableVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            passiveSubjectVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            passiveExemptVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            passiveNonTaxableVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
            administrationVR: {
              __typename?: 'VATRate';
              id: number;
              internalCode: string;
              description: string;
              type: Types.VatRateType;
              ratePercent: number;
            };
          };
        }>;
      }> | null;
    } | null;
  };
};

export type GetAdministrationTermQueryVariables = Types.Exact<{
  administrationTermId: Types.Scalars['Int']['input'];
}>;

export type GetAdministrationTermQuery = {
  __typename?: 'Query';
  administrationTerm: {
    __typename?: 'AdministrationTermQueries';
    get?: {
      __typename?: 'AdministrationTerm';
      id: number;
      name: string;
      expectedAmount: number;
      since: string;
      until: string;
      termType: Types.TermType;
      administration: {
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
      installments: Array<{
        __typename?: 'TermInstallment';
        id: number;
        installmentNumber: number;
        dueDate: string;
        amount: number;
        since: string;
        until: string;
        notes?: string | null;
        billItemType: {
          __typename?: 'BillItemType';
          id: number;
          internalCode: string;
          description: string;
          isPositive: boolean;
          isForContractFee: boolean;
          isForContractCosts: boolean;
          isForAdministration: boolean;
          isForTax: boolean;
          defaultAccountingItem?: {
            __typename?: 'AccountingItem';
            id: number;
            description: string;
            internalCode: string;
            externalCode: string;
          } | null;
          activeSubjectVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          activeExemptVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          activeNonTaxableVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          passiveSubjectVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          passiveExemptVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          passiveNonTaxableVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
          administrationVR: {
            __typename?: 'VATRate';
            id: number;
            internalCode: string;
            description: string;
            type: Types.VatRateType;
            ratePercent: number;
          };
        };
      }>;
      payments: Array<{
        __typename?: 'TermGroupedInstallmentPayment';
        billId: number;
        billDate: string;
        billInternalCode: string;
        billIsTemporary: boolean;
        termInstallments: Array<{
          __typename?: 'TermInstallment';
          id: number;
          amount: number;
          installmentNumber: number;
          billItemType: {
            __typename?: 'BillItemType';
            description: string;
            administrationVR: { __typename?: 'VATRate'; ratePercent: number };
          };
        }>;
      }>;
    } | null;
  };
};

export type CreateAdministrationTermMutationVariables = Types.Exact<{
  administrationId: Types.Scalars['Int']['input'];
  input: Types.AdministrationTermInput;
}>;

export type CreateAdministrationTermMutation = {
  __typename?: 'Mutation';
  administrationTerm: {
    __typename?: 'AdministrationTermMutations';
    add: {
      __typename?: 'ResultOfAdministrationTerm';
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

export type UpdateAdministrationTermMutationVariables = Types.Exact<{
  administrationTermId: Types.Scalars['Int']['input'];
  input: Types.AdministrationTermInput;
}>;

export type UpdateAdministrationTermMutation = {
  __typename?: 'Mutation';
  administrationTerm: {
    __typename?: 'AdministrationTermMutations';
    update: {
      __typename?: 'ResultOfAdministrationTerm';
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

export type DeleteAdministrationTermMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteAdministrationTermMutation = {
  __typename?: 'Mutation';
  administrationTerm: {
    __typename?: 'AdministrationTermMutations';
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

export type DeleteAdministrationTermsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteAdministrationTermsMutation = {
  __typename?: 'Mutation';
  administrationTerm: {
    __typename?: 'AdministrationTermMutations';
    deleteRange: {
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

export const GetAdministrationTermsDocument = gql`
  query getAdministrationTerms(
    $administrationId: Int!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AdministrationTermFilterInput
    $order: [AdministrationTermSortInput!]
  ) {
    administration {
      listAdministrationTerms(
        administrationId: $administrationId
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...AdministrationTermFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AdministrationTermFragmentDoc}
  ${TermInstallmentFragmentDoc}
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
`;

export function useGetAdministrationTermsQuery(
  options: Omit<Urql.UseQueryArgs<GetAdministrationTermsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAdministrationTermsQuery, GetAdministrationTermsQueryVariables>({
    query: GetAdministrationTermsDocument,
    ...options,
  });
}
export const GetAdministrationTermDocument = gql`
  query getAdministrationTerm($administrationTermId: Int!) {
    administrationTerm {
      get(id: $administrationTermId) {
        ...AdministrationTermDetailFragment
      }
    }
  }
  ${AdministrationTermDetailFragmentDoc}
  ${AdministrationDetailFragmentDoc}
  ${MainUsageTypeFragmentDoc}
  ${AdministratorFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${BankAccountFragmentDoc}
  ${TermInstallmentFragmentDoc}
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
  ${TermGroupedInstallmentPaymentFragmentDoc}
`;

export function useGetAdministrationTermQuery(
  options: Omit<Urql.UseQueryArgs<GetAdministrationTermQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAdministrationTermQuery, GetAdministrationTermQueryVariables>({
    query: GetAdministrationTermDocument,
    ...options,
  });
}
export const CreateAdministrationTermDocument = gql`
  mutation createAdministrationTerm($administrationId: Int!, $input: AdministrationTermInput!) {
    administrationTerm {
      add(administrationId: $administrationId, input: $input) {
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

export function useCreateAdministrationTermMutation() {
  return Urql.useMutation<CreateAdministrationTermMutation, CreateAdministrationTermMutationVariables>(
    CreateAdministrationTermDocument,
  );
}
export const UpdateAdministrationTermDocument = gql`
  mutation updateAdministrationTerm($administrationTermId: Int!, $input: AdministrationTermInput!) {
    administrationTerm {
      update(id: $administrationTermId, input: $input) {
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

export function useUpdateAdministrationTermMutation() {
  return Urql.useMutation<UpdateAdministrationTermMutation, UpdateAdministrationTermMutationVariables>(
    UpdateAdministrationTermDocument,
  );
}
export const DeleteAdministrationTermDocument = gql`
  mutation deleteAdministrationTerm($id: Int!) {
    administrationTerm {
      delete(id: $id) {
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

export function useDeleteAdministrationTermMutation() {
  return Urql.useMutation<DeleteAdministrationTermMutation, DeleteAdministrationTermMutationVariables>(
    DeleteAdministrationTermDocument,
  );
}
export const DeleteAdministrationTermsDocument = gql`
  mutation deleteAdministrationTerms($ids: [Int!]!) {
    administrationTerm {
      deleteRange(ids: $ids) {
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

export function useDeleteAdministrationTermsMutation() {
  return Urql.useMutation<DeleteAdministrationTermsMutation, DeleteAdministrationTermsMutationVariables>(
    DeleteAdministrationTermsDocument,
  );
}

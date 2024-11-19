// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { AdministrationDetailFragmentDoc, AdministrationFragmentDoc } from './RealGimm.Web.Administration.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { AdministratorFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetAdministrationsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AdministrationFilterInput>;
  order?: Types.InputMaybe<Array<Types.AdministrationSortInput> | Types.AdministrationSortInput>;
}>;

export type GetAdministrationsQuery = {
  __typename?: 'Query';
  administration: {
    __typename?: 'AdministrationQueries';
    listAdministrations?: {
      __typename?: 'ListAdministrationsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAdministrationsFullQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AdministrationFilterInput>;
  order?: Types.InputMaybe<Array<Types.AdministrationSortInput> | Types.AdministrationSortInput>;
}>;

export type GetAdministrationsFullQuery = {
  __typename?: 'Query';
  administration: {
    __typename?: 'AdministrationQueries';
    listAdministrationsFull: Array<{
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
    }>;
  };
};

export type GetAdministrationQueryVariables = Types.Exact<{
  administrationId: Types.Scalars['Int']['input'];
}>;

export type GetAdministrationQuery = {
  __typename?: 'Query';
  administration: {
    __typename?: 'AdministrationQueries';
    get?: {
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
    } | null;
  };
};

export type CreateAdministrationMutationVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  inputs: Array<Types.AdministrationInput> | Types.AdministrationInput;
}>;

export type CreateAdministrationMutation = {
  __typename?: 'Mutation';
  administration: {
    __typename?: 'AdministrationMutations';
    add: {
      __typename?: 'ResultOfAdministration__';
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

export type UpdateAdministrationMutationVariables = Types.Exact<{
  administrationId: Types.Scalars['Int']['input'];
  input: Types.AdministrationInput;
}>;

export type UpdateAdministrationMutation = {
  __typename?: 'Mutation';
  administration: {
    __typename?: 'AdministrationMutations';
    update: {
      __typename?: 'ResultOfAdministration';
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

export type DeleteAdministrationsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteAdministrationsMutation = {
  __typename?: 'Mutation';
  administration: {
    __typename?: 'AdministrationMutations';
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

export type DeleteAdministrationMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteAdministrationMutation = {
  __typename?: 'Mutation';
  administration: {
    __typename?: 'AdministrationMutations';
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

export type ExportAdministrationsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AdministrationFilterInput>;
  order?: Types.InputMaybe<Array<Types.AdministrationSortInput> | Types.AdministrationSortInput>;
}>;

export type ExportAdministrationsQuery = {
  __typename?: 'Query';
  administration: {
    __typename?: 'AdministrationQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetAdministrationsDocument = gql`
  query getAdministrations(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AdministrationFilterInput
    $order: [AdministrationSortInput!]
  ) {
    administration {
      listAdministrations(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...AdministrationFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AdministrationFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetAdministrationsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAdministrationsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAdministrationsQuery, GetAdministrationsQueryVariables>({
    query: GetAdministrationsDocument,
    ...options,
  });
}
export const GetAdministrationsFullDocument = gql`
  query getAdministrationsFull($where: AdministrationFilterInput, $order: [AdministrationSortInput!]) {
    administration {
      listAdministrationsFull(where: $where, order: $order) {
        ...AdministrationFragment
      }
    }
  }
  ${AdministrationFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetAdministrationsFullQuery(
  options?: Omit<Urql.UseQueryArgs<GetAdministrationsFullQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAdministrationsFullQuery, GetAdministrationsFullQueryVariables>({
    query: GetAdministrationsFullDocument,
    ...options,
  });
}
export const GetAdministrationDocument = gql`
  query getAdministration($administrationId: Int!) {
    administration {
      get(id: $administrationId) {
        ...AdministrationDetailFragment
      }
    }
  }
  ${AdministrationDetailFragmentDoc}
  ${MainUsageTypeFragmentDoc}
  ${AdministratorFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${BankAccountFragmentDoc}
`;

export function useGetAdministrationQuery(options: Omit<Urql.UseQueryArgs<GetAdministrationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdministrationQuery, GetAdministrationQueryVariables>({
    query: GetAdministrationDocument,
    ...options,
  });
}
export const CreateAdministrationDocument = gql`
  mutation createAdministration($estateId: Int!, $inputs: [AdministrationInput!]!) {
    administration {
      add(estateId: $estateId, inputs: $inputs) {
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

export function useCreateAdministrationMutation() {
  return Urql.useMutation<CreateAdministrationMutation, CreateAdministrationMutationVariables>(
    CreateAdministrationDocument,
  );
}
export const UpdateAdministrationDocument = gql`
  mutation updateAdministration($administrationId: Int!, $input: AdministrationInput!) {
    administration {
      update(id: $administrationId, input: $input) {
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

export function useUpdateAdministrationMutation() {
  return Urql.useMutation<UpdateAdministrationMutation, UpdateAdministrationMutationVariables>(
    UpdateAdministrationDocument,
  );
}
export const DeleteAdministrationsDocument = gql`
  mutation deleteAdministrations($ids: [Int!]!) {
    administration {
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

export function useDeleteAdministrationsMutation() {
  return Urql.useMutation<DeleteAdministrationsMutation, DeleteAdministrationsMutationVariables>(
    DeleteAdministrationsDocument,
  );
}
export const DeleteAdministrationDocument = gql`
  mutation deleteAdministration($id: Int!) {
    administration {
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

export function useDeleteAdministrationMutation() {
  return Urql.useMutation<DeleteAdministrationMutation, DeleteAdministrationMutationVariables>(
    DeleteAdministrationDocument,
  );
}
export const ExportAdministrationsDocument = gql`
  query exportAdministrations($where: AdministrationFilterInput, $order: [AdministrationSortInput!]) {
    administration {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportAdministrationsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportAdministrationsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportAdministrationsQuery, ExportAdministrationsQueryVariables>({
    query: ExportAdministrationsDocument,
    ...options,
  });
}

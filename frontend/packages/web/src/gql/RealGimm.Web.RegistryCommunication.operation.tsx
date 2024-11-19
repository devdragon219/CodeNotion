// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { RegistryCommunicationFragmentDoc } from './RealGimm.Web.RegistryCommunication.fragment';
import { RegistryCommunicationGroupAnomalyFragmentDoc } from './RealGimm.Web.RegistryCommunicationAnomalyOutput.fragment';
import { RegistryCommunicationGroupFragmentDoc } from './RealGimm.Web.RegistryCommunicationGroup.fragment';
import { RegistryCommunicationGroupIdFragmentDoc } from './RealGimm.Web.RegistryCommunicationGroupId.fragment';
import { RegistryCommunicationManagementSubjectFragmentDoc } from './RealGimm.Web.Subject.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetRegistryCommunicationGroupsQueryVariables = Types.Exact<{
  isConfirmed: Types.Scalars['Boolean']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RegistryCommunicationGroupFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.RegistryCommunicationGroupSortInput> | Types.RegistryCommunicationGroupSortInput
  >;
}>;

export type GetRegistryCommunicationGroupsQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    listRegistryCommunicationGroups?: {
      __typename?: 'ListRegistryCommunicationGroupsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RegistryCommunicationGroup';
        debtAmount?: number | null;
        hasAnomalies: boolean;
        anomaliesCount: number;
        id: {
          __typename?: 'RegistryCommunicationGroupId';
          managementSubjectId: number;
          isActiveContract: boolean;
          communicationType: Types.CommunicationType;
          endDate?: string | null;
          date?: string | null;
          requestingSubjectLegalRepresentativeId?: number | null;
          debtBankAccountId?: number | null;
        };
        managementSubject:
          | {
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
            }
          | {
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
            }
          | {
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
        requestingSubjectLegalRepresentative?:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string }
          | null;
        debtBankAccount?: { __typename?: 'BankAccount'; id: number; referenceCode?: string | null } | null;
      }> | null;
    } | null;
  };
};

export type ExportRegistryCommunicationGroupsQueryVariables = Types.Exact<{
  isConfirmed: Types.Scalars['Boolean']['input'];
  where?: Types.InputMaybe<Types.RegistryCommunicationGroupFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.RegistryCommunicationGroupSortInput> | Types.RegistryCommunicationGroupSortInput
  >;
}>;

export type ExportRegistryCommunicationGroupsQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    exportGroupsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetRegistryCommunicationGroupQueryVariables = Types.Exact<{
  id: Types.RegistryCommunicationGroupIdInput;
}>;

export type GetRegistryCommunicationGroupQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    group?: {
      __typename?: 'RegistryCommunicationGroup';
      debtAmount?: number | null;
      hasAnomalies: boolean;
      anomaliesCount: number;
      id: {
        __typename?: 'RegistryCommunicationGroupId';
        managementSubjectId: number;
        isActiveContract: boolean;
        communicationType: Types.CommunicationType;
        endDate?: string | null;
        date?: string | null;
        requestingSubjectLegalRepresentativeId?: number | null;
        debtBankAccountId?: number | null;
      };
      managementSubject:
        | {
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
          }
        | {
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
          }
        | {
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
      requestingSubjectLegalRepresentative?:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string }
        | null;
      debtBankAccount?: { __typename?: 'BankAccount'; id: number; referenceCode?: string | null } | null;
    } | null;
  };
};

export type GetRegistryCommunicationsQueryVariables = Types.Exact<{
  groupId: Types.RegistryCommunicationGroupIdInput;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RegistryCommunicationFilterInput>;
  order?: Types.InputMaybe<Array<Types.RegistryCommunicationSortInput> | Types.RegistryCommunicationSortInput>;
}>;

export type GetRegistryCommunicationsQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    listRegistryCommunications?: {
      __typename?: 'ListRegistryCommunicationsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RegistryCommunication';
        id: number;
        debtAmount?: number | null;
        hasAnomalies: boolean;
        isExcluded: boolean;
        contract?: {
          __typename?: 'Contract';
          id: number;
          internalCode: string;
          landlord:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
          tenant:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
        } | null;
        estatesUnits: Array<{
          __typename?: 'CommEstateUnit';
          id: number;
          estateUnit: {
            __typename?: 'EstateUnit';
            id: number;
            name?: string | null;
            internalCode: string;
            address: {
              __typename?: 'AsstAddress';
              id: number;
              addressType: Types.AsstAddressType;
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
              locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
            };
          };
        }>;
      }> | null;
    } | null;
  };
};

export type GetRegistryCommunicationManagementSubjectsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetRegistryCommunicationManagementSubjectsQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    listManagementSubjects: Array<
      | {
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
        }
      | {
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
        }
      | {
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
        }
    >;
  };
};

export type ExportConfirmedRegistryCommunicationGroupQueryVariables = Types.Exact<{
  groupId: Types.ConfirmedRegistryCommunicationGroupIdInput;
}>;

export type ExportConfirmedRegistryCommunicationGroupQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    exportGroupXmlRli: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type MarkRegistryCommunicationAsExcludedMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type MarkRegistryCommunicationAsExcludedMutation = {
  __typename?: 'Mutation';
  registryCommunication: {
    __typename?: 'RegistryCommunicationMutations';
    markAsExcluded: {
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

export type MarkRegistryCommunicationAsIncludedMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type MarkRegistryCommunicationAsIncludedMutation = {
  __typename?: 'Mutation';
  registryCommunication: {
    __typename?: 'RegistryCommunicationMutations';
    markAsIncluded: {
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

export type GetRegistryCommunicationGroupAnomaliesQueryVariables = Types.Exact<{
  groupId: Types.RegistryCommunicationGroupIdInput;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RegistryCommunicationAnomalyOutputFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.RegistryCommunicationAnomalyOutputSortInput> | Types.RegistryCommunicationAnomalyOutputSortInput
  >;
}>;

export type GetRegistryCommunicationGroupAnomaliesQuery = {
  __typename?: 'Query';
  registryCommunication: {
    __typename?: 'RegistryCommunicationQueries';
    listAnomalies?: {
      __typename?: 'ListAnomaliesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RegistryCommunicationAnomalyOutput';
        contractInternalCode?: string | null;
        description: string;
        guid: string;
      }> | null;
    } | null;
  };
};

export type DeleteRegistryCommunicationsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteRegistryCommunicationsMutation = {
  __typename?: 'Mutation';
  registryCommunication: {
    __typename?: 'RegistryCommunicationMutations';
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

export const GetRegistryCommunicationGroupsDocument = gql`
  query getRegistryCommunicationGroups(
    $isConfirmed: Boolean!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RegistryCommunicationGroupFilterInput
    $order: [RegistryCommunicationGroupSortInput!]
  ) {
    registryCommunication {
      listRegistryCommunicationGroups(
        isConfirmed: $isConfirmed
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
          ...RegistryCommunicationGroupFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RegistryCommunicationGroupFragmentDoc}
  ${RegistryCommunicationGroupIdFragmentDoc}
  ${RegistryCommunicationManagementSubjectFragmentDoc}
`;

export function useGetRegistryCommunicationGroupsQuery(
  options: Omit<Urql.UseQueryArgs<GetRegistryCommunicationGroupsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistryCommunicationGroupsQuery, GetRegistryCommunicationGroupsQueryVariables>({
    query: GetRegistryCommunicationGroupsDocument,
    ...options,
  });
}
export const ExportRegistryCommunicationGroupsDocument = gql`
  query exportRegistryCommunicationGroups(
    $isConfirmed: Boolean!
    $where: RegistryCommunicationGroupFilterInput
    $order: [RegistryCommunicationGroupSortInput!]
  ) {
    registryCommunication {
      exportGroupsToExcel(isConfirmed: $isConfirmed, where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportRegistryCommunicationGroupsQuery(
  options: Omit<Urql.UseQueryArgs<ExportRegistryCommunicationGroupsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportRegistryCommunicationGroupsQuery, ExportRegistryCommunicationGroupsQueryVariables>({
    query: ExportRegistryCommunicationGroupsDocument,
    ...options,
  });
}
export const GetRegistryCommunicationGroupDocument = gql`
  query getRegistryCommunicationGroup($id: RegistryCommunicationGroupIdInput!) {
    registryCommunication {
      group(id: $id) {
        ...RegistryCommunicationGroupFragment
      }
    }
  }
  ${RegistryCommunicationGroupFragmentDoc}
  ${RegistryCommunicationGroupIdFragmentDoc}
  ${RegistryCommunicationManagementSubjectFragmentDoc}
`;

export function useGetRegistryCommunicationGroupQuery(
  options: Omit<Urql.UseQueryArgs<GetRegistryCommunicationGroupQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistryCommunicationGroupQuery, GetRegistryCommunicationGroupQueryVariables>({
    query: GetRegistryCommunicationGroupDocument,
    ...options,
  });
}
export const GetRegistryCommunicationsDocument = gql`
  query getRegistryCommunications(
    $groupId: RegistryCommunicationGroupIdInput!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RegistryCommunicationFilterInput
    $order: [RegistryCommunicationSortInput!]
  ) {
    registryCommunication {
      listRegistryCommunications(
        groupId: $groupId
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
          ...RegistryCommunicationFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RegistryCommunicationFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetRegistryCommunicationsQuery(
  options: Omit<Urql.UseQueryArgs<GetRegistryCommunicationsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistryCommunicationsQuery, GetRegistryCommunicationsQueryVariables>({
    query: GetRegistryCommunicationsDocument,
    ...options,
  });
}
export const GetRegistryCommunicationManagementSubjectsDocument = gql`
  query getRegistryCommunicationManagementSubjects {
    registryCommunication {
      listManagementSubjects {
        ...RegistryCommunicationManagementSubjectFragment
      }
    }
  }
  ${RegistryCommunicationManagementSubjectFragmentDoc}
`;

export function useGetRegistryCommunicationManagementSubjectsQuery(
  options?: Omit<Urql.UseQueryArgs<GetRegistryCommunicationManagementSubjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetRegistryCommunicationManagementSubjectsQuery,
    GetRegistryCommunicationManagementSubjectsQueryVariables
  >({ query: GetRegistryCommunicationManagementSubjectsDocument, ...options });
}
export const ExportConfirmedRegistryCommunicationGroupDocument = gql`
  query exportConfirmedRegistryCommunicationGroup($groupId: ConfirmedRegistryCommunicationGroupIdInput!) {
    registryCommunication {
      exportGroupXmlRli(groupId: $groupId) {
        resourceUrl
      }
    }
  }
`;

export function useExportConfirmedRegistryCommunicationGroupQuery(
  options: Omit<Urql.UseQueryArgs<ExportConfirmedRegistryCommunicationGroupQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    ExportConfirmedRegistryCommunicationGroupQuery,
    ExportConfirmedRegistryCommunicationGroupQueryVariables
  >({ query: ExportConfirmedRegistryCommunicationGroupDocument, ...options });
}
export const MarkRegistryCommunicationAsExcludedDocument = gql`
  mutation markRegistryCommunicationAsExcluded($id: Int!) {
    registryCommunication {
      markAsExcluded(id: $id) {
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

export function useMarkRegistryCommunicationAsExcludedMutation() {
  return Urql.useMutation<
    MarkRegistryCommunicationAsExcludedMutation,
    MarkRegistryCommunicationAsExcludedMutationVariables
  >(MarkRegistryCommunicationAsExcludedDocument);
}
export const MarkRegistryCommunicationAsIncludedDocument = gql`
  mutation markRegistryCommunicationAsIncluded($id: Int!) {
    registryCommunication {
      markAsIncluded(id: $id) {
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

export function useMarkRegistryCommunicationAsIncludedMutation() {
  return Urql.useMutation<
    MarkRegistryCommunicationAsIncludedMutation,
    MarkRegistryCommunicationAsIncludedMutationVariables
  >(MarkRegistryCommunicationAsIncludedDocument);
}
export const GetRegistryCommunicationGroupAnomaliesDocument = gql`
  query getRegistryCommunicationGroupAnomalies(
    $groupId: RegistryCommunicationGroupIdInput!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RegistryCommunicationAnomalyOutputFilterInput
    $order: [RegistryCommunicationAnomalyOutputSortInput!]
  ) {
    registryCommunication {
      listAnomalies(
        groupId: $groupId
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
          ...RegistryCommunicationGroupAnomalyFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RegistryCommunicationGroupAnomalyFragmentDoc}
`;

export function useGetRegistryCommunicationGroupAnomaliesQuery(
  options: Omit<Urql.UseQueryArgs<GetRegistryCommunicationGroupAnomaliesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetRegistryCommunicationGroupAnomaliesQuery,
    GetRegistryCommunicationGroupAnomaliesQueryVariables
  >({ query: GetRegistryCommunicationGroupAnomaliesDocument, ...options });
}
export const DeleteRegistryCommunicationsDocument = gql`
  mutation deleteRegistryCommunications($ids: [Int!]!) {
    registryCommunication {
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

export function useDeleteRegistryCommunicationsMutation() {
  return Urql.useMutation<DeleteRegistryCommunicationsMutation, DeleteRegistryCommunicationsMutationVariables>(
    DeleteRegistryCommunicationsDocument,
  );
}

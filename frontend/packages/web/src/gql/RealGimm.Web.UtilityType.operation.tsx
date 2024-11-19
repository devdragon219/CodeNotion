// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';
import { UtilityTypeDetailFragmentDoc, UtilityTypeFragmentDoc } from './RealGimm.Web.UtilityType.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetUtilityTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UtilityTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityTypeSortInput> | Types.UtilityTypeSortInput>;
}>;

export type GetUtilityTypesQuery = {
  __typename?: 'Query';
  utilityType: {
    __typename?: 'UtilityTypeQueries';
    listUtilityType?: {
      __typename?: 'ListUtilityTypeConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'UtilityType';
        id: number;
        category: Types.UtilityCategory;
        internalCode: string;
        description: string;
        externalCode?: string | null;
        expenseClass?: string | null;
        measurementUnit: string;
        measurementUnitDescription: string;
        timeOfUseRateCount: number;
        meteringType: Types.MeteringType;
        hasHeatingAccountingSystem: boolean;
      }> | null;
    } | null;
  };
};

export type GetUtilityTypeQueryVariables = Types.Exact<{
  utilityTypeId: Types.Scalars['Int']['input'];
}>;

export type GetUtilityTypeQuery = {
  __typename?: 'Query';
  utilityType: {
    __typename?: 'UtilityTypeQueries';
    get?: {
      __typename?: 'UtilityType';
      category: Types.UtilityCategory;
      description: string;
      internalCode: string;
      expenseClass?: string | null;
      externalCode?: string | null;
      measurementUnit: string;
      measurementUnitDescription: string;
      timeOfUseRateCount: number;
      meteringType: Types.MeteringType;
      hasHeatingAccountingSystem: boolean;
      id: number;
      chargeFields?: Array<
        Array<{
          __typename?: 'UtilityChargeField';
          name: string;
          isMandatory: boolean;
          id: string;
          type: Types.CustomFieldType;
          validValues?: Array<string> | null;
        }>
      > | null;
    } | null;
  };
};

export type ExportUtilityTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UtilityTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityTypeSortInput> | Types.UtilityTypeSortInput>;
}>;

export type ExportUtilityTypesQuery = {
  __typename?: 'Query';
  utilityType: {
    __typename?: 'UtilityTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CreateUtilityTypeMutationVariables = Types.Exact<{
  utilityTypeInput: Types.UtilityTypeInput;
}>;

export type CreateUtilityTypeMutation = {
  __typename?: 'Mutation';
  utilityType: {
    __typename?: 'UtilityTypeMutations';
    add: {
      __typename?: 'ResultOfUtilityType';
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

export type UpdateUtilityTypeMutationVariables = Types.Exact<{
  utilityTypeId: Types.Scalars['Int']['input'];
  utilityTypeInput: Types.UtilityTypeInput;
}>;

export type UpdateUtilityTypeMutation = {
  __typename?: 'Mutation';
  utilityType: {
    __typename?: 'UtilityTypeMutations';
    update: {
      __typename?: 'ResultOfUtilityType';
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

export type DeleteUtilityTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteUtilityTypesMutation = {
  __typename?: 'Mutation';
  utilityType: {
    __typename?: 'UtilityTypeMutations';
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

export type DeleteUtilityTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteUtilityTypeMutation = {
  __typename?: 'Mutation';
  utilityType: {
    __typename?: 'UtilityTypeMutations';
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

export type GetUtilityTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUtilityTypeInternalCodeQuery = {
  __typename?: 'Query';
  utilityType: { __typename?: 'UtilityTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseUtilityTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentUtilityTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseUtilityTypeInternalCodeQuery = {
  __typename?: 'Query';
  utilityType: { __typename?: 'UtilityTypeQueries'; canUseInternalCode: boolean };
};

export const GetUtilityTypesDocument = gql`
  query getUtilityTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UtilityTypeFilterInput
    $order: [UtilityTypeSortInput!]
  ) {
    utilityType {
      listUtilityType(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...UtilityTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UtilityTypeFragmentDoc}
`;

export function useGetUtilityTypesQuery(options?: Omit<Urql.UseQueryArgs<GetUtilityTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUtilityTypesQuery, GetUtilityTypesQueryVariables>({
    query: GetUtilityTypesDocument,
    ...options,
  });
}
export const GetUtilityTypeDocument = gql`
  query getUtilityType($utilityTypeId: Int!) {
    utilityType {
      get(id: $utilityTypeId) {
        ...UtilityTypeDetailFragment
      }
    }
  }
  ${UtilityTypeDetailFragmentDoc}
  ${UtilityChargeFieldFragmentDoc}
`;

export function useGetUtilityTypeQuery(options: Omit<Urql.UseQueryArgs<GetUtilityTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUtilityTypeQuery, GetUtilityTypeQueryVariables>({
    query: GetUtilityTypeDocument,
    ...options,
  });
}
export const ExportUtilityTypesDocument = gql`
  query exportUtilityTypes($where: UtilityTypeFilterInput, $order: [UtilityTypeSortInput!]) {
    utilityType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportUtilityTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportUtilityTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportUtilityTypesQuery, ExportUtilityTypesQueryVariables>({
    query: ExportUtilityTypesDocument,
    ...options,
  });
}
export const CreateUtilityTypeDocument = gql`
  mutation createUtilityType($utilityTypeInput: UtilityTypeInput!) {
    utilityType {
      add(input: $utilityTypeInput) {
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

export function useCreateUtilityTypeMutation() {
  return Urql.useMutation<CreateUtilityTypeMutation, CreateUtilityTypeMutationVariables>(CreateUtilityTypeDocument);
}
export const UpdateUtilityTypeDocument = gql`
  mutation updateUtilityType($utilityTypeId: Int!, $utilityTypeInput: UtilityTypeInput!) {
    utilityType {
      update(id: $utilityTypeId, input: $utilityTypeInput) {
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

export function useUpdateUtilityTypeMutation() {
  return Urql.useMutation<UpdateUtilityTypeMutation, UpdateUtilityTypeMutationVariables>(UpdateUtilityTypeDocument);
}
export const DeleteUtilityTypesDocument = gql`
  mutation deleteUtilityTypes($ids: [Int!]!) {
    utilityType {
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

export function useDeleteUtilityTypesMutation() {
  return Urql.useMutation<DeleteUtilityTypesMutation, DeleteUtilityTypesMutationVariables>(DeleteUtilityTypesDocument);
}
export const DeleteUtilityTypeDocument = gql`
  mutation deleteUtilityType($id: Int!) {
    utilityType {
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

export function useDeleteUtilityTypeMutation() {
  return Urql.useMutation<DeleteUtilityTypeMutation, DeleteUtilityTypeMutationVariables>(DeleteUtilityTypeDocument);
}
export const GetUtilityTypeInternalCodeDocument = gql`
  query getUtilityTypeInternalCode {
    utilityType {
      proposeNewInternalCode
    }
  }
`;

export function useGetUtilityTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetUtilityTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUtilityTypeInternalCodeQuery, GetUtilityTypeInternalCodeQueryVariables>({
    query: GetUtilityTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseUtilityTypeInternalCodeDocument = gql`
  query canUseUtilityTypeInternalCode($internalCode: String!, $currentUtilityTypeId: Int) {
    utilityType {
      canUseInternalCode(internalCode: $internalCode, currentUtilityTypeId: $currentUtilityTypeId)
    }
  }
`;

export function useCanUseUtilityTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseUtilityTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseUtilityTypeInternalCodeQuery, CanUseUtilityTypeInternalCodeQueryVariables>({
    query: CanUseUtilityTypeInternalCodeDocument,
    ...options,
  });
}

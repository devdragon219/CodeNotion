// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { InterventionTypeFragmentDoc } from './RealGimm.Web.InterventionType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetInterventionTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.InterventionTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.InterventionTypeSortInput> | Types.InterventionTypeSortInput>;
}>;

export type GetInterventionTypesQuery = {
  __typename?: 'Query';
  interventionType: {
    __typename?: 'InterventionTypeQueries';
    listInterventionTypes?: {
      __typename?: 'ListInterventionTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'InterventionType'; internalCode: string; name: string; id: number }> | null;
    } | null;
  };
};

export type AddInterventionTypeMutationVariables = Types.Exact<{
  input: Types.InterventionTypeInput;
}>;

export type AddInterventionTypeMutation = {
  __typename?: 'Mutation';
  interventionType: {
    __typename?: 'InterventionTypeMutations';
    add: {
      __typename?: 'ResultOfInterventionType';
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

export type UpdateInterventionTypeMutationVariables = Types.Exact<{
  interventionTypeId: Types.Scalars['Int']['input'];
  input: Types.InterventionTypeInput;
}>;

export type UpdateInterventionTypeMutation = {
  __typename?: 'Mutation';
  interventionType: {
    __typename?: 'InterventionTypeMutations';
    update: {
      __typename?: 'ResultOfInterventionType';
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

export type DeleteInterventionTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteInterventionTypesMutation = {
  __typename?: 'Mutation';
  interventionType: {
    __typename?: 'InterventionTypeMutations';
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

export type GetInterventionTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetInterventionTypeInternalCodeQuery = {
  __typename?: 'Query';
  interventionType: { __typename?: 'InterventionTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseInterventionTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentInterventionTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseInterventionTypeInternalCodeQuery = {
  __typename?: 'Query';
  interventionType: { __typename?: 'InterventionTypeQueries'; canUseInternalCode: boolean };
};

export type ExportInterventionTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.InterventionTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.InterventionTypeSortInput> | Types.InterventionTypeSortInput>;
}>;

export type ExportInterventionTypesQuery = {
  __typename?: 'Query';
  interventionType: {
    __typename?: 'InterventionTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetInterventionTypesDocument = gql`
  query getInterventionTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: InterventionTypeFilterInput
    $order: [InterventionTypeSortInput!]
  ) {
    interventionType {
      listInterventionTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...InterventionTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${InterventionTypeFragmentDoc}
`;

export function useGetInterventionTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetInterventionTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetInterventionTypesQuery, GetInterventionTypesQueryVariables>({
    query: GetInterventionTypesDocument,
    ...options,
  });
}
export const AddInterventionTypeDocument = gql`
  mutation addInterventionType($input: InterventionTypeInput!) {
    interventionType {
      add(input: $input) {
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

export function useAddInterventionTypeMutation() {
  return Urql.useMutation<AddInterventionTypeMutation, AddInterventionTypeMutationVariables>(
    AddInterventionTypeDocument,
  );
}
export const UpdateInterventionTypeDocument = gql`
  mutation updateInterventionType($interventionTypeId: Int!, $input: InterventionTypeInput!) {
    interventionType {
      update(id: $interventionTypeId, input: $input) {
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

export function useUpdateInterventionTypeMutation() {
  return Urql.useMutation<UpdateInterventionTypeMutation, UpdateInterventionTypeMutationVariables>(
    UpdateInterventionTypeDocument,
  );
}
export const DeleteInterventionTypesDocument = gql`
  mutation deleteInterventionTypes($ids: [Int!]!) {
    interventionType {
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

export function useDeleteInterventionTypesMutation() {
  return Urql.useMutation<DeleteInterventionTypesMutation, DeleteInterventionTypesMutationVariables>(
    DeleteInterventionTypesDocument,
  );
}
export const GetInterventionTypeInternalCodeDocument = gql`
  query getInterventionTypeInternalCode {
    interventionType {
      proposeNewInternalCode
    }
  }
`;

export function useGetInterventionTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetInterventionTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetInterventionTypeInternalCodeQuery, GetInterventionTypeInternalCodeQueryVariables>({
    query: GetInterventionTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseInterventionTypeInternalCodeDocument = gql`
  query canUseInterventionTypeInternalCode($internalCode: String!, $currentInterventionTypeId: Int) {
    interventionType {
      canUseInternalCode(internalCode: $internalCode, currentInterventionTypeId: $currentInterventionTypeId)
    }
  }
`;

export function useCanUseInterventionTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseInterventionTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseInterventionTypeInternalCodeQuery, CanUseInterventionTypeInternalCodeQueryVariables>({
    query: CanUseInterventionTypeInternalCodeDocument,
    ...options,
  });
}
export const ExportInterventionTypesDocument = gql`
  query exportInterventionTypes($where: InterventionTypeFilterInput, $order: [InterventionTypeSortInput!]) {
    interventionType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportInterventionTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportInterventionTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportInterventionTypesQuery, ExportInterventionTypesQueryVariables>({
    query: ExportInterventionTypesDocument,
    ...options,
  });
}

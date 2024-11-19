// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetMainUsageTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateMainUsageTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateMainUsageTypeSortInput> | Types.EstateMainUsageTypeSortInput>;
}>;

export type GetMainUsageTypesQuery = {
  __typename?: 'Query';
  estateMainUsageType: {
    __typename?: 'EstateMainUsageTypeQueries';
    listEstateMainUsageTypes?: {
      __typename?: 'ListEstateMainUsageTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateMainUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
      }> | null;
    } | null;
  };
};

export type AddMainUsageTypeMutationVariables = Types.Exact<{
  input: Types.EstateMainUsageTypeInput;
}>;

export type AddMainUsageTypeMutation = {
  __typename?: 'Mutation';
  estateMainUsageType: {
    __typename?: 'EstateMainUsageTypeMutations';
    add: {
      __typename?: 'ResultOfEstateMainUsageType';
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

export type UpdateMainUsageTypeMutationVariables = Types.Exact<{
  mainUsageTypeId: Types.Scalars['Int']['input'];
  input: Types.EstateMainUsageTypeInput;
}>;

export type UpdateMainUsageTypeMutation = {
  __typename?: 'Mutation';
  estateMainUsageType: {
    __typename?: 'EstateMainUsageTypeMutations';
    update: {
      __typename?: 'ResultOfEstateMainUsageType';
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

export type DeleteMainUsageTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteMainUsageTypesMutation = {
  __typename?: 'Mutation';
  estateMainUsageType: {
    __typename?: 'EstateMainUsageTypeMutations';
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

export type ExportMainUsageTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateMainUsageTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateMainUsageTypeSortInput> | Types.EstateMainUsageTypeSortInput>;
}>;

export type ExportMainUsageTypesQuery = {
  __typename?: 'Query';
  estateMainUsageType: {
    __typename?: 'EstateMainUsageTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetMainUsageTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMainUsageTypeInternalCodeQuery = {
  __typename?: 'Query';
  estateMainUsageType: { __typename?: 'EstateMainUsageTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseMainUsageTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentMainUsageTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseMainUsageTypeInternalCodeQuery = {
  __typename?: 'Query';
  estateMainUsageType: { __typename?: 'EstateMainUsageTypeQueries'; canUseInternalCode: boolean };
};

export const GetMainUsageTypesDocument = gql`
  query getMainUsageTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateMainUsageTypeFilterInput
    $order: [EstateMainUsageTypeSortInput!]
  ) {
    estateMainUsageType {
      listEstateMainUsageTypes(
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
          ...MainUsageTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${MainUsageTypeFragmentDoc}
`;

export function useGetMainUsageTypesQuery(options?: Omit<Urql.UseQueryArgs<GetMainUsageTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMainUsageTypesQuery, GetMainUsageTypesQueryVariables>({
    query: GetMainUsageTypesDocument,
    ...options,
  });
}
export const AddMainUsageTypeDocument = gql`
  mutation addMainUsageType($input: EstateMainUsageTypeInput!) {
    estateMainUsageType {
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

export function useAddMainUsageTypeMutation() {
  return Urql.useMutation<AddMainUsageTypeMutation, AddMainUsageTypeMutationVariables>(AddMainUsageTypeDocument);
}
export const UpdateMainUsageTypeDocument = gql`
  mutation updateMainUsageType($mainUsageTypeId: Int!, $input: EstateMainUsageTypeInput!) {
    estateMainUsageType {
      update(id: $mainUsageTypeId, input: $input) {
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

export function useUpdateMainUsageTypeMutation() {
  return Urql.useMutation<UpdateMainUsageTypeMutation, UpdateMainUsageTypeMutationVariables>(
    UpdateMainUsageTypeDocument,
  );
}
export const DeleteMainUsageTypesDocument = gql`
  mutation deleteMainUsageTypes($ids: [Int!]!) {
    estateMainUsageType {
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

export function useDeleteMainUsageTypesMutation() {
  return Urql.useMutation<DeleteMainUsageTypesMutation, DeleteMainUsageTypesMutationVariables>(
    DeleteMainUsageTypesDocument,
  );
}
export const ExportMainUsageTypesDocument = gql`
  query exportMainUsageTypes($where: EstateMainUsageTypeFilterInput, $order: [EstateMainUsageTypeSortInput!]) {
    estateMainUsageType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportMainUsageTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportMainUsageTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportMainUsageTypesQuery, ExportMainUsageTypesQueryVariables>({
    query: ExportMainUsageTypesDocument,
    ...options,
  });
}
export const GetMainUsageTypeInternalCodeDocument = gql`
  query getMainUsageTypeInternalCode {
    estateMainUsageType {
      proposeNewInternalCode
    }
  }
`;

export function useGetMainUsageTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetMainUsageTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetMainUsageTypeInternalCodeQuery, GetMainUsageTypeInternalCodeQueryVariables>({
    query: GetMainUsageTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseMainUsageTypeInternalCodeDocument = gql`
  query canUseMainUsageTypeInternalCode($internalCode: String!, $currentMainUsageTypeId: Int) {
    estateMainUsageType {
      canUseInternalCode(internalCode: $internalCode, currentEstateMainUsageTypeId: $currentMainUsageTypeId)
    }
  }
`;

export function useCanUseMainUsageTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseMainUsageTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseMainUsageTypeInternalCodeQuery, CanUseMainUsageTypeInternalCodeQueryVariables>({
    query: CanUseMainUsageTypeInternalCodeDocument,
    ...options,
  });
}

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { FunctionAreaFragmentDoc } from './RealGimm.Web.FunctionArea.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetFunctionAreasQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FunctionAreaFilterInput>;
  order?: Types.InputMaybe<Array<Types.FunctionAreaSortInput> | Types.FunctionAreaSortInput>;
}>;

export type GetFunctionAreasQuery = {
  __typename?: 'Query';
  functionArea: {
    __typename?: 'FunctionAreaQueries';
    listFunctionAreas?: {
      __typename?: 'ListFunctionAreasConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'FunctionArea';
        name: string;
        internalCode: string;
        surfaceType: Types.SurfaceType;
        id: number;
      }> | null;
    } | null;
  };
};

export type GetFunctionAreaInternalCodeQueryVariables = Types.Exact<{
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type GetFunctionAreaInternalCodeQuery = {
  __typename?: 'Query';
  functionArea: { __typename?: 'FunctionAreaQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseFunctionAreaInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentFunctionAreaId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseFunctionAreaInternalCodeQuery = {
  __typename?: 'Query';
  functionArea: { __typename?: 'FunctionAreaQueries'; canUseInternalCode: boolean };
};

export type CreateFunctionAreasMutationVariables = Types.Exact<{
  functionAreaInputs: Array<Types.FunctionAreaInput> | Types.FunctionAreaInput;
}>;

export type CreateFunctionAreasMutation = {
  __typename?: 'Mutation';
  functionArea: {
    __typename?: 'FunctionAreaMutations';
    addRange: {
      __typename?: 'ResultOfFunctionArea__';
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

export type DeleteFunctionAreasMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteFunctionAreasMutation = {
  __typename?: 'Mutation';
  functionArea: {
    __typename?: 'FunctionAreaMutations';
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

export type ExportFunctionAreasQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FunctionAreaFilterInput>;
  order?: Types.InputMaybe<Array<Types.FunctionAreaSortInput> | Types.FunctionAreaSortInput>;
}>;

export type ExportFunctionAreasQuery = {
  __typename?: 'Query';
  functionArea: {
    __typename?: 'FunctionAreaQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type UpdateFunctionAreaMutationVariables = Types.Exact<{
  functionAreaId: Types.Scalars['Int']['input'];
  functionAreaInput: Types.FunctionAreaInput;
}>;

export type UpdateFunctionAreaMutation = {
  __typename?: 'Mutation';
  functionArea: {
    __typename?: 'FunctionAreaMutations';
    update: {
      __typename?: 'ResultOfFunctionArea';
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

export type GetAllFunctionAreasQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FunctionAreaFilterInput>;
  order?: Types.InputMaybe<Array<Types.FunctionAreaSortInput> | Types.FunctionAreaSortInput>;
}>;

export type GetAllFunctionAreasQuery = {
  __typename?: 'Query';
  functionArea: {
    __typename?: 'FunctionAreaQueries';
    listFunctionAreasFull: Array<{
      __typename?: 'FunctionArea';
      name: string;
      internalCode: string;
      surfaceType: Types.SurfaceType;
      id: number;
    }>;
  };
};

export const GetFunctionAreasDocument = gql`
  query getFunctionAreas(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FunctionAreaFilterInput
    $order: [FunctionAreaSortInput!]
  ) {
    functionArea {
      listFunctionAreas(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FunctionAreaFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FunctionAreaFragmentDoc}
`;

export function useGetFunctionAreasQuery(options?: Omit<Urql.UseQueryArgs<GetFunctionAreasQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFunctionAreasQuery, GetFunctionAreasQueryVariables>({
    query: GetFunctionAreasDocument,
    ...options,
  });
}
export const GetFunctionAreaInternalCodeDocument = gql`
  query getFunctionAreaInternalCode($additionallyOccupiedCodes: [String!]!) {
    functionArea {
      proposeNewInternalCode(additionallyOccupiedCodes: $additionallyOccupiedCodes)
    }
  }
`;

export function useGetFunctionAreaInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetFunctionAreaInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFunctionAreaInternalCodeQuery, GetFunctionAreaInternalCodeQueryVariables>({
    query: GetFunctionAreaInternalCodeDocument,
    ...options,
  });
}
export const CanUseFunctionAreaInternalCodeDocument = gql`
  query canUseFunctionAreaInternalCode($internalCode: String!, $currentFunctionAreaId: Int) {
    functionArea {
      canUseInternalCode(internalCode: $internalCode, currentFunctionAreaId: $currentFunctionAreaId)
    }
  }
`;

export function useCanUseFunctionAreaInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseFunctionAreaInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseFunctionAreaInternalCodeQuery, CanUseFunctionAreaInternalCodeQueryVariables>({
    query: CanUseFunctionAreaInternalCodeDocument,
    ...options,
  });
}
export const CreateFunctionAreasDocument = gql`
  mutation createFunctionAreas($functionAreaInputs: [FunctionAreaInput!]!) {
    functionArea {
      addRange(inputs: $functionAreaInputs) {
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

export function useCreateFunctionAreasMutation() {
  return Urql.useMutation<CreateFunctionAreasMutation, CreateFunctionAreasMutationVariables>(
    CreateFunctionAreasDocument,
  );
}
export const DeleteFunctionAreasDocument = gql`
  mutation deleteFunctionAreas($ids: [Int!]!) {
    functionArea {
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

export function useDeleteFunctionAreasMutation() {
  return Urql.useMutation<DeleteFunctionAreasMutation, DeleteFunctionAreasMutationVariables>(
    DeleteFunctionAreasDocument,
  );
}
export const ExportFunctionAreasDocument = gql`
  query exportFunctionAreas($where: FunctionAreaFilterInput, $order: [FunctionAreaSortInput!]) {
    functionArea {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportFunctionAreasQuery(
  options?: Omit<Urql.UseQueryArgs<ExportFunctionAreasQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportFunctionAreasQuery, ExportFunctionAreasQueryVariables>({
    query: ExportFunctionAreasDocument,
    ...options,
  });
}
export const UpdateFunctionAreaDocument = gql`
  mutation updateFunctionArea($functionAreaId: Int!, $functionAreaInput: FunctionAreaInput!) {
    functionArea {
      update(id: $functionAreaId, input: $functionAreaInput) {
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

export function useUpdateFunctionAreaMutation() {
  return Urql.useMutation<UpdateFunctionAreaMutation, UpdateFunctionAreaMutationVariables>(UpdateFunctionAreaDocument);
}
export const GetAllFunctionAreasDocument = gql`
  query getAllFunctionAreas($where: FunctionAreaFilterInput, $order: [FunctionAreaSortInput!]) {
    functionArea {
      listFunctionAreasFull(where: $where, order: $order) {
        ...FunctionAreaFragment
      }
    }
  }
  ${FunctionAreaFragmentDoc}
`;

export function useGetAllFunctionAreasQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllFunctionAreasQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllFunctionAreasQuery, GetAllFunctionAreasQueryVariables>({
    query: GetAllFunctionAreasDocument,
    ...options,
  });
}

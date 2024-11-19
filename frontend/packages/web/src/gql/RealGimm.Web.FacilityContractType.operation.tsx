// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { FacilityContractTypeFragmentDoc } from './RealGimm.Web.FacilityContractType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetFacilityContractTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FcltContractTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.FcltContractTypeSortInput> | Types.FcltContractTypeSortInput>;
}>;

export type GetFacilityContractTypesQuery = {
  __typename?: 'Query';
  fcltContractType: {
    __typename?: 'FcltContractTypeQueries';
    listFcltContractTypes?: {
      __typename?: 'ListFcltContractTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'FcltContractType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
      }> | null;
    } | null;
  };
};

export type AddFacilityContractTypeMutationVariables = Types.Exact<{
  input: Types.FcltContractTypeInput;
}>;

export type AddFacilityContractTypeMutation = {
  __typename?: 'Mutation';
  fcltContractType: {
    __typename?: 'FcltContractTypeMutations';
    add: {
      __typename?: 'ResultOfFcltContractType';
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

export type UpdateFacilityContractTypeMutationVariables = Types.Exact<{
  facilityContractTypeId: Types.Scalars['Int']['input'];
  input: Types.FcltContractTypeInput;
}>;

export type UpdateFacilityContractTypeMutation = {
  __typename?: 'Mutation';
  fcltContractType: {
    __typename?: 'FcltContractTypeMutations';
    update: {
      __typename?: 'ResultOfFcltContractType';
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

export type DeleteFacilityContractTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteFacilityContractTypesMutation = {
  __typename?: 'Mutation';
  fcltContractType: {
    __typename?: 'FcltContractTypeMutations';
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

export type GetFacilityContractTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFacilityContractTypeInternalCodeQuery = {
  __typename?: 'Query';
  fcltContractType: { __typename?: 'FcltContractTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseFacilityContractTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentFacilityContractTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseFacilityContractTypeInternalCodeQuery = {
  __typename?: 'Query';
  fcltContractType: { __typename?: 'FcltContractTypeQueries'; canUseInternalCode: boolean };
};

export type ExportFacilityContractTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FcltContractTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.FcltContractTypeSortInput> | Types.FcltContractTypeSortInput>;
}>;

export type ExportFacilityContractTypesQuery = {
  __typename?: 'Query';
  fcltContractType: {
    __typename?: 'FcltContractTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetFacilityContractTypesDocument = gql`
  query getFacilityContractTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FcltContractTypeFilterInput
    $order: [FcltContractTypeSortInput!]
  ) {
    fcltContractType {
      listFcltContractTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FacilityContractTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FacilityContractTypeFragmentDoc}
`;

export function useGetFacilityContractTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractTypesQuery, GetFacilityContractTypesQueryVariables>({
    query: GetFacilityContractTypesDocument,
    ...options,
  });
}
export const AddFacilityContractTypeDocument = gql`
  mutation addFacilityContractType($input: FcltContractTypeInput!) {
    fcltContractType {
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

export function useAddFacilityContractTypeMutation() {
  return Urql.useMutation<AddFacilityContractTypeMutation, AddFacilityContractTypeMutationVariables>(
    AddFacilityContractTypeDocument,
  );
}
export const UpdateFacilityContractTypeDocument = gql`
  mutation updateFacilityContractType($facilityContractTypeId: Int!, $input: FcltContractTypeInput!) {
    fcltContractType {
      update(id: $facilityContractTypeId, input: $input) {
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

export function useUpdateFacilityContractTypeMutation() {
  return Urql.useMutation<UpdateFacilityContractTypeMutation, UpdateFacilityContractTypeMutationVariables>(
    UpdateFacilityContractTypeDocument,
  );
}
export const DeleteFacilityContractTypesDocument = gql`
  mutation deleteFacilityContractTypes($ids: [Int!]!) {
    fcltContractType {
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

export function useDeleteFacilityContractTypesMutation() {
  return Urql.useMutation<DeleteFacilityContractTypesMutation, DeleteFacilityContractTypesMutationVariables>(
    DeleteFacilityContractTypesDocument,
  );
}
export const GetFacilityContractTypeInternalCodeDocument = gql`
  query getFacilityContractTypeInternalCode {
    fcltContractType {
      proposeNewInternalCode
    }
  }
`;

export function useGetFacilityContractTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractTypeInternalCodeQuery, GetFacilityContractTypeInternalCodeQueryVariables>({
    query: GetFacilityContractTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseFacilityContractTypeInternalCodeDocument = gql`
  query canUseFacilityContractTypeInternalCode($internalCode: String!, $currentFacilityContractTypeId: Int) {
    fcltContractType {
      canUseInternalCode(internalCode: $internalCode, currentContractTypeId: $currentFacilityContractTypeId)
    }
  }
`;

export function useCanUseFacilityContractTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseFacilityContractTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUseFacilityContractTypeInternalCodeQuery,
    CanUseFacilityContractTypeInternalCodeQueryVariables
  >({ query: CanUseFacilityContractTypeInternalCodeDocument, ...options });
}
export const ExportFacilityContractTypesDocument = gql`
  query exportFacilityContractTypes($where: FcltContractTypeFilterInput, $order: [FcltContractTypeSortInput!]) {
    fcltContractType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportFacilityContractTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportFacilityContractTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportFacilityContractTypesQuery, ExportFacilityContractTypesQueryVariables>({
    query: ExportFacilityContractTypesDocument,
    ...options,
  });
}

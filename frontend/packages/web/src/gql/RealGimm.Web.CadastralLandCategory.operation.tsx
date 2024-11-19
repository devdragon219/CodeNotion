// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCadastralLandCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CadastralLandCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CadastralLandCategorySortInput> | Types.CadastralLandCategorySortInput>;
}>;

export type GetCadastralLandCategoriesQuery = {
  __typename?: 'Query';
  cadastralLandCategory: {
    __typename?: 'CadastralLandCategoryQueries';
    cadastralLandCategories?: {
      __typename?: 'CadastralLandCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CadastralLandCategory';
        id: number;
        description: string;
        internalCode: string;
        countryISO: string;
        ordering: number;
      }> | null;
    } | null;
  };
};

export type AddCadastralLandCategoryMutationVariables = Types.Exact<{
  input: Types.CadastralLandCategoryInput;
}>;

export type AddCadastralLandCategoryMutation = {
  __typename?: 'Mutation';
  cadastralLandCategory: {
    __typename?: 'CadastralLandCategoryMutations';
    add: {
      __typename?: 'ResultOfCadastralLandCategory';
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

export type UpdateCadastralLandCategoryMutationVariables = Types.Exact<{
  cadastralLandCategoryId: Types.Scalars['Int']['input'];
  input: Types.CadastralLandCategoryInput;
}>;

export type UpdateCadastralLandCategoryMutation = {
  __typename?: 'Mutation';
  cadastralLandCategory: {
    __typename?: 'CadastralLandCategoryMutations';
    update: {
      __typename?: 'ResultOfCadastralLandCategory';
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

export type DeleteCadastralLandCategoriesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCadastralLandCategoriesMutation = {
  __typename?: 'Mutation';
  cadastralLandCategory: {
    __typename?: 'CadastralLandCategoryMutations';
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

export type GetCadastralLandCategoryInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCadastralLandCategoryInternalCodeQuery = {
  __typename?: 'Query';
  cadastralLandCategory: { __typename?: 'CadastralLandCategoryQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseCadastralLandCategoryInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentCadastralLandCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCadastralLandCategoryInternalCodeQuery = {
  __typename?: 'Query';
  cadastralLandCategory: { __typename?: 'CadastralLandCategoryQueries'; canUseInternalCode: boolean };
};

export type ExportCadastralLandCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CadastralLandCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CadastralLandCategorySortInput> | Types.CadastralLandCategorySortInput>;
}>;

export type ExportCadastralLandCategoriesQuery = {
  __typename?: 'Query';
  cadastralLandCategory: {
    __typename?: 'CadastralLandCategoryQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetCadastralLandCategoriesDocument = gql`
  query getCadastralLandCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CadastralLandCategoryFilterInput
    $order: [CadastralLandCategorySortInput!]
  ) {
    cadastralLandCategory {
      cadastralLandCategories(
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
          ...CadastralLandCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CadastralLandCategoryFragmentDoc}
`;

export function useGetCadastralLandCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCadastralLandCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCadastralLandCategoriesQuery, GetCadastralLandCategoriesQueryVariables>({
    query: GetCadastralLandCategoriesDocument,
    ...options,
  });
}
export const AddCadastralLandCategoryDocument = gql`
  mutation addCadastralLandCategory($input: CadastralLandCategoryInput!) {
    cadastralLandCategory {
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

export function useAddCadastralLandCategoryMutation() {
  return Urql.useMutation<AddCadastralLandCategoryMutation, AddCadastralLandCategoryMutationVariables>(
    AddCadastralLandCategoryDocument,
  );
}
export const UpdateCadastralLandCategoryDocument = gql`
  mutation updateCadastralLandCategory($cadastralLandCategoryId: Int!, $input: CadastralLandCategoryInput!) {
    cadastralLandCategory {
      update(id: $cadastralLandCategoryId, input: $input) {
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

export function useUpdateCadastralLandCategoryMutation() {
  return Urql.useMutation<UpdateCadastralLandCategoryMutation, UpdateCadastralLandCategoryMutationVariables>(
    UpdateCadastralLandCategoryDocument,
  );
}
export const DeleteCadastralLandCategoriesDocument = gql`
  mutation deleteCadastralLandCategories($ids: [Int!]!) {
    cadastralLandCategory {
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

export function useDeleteCadastralLandCategoriesMutation() {
  return Urql.useMutation<DeleteCadastralLandCategoriesMutation, DeleteCadastralLandCategoriesMutationVariables>(
    DeleteCadastralLandCategoriesDocument,
  );
}
export const GetCadastralLandCategoryInternalCodeDocument = gql`
  query getCadastralLandCategoryInternalCode {
    cadastralLandCategory {
      proposeNewInternalCode
    }
  }
`;

export function useGetCadastralLandCategoryInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetCadastralLandCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCadastralLandCategoryInternalCodeQuery, GetCadastralLandCategoryInternalCodeQueryVariables>({
    query: GetCadastralLandCategoryInternalCodeDocument,
    ...options,
  });
}
export const CanUseCadastralLandCategoryInternalCodeDocument = gql`
  query canUseCadastralLandCategoryInternalCode($internalCode: String!, $currentCadastralLandCategoryId: Int) {
    cadastralLandCategory {
      canUseInternalCode(internalCode: $internalCode, currentCadastralLandCategoryId: $currentCadastralLandCategoryId)
    }
  }
`;

export function useCanUseCadastralLandCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCadastralLandCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUseCadastralLandCategoryInternalCodeQuery,
    CanUseCadastralLandCategoryInternalCodeQueryVariables
  >({ query: CanUseCadastralLandCategoryInternalCodeDocument, ...options });
}
export const ExportCadastralLandCategoriesDocument = gql`
  query exportCadastralLandCategories(
    $where: CadastralLandCategoryFilterInput
    $order: [CadastralLandCategorySortInput!]
  ) {
    cadastralLandCategory {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCadastralLandCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportCadastralLandCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportCadastralLandCategoriesQuery, ExportCadastralLandCategoriesQueryVariables>({
    query: ExportCadastralLandCategoriesDocument,
    ...options,
  });
}

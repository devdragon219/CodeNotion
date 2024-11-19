// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCraftsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CraftFilterInput>;
  order?: Types.InputMaybe<Array<Types.CraftSortInput> | Types.CraftSortInput>;
}>;

export type GetCraftsQuery = {
  __typename?: 'Query';
  craft: {
    __typename?: 'CraftQueries';
    listCrafts?: {
      __typename?: 'ListCraftsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number }> | null;
    } | null;
  };
};

export type AddCraftMutationVariables = Types.Exact<{
  input: Types.CraftInput;
}>;

export type AddCraftMutation = {
  __typename?: 'Mutation';
  craft: {
    __typename?: 'CraftMutations';
    add: {
      __typename?: 'ResultOfCraft';
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

export type UpdateCraftMutationVariables = Types.Exact<{
  craftId: Types.Scalars['Int']['input'];
  input: Types.CraftInput;
}>;

export type UpdateCraftMutation = {
  __typename?: 'Mutation';
  craft: {
    __typename?: 'CraftMutations';
    update: {
      __typename?: 'ResultOfCraft';
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

export type DeleteCraftsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCraftsMutation = {
  __typename?: 'Mutation';
  craft: {
    __typename?: 'CraftMutations';
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

export type GetCraftInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCraftInternalCodeQuery = {
  __typename?: 'Query';
  craft: { __typename?: 'CraftQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseCraftInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentCraftId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCraftInternalCodeQuery = {
  __typename?: 'Query';
  craft: { __typename?: 'CraftQueries'; canUseInternalCode: boolean };
};

export type ExportCraftsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CraftFilterInput>;
  order?: Types.InputMaybe<Array<Types.CraftSortInput> | Types.CraftSortInput>;
}>;

export type ExportCraftsQuery = {
  __typename?: 'Query';
  craft: { __typename?: 'CraftQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export const GetCraftsDocument = gql`
  query getCrafts(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CraftFilterInput
    $order: [CraftSortInput!]
  ) {
    craft {
      listCrafts(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CraftFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CraftFragmentDoc}
`;

export function useGetCraftsQuery(options?: Omit<Urql.UseQueryArgs<GetCraftsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCraftsQuery, GetCraftsQueryVariables>({ query: GetCraftsDocument, ...options });
}
export const AddCraftDocument = gql`
  mutation addCraft($input: CraftInput!) {
    craft {
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

export function useAddCraftMutation() {
  return Urql.useMutation<AddCraftMutation, AddCraftMutationVariables>(AddCraftDocument);
}
export const UpdateCraftDocument = gql`
  mutation updateCraft($craftId: Int!, $input: CraftInput!) {
    craft {
      update(id: $craftId, input: $input) {
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

export function useUpdateCraftMutation() {
  return Urql.useMutation<UpdateCraftMutation, UpdateCraftMutationVariables>(UpdateCraftDocument);
}
export const DeleteCraftsDocument = gql`
  mutation deleteCrafts($ids: [Int!]!) {
    craft {
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

export function useDeleteCraftsMutation() {
  return Urql.useMutation<DeleteCraftsMutation, DeleteCraftsMutationVariables>(DeleteCraftsDocument);
}
export const GetCraftInternalCodeDocument = gql`
  query getCraftInternalCode {
    craft {
      proposeNewInternalCode
    }
  }
`;

export function useGetCraftInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetCraftInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCraftInternalCodeQuery, GetCraftInternalCodeQueryVariables>({
    query: GetCraftInternalCodeDocument,
    ...options,
  });
}
export const CanUseCraftInternalCodeDocument = gql`
  query canUseCraftInternalCode($internalCode: String!, $currentCraftId: Int) {
    craft {
      canUseInternalCode(internalCode: $internalCode, currentCraftId: $currentCraftId)
    }
  }
`;

export function useCanUseCraftInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCraftInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseCraftInternalCodeQuery, CanUseCraftInternalCodeQueryVariables>({
    query: CanUseCraftInternalCodeDocument,
    ...options,
  });
}
export const ExportCraftsDocument = gql`
  query exportCrafts($where: CraftFilterInput, $order: [CraftSortInput!]) {
    craft {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCraftsQuery(options?: Omit<Urql.UseQueryArgs<ExportCraftsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportCraftsQuery, ExportCraftsQueryVariables>({ query: ExportCraftsDocument, ...options });
}

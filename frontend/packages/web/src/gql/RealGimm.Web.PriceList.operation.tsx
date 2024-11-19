// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PriceListDetailFragmentDoc, PriceListFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetPriceListsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.PriceListFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListSortInput> | Types.PriceListSortInput>;
}>;

export type GetPriceListsQuery = {
  __typename?: 'Query';
  priceList: {
    __typename?: 'PriceListQueries';
    listPriceLists?: {
      __typename?: 'ListPriceListsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'PriceList';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      }> | null;
    } | null;
  };
};

export type AddPriceListMutationVariables = Types.Exact<{
  input: Types.PriceListInput;
}>;

export type AddPriceListMutation = {
  __typename?: 'Mutation';
  priceList: {
    __typename?: 'PriceListMutations';
    add: {
      __typename?: 'ResultOfPriceList';
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

export type UpdatePriceListMutationVariables = Types.Exact<{
  priceListId: Types.Scalars['Int']['input'];
  input: Types.PriceListInput;
}>;

export type UpdatePriceListMutation = {
  __typename?: 'Mutation';
  priceList: {
    __typename?: 'PriceListMutations';
    update: {
      __typename?: 'ResultOfPriceList';
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

export type DeletePriceListsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeletePriceListsMutation = {
  __typename?: 'Mutation';
  priceList: {
    __typename?: 'PriceListMutations';
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

export type GetPriceListInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPriceListInternalCodeQuery = {
  __typename?: 'Query';
  priceList: { __typename?: 'PriceListQueries'; proposeNewInternalCode?: string | null };
};

export type CanUsePriceListInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentPriceListId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUsePriceListInternalCodeQuery = {
  __typename?: 'Query';
  priceList: { __typename?: 'PriceListQueries'; canUseInternalCode: boolean };
};

export type ExportPriceListsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PriceListFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListSortInput> | Types.PriceListSortInput>;
}>;

export type ExportPriceListsQuery = {
  __typename?: 'Query';
  priceList: { __typename?: 'PriceListQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetPriceListQueryVariables = Types.Exact<{
  priceListId: Types.Scalars['Int']['input'];
}>;

export type GetPriceListQuery = {
  __typename?: 'Query';
  priceList: {
    __typename?: 'PriceListQueries';
    get?: {
      __typename?: 'PriceList';
      internalCode: string;
      name: string;
      ordering: number;
      isDefault: boolean;
      id: number;
    } | null;
  };
};

export type DeletePriceListMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeletePriceListMutation = {
  __typename?: 'Mutation';
  priceList: {
    __typename?: 'PriceListMutations';
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

export type GetAllPriceListsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PriceListFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListSortInput> | Types.PriceListSortInput>;
}>;

export type GetAllPriceListsQuery = {
  __typename?: 'Query';
  priceList: {
    __typename?: 'PriceListQueries';
    listPriceListsFull: Array<{
      __typename?: 'PriceList';
      internalCode: string;
      name: string;
      ordering: number;
      id: number;
    }>;
  };
};

export const GetPriceListsDocument = gql`
  query getPriceLists(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: PriceListFilterInput
    $order: [PriceListSortInput!]
  ) {
    priceList {
      listPriceLists(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...PriceListFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${PriceListFragmentDoc}
`;

export function useGetPriceListsQuery(options?: Omit<Urql.UseQueryArgs<GetPriceListsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPriceListsQuery, GetPriceListsQueryVariables>({ query: GetPriceListsDocument, ...options });
}
export const AddPriceListDocument = gql`
  mutation addPriceList($input: PriceListInput!) {
    priceList {
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

export function useAddPriceListMutation() {
  return Urql.useMutation<AddPriceListMutation, AddPriceListMutationVariables>(AddPriceListDocument);
}
export const UpdatePriceListDocument = gql`
  mutation updatePriceList($priceListId: Int!, $input: PriceListInput!) {
    priceList {
      update(id: $priceListId, input: $input) {
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

export function useUpdatePriceListMutation() {
  return Urql.useMutation<UpdatePriceListMutation, UpdatePriceListMutationVariables>(UpdatePriceListDocument);
}
export const DeletePriceListsDocument = gql`
  mutation deletePriceLists($ids: [Int!]!) {
    priceList {
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

export function useDeletePriceListsMutation() {
  return Urql.useMutation<DeletePriceListsMutation, DeletePriceListsMutationVariables>(DeletePriceListsDocument);
}
export const GetPriceListInternalCodeDocument = gql`
  query getPriceListInternalCode {
    priceList {
      proposeNewInternalCode
    }
  }
`;

export function useGetPriceListInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPriceListInternalCodeQuery, GetPriceListInternalCodeQueryVariables>({
    query: GetPriceListInternalCodeDocument,
    ...options,
  });
}
export const CanUsePriceListInternalCodeDocument = gql`
  query canUsePriceListInternalCode($internalCode: String!, $currentPriceListId: Int) {
    priceList {
      canUseInternalCode(internalCode: $internalCode, currentPriceListId: $currentPriceListId)
    }
  }
`;

export function useCanUsePriceListInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUsePriceListInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUsePriceListInternalCodeQuery, CanUsePriceListInternalCodeQueryVariables>({
    query: CanUsePriceListInternalCodeDocument,
    ...options,
  });
}
export const ExportPriceListsDocument = gql`
  query exportPriceLists($where: PriceListFilterInput, $order: [PriceListSortInput!]) {
    priceList {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportPriceListsQuery(options?: Omit<Urql.UseQueryArgs<ExportPriceListsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportPriceListsQuery, ExportPriceListsQueryVariables>({
    query: ExportPriceListsDocument,
    ...options,
  });
}
export const GetPriceListDocument = gql`
  query getPriceList($priceListId: Int!) {
    priceList {
      get(id: $priceListId) {
        ...PriceListDetailFragment
      }
    }
  }
  ${PriceListDetailFragmentDoc}
`;

export function useGetPriceListQuery(options: Omit<Urql.UseQueryArgs<GetPriceListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPriceListQuery, GetPriceListQueryVariables>({ query: GetPriceListDocument, ...options });
}
export const DeletePriceListDocument = gql`
  mutation deletePriceList($id: Int!) {
    priceList {
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

export function useDeletePriceListMutation() {
  return Urql.useMutation<DeletePriceListMutation, DeletePriceListMutationVariables>(DeletePriceListDocument);
}
export const GetAllPriceListsDocument = gql`
  query getAllPriceLists($where: PriceListFilterInput, $order: [PriceListSortInput!]) {
    priceList {
      listPriceListsFull(where: $where, order: $order) {
        ...PriceListFragment
      }
    }
  }
  ${PriceListFragmentDoc}
`;

export function useGetAllPriceListsQuery(options?: Omit<Urql.UseQueryArgs<GetAllPriceListsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllPriceListsQuery, GetAllPriceListsQueryVariables>({
    query: GetAllPriceListsDocument,
    ...options,
  });
}

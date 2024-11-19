// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetAccountingItemsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AccountingItemFilterInput>;
  order?: Types.InputMaybe<Array<Types.AccountingItemSortInput> | Types.AccountingItemSortInput>;
}>;

export type GetAccountingItemsQuery = {
  __typename?: 'Query';
  accountingItem: {
    __typename?: 'AccountingItemQueries';
    listAccountingTypes?: {
      __typename?: 'ListAccountingTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AccountingItem';
        id: number;
        description: string;
        internalCode: string;
        externalCode: string;
      }> | null;
    } | null;
  };
};

export type AddAccountingItemMutationVariables = Types.Exact<{
  input: Types.AccountingItemInput;
}>;

export type AddAccountingItemMutation = {
  __typename?: 'Mutation';
  accountingItem: {
    __typename?: 'AccountingItemMutations';
    add: {
      __typename?: 'ResultOfAccountingItem';
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

export type UpdateAccountingItemMutationVariables = Types.Exact<{
  accountingItemId: Types.Scalars['Int']['input'];
  input: Types.AccountingItemInput;
}>;

export type UpdateAccountingItemMutation = {
  __typename?: 'Mutation';
  accountingItem: {
    __typename?: 'AccountingItemMutations';
    update: {
      __typename?: 'ResultOfAccountingItem';
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

export type DeleteAccountingItemsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteAccountingItemsMutation = {
  __typename?: 'Mutation';
  accountingItem: {
    __typename?: 'AccountingItemMutations';
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

export type ExportAccountingItemsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AccountingItemFilterInput>;
  order?: Types.InputMaybe<Array<Types.AccountingItemSortInput> | Types.AccountingItemSortInput>;
}>;

export type ExportAccountingItemsQuery = {
  __typename?: 'Query';
  accountingItem: {
    __typename?: 'AccountingItemQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetAccountingItemInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAccountingItemInternalCodeQuery = {
  __typename?: 'Query';
  accountingItem: { __typename?: 'AccountingItemQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseAccountingItemInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentAccountingItemId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseAccountingItemInternalCodeQuery = {
  __typename?: 'Query';
  accountingItem: { __typename?: 'AccountingItemQueries'; canUseInternalCode: boolean };
};

export const GetAccountingItemsDocument = gql`
  query getAccountingItems(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AccountingItemFilterInput
    $order: [AccountingItemSortInput!]
  ) {
    accountingItem {
      listAccountingTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...AccountingItemFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AccountingItemFragmentDoc}
`;

export function useGetAccountingItemsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAccountingItemsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAccountingItemsQuery, GetAccountingItemsQueryVariables>({
    query: GetAccountingItemsDocument,
    ...options,
  });
}
export const AddAccountingItemDocument = gql`
  mutation addAccountingItem($input: AccountingItemInput!) {
    accountingItem {
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

export function useAddAccountingItemMutation() {
  return Urql.useMutation<AddAccountingItemMutation, AddAccountingItemMutationVariables>(AddAccountingItemDocument);
}
export const UpdateAccountingItemDocument = gql`
  mutation updateAccountingItem($accountingItemId: Int!, $input: AccountingItemInput!) {
    accountingItem {
      update(id: $accountingItemId, input: $input) {
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

export function useUpdateAccountingItemMutation() {
  return Urql.useMutation<UpdateAccountingItemMutation, UpdateAccountingItemMutationVariables>(
    UpdateAccountingItemDocument,
  );
}
export const DeleteAccountingItemsDocument = gql`
  mutation deleteAccountingItems($ids: [Int!]!) {
    accountingItem {
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

export function useDeleteAccountingItemsMutation() {
  return Urql.useMutation<DeleteAccountingItemsMutation, DeleteAccountingItemsMutationVariables>(
    DeleteAccountingItemsDocument,
  );
}
export const ExportAccountingItemsDocument = gql`
  query exportAccountingItems($where: AccountingItemFilterInput, $order: [AccountingItemSortInput!]) {
    accountingItem {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportAccountingItemsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportAccountingItemsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportAccountingItemsQuery, ExportAccountingItemsQueryVariables>({
    query: ExportAccountingItemsDocument,
    ...options,
  });
}
export const GetAccountingItemInternalCodeDocument = gql`
  query getAccountingItemInternalCode {
    accountingItem {
      proposeNewInternalCode
    }
  }
`;

export function useGetAccountingItemInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetAccountingItemInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAccountingItemInternalCodeQuery, GetAccountingItemInternalCodeQueryVariables>({
    query: GetAccountingItemInternalCodeDocument,
    ...options,
  });
}
export const CanUseAccountingItemInternalCodeDocument = gql`
  query canUseAccountingItemInternalCode($internalCode: String!, $currentAccountingItemId: Int) {
    accountingItem {
      canUseInternalCode(internalCode: $internalCode, currentAccountingItemId: $currentAccountingItemId)
    }
  }
`;

export function useCanUseAccountingItemInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseAccountingItemInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseAccountingItemInternalCodeQuery, CanUseAccountingItemInternalCodeQueryVariables>({
    query: CanUseAccountingItemInternalCodeDocument,
    ...options,
  });
}

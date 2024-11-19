// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { GroupDetailFragmentDoc, GroupFragmentDoc } from './RealGimm.Web.Group.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { GroupPermissionSummaryFragmentDoc } from './RealGimm.Web.PermissionSummary.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetGroupsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.GroupFilterInput>;
  order?: Types.InputMaybe<Array<Types.GroupSortInput> | Types.GroupSortInput>;
}>;

export type GetGroupsQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    listGroup?: {
      __typename?: 'ListGroupConnection';
      totalCount: number;
      nodes?: Array<{ __typename?: 'Group'; id: number; name: string; description?: string | null }> | null;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
    } | null;
  };
};

export type GetGroupQueryVariables = Types.Exact<{
  groupId: Types.Scalars['Int']['input'];
}>;

export type GetGroupQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    group?: {
      __typename?: 'Group';
      id: number;
      name: string;
      description?: string | null;
      permissionSummary: Array<{
        __typename?: 'PermissionSummary';
        feature: string;
        canCreate: boolean;
        canRead: boolean;
        canUpdate: boolean;
        canDelete: boolean;
      }>;
    } | null;
  };
};

export type GetGroupsPermissionsQueryVariables = Types.Exact<{
  groupIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type GetGroupsPermissionsQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    groupPermissions: Array<{
      __typename?: 'PermissionSummary';
      feature: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    }>;
  };
};

export type ExportGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupFilterInput>;
  order?: Types.InputMaybe<Array<Types.GroupSortInput> | Types.GroupSortInput>;
}>;

export type ExportGroupsQuery = {
  __typename?: 'Query';
  admin: { __typename?: 'AdminQueries'; exportGroupsToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type CreateGroupMutationVariables = Types.Exact<{
  groupInput: Types.AdminGroupInput;
}>;

export type CreateGroupMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    addGroup: {
      __typename?: 'ResultOfGroup';
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

export type UpdateGroupMutationVariables = Types.Exact<{
  groupId: Types.Scalars['Int']['input'];
  groupInput: Types.AdminGroupInput;
}>;

export type UpdateGroupMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    updateGroup: {
      __typename?: 'ResultOfGroup';
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

export type DeleteGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteGroupMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    deleteGroup: {
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

export type DeleteGroupsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteGroupsMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    deleteGroupsByIds: {
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

export const GetGroupsDocument = gql`
  query getGroups(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: GroupFilterInput
    $order: [GroupSortInput!]
  ) {
    admin {
      listGroup(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        nodes {
          ...GroupFragment
        }
        pageInfo {
          ...PageInfoFragment
        }
        totalCount
      }
    }
  }
  ${GroupFragmentDoc}
  ${PageInfoFragmentDoc}
`;

export function useGetGroupsQuery(options?: Omit<Urql.UseQueryArgs<GetGroupsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGroupsQuery, GetGroupsQueryVariables>({ query: GetGroupsDocument, ...options });
}
export const GetGroupDocument = gql`
  query getGroup($groupId: Int!) {
    admin {
      group(groupId: $groupId) {
        ...GroupDetailFragment
      }
    }
  }
  ${GroupDetailFragmentDoc}
  ${GroupPermissionSummaryFragmentDoc}
`;

export function useGetGroupQuery(options: Omit<Urql.UseQueryArgs<GetGroupQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGroupQuery, GetGroupQueryVariables>({ query: GetGroupDocument, ...options });
}
export const GetGroupsPermissionsDocument = gql`
  query getGroupsPermissions($groupIds: [Int!]!) {
    admin {
      groupPermissions(groupIds: $groupIds) {
        ...GroupPermissionSummaryFragment
      }
    }
  }
  ${GroupPermissionSummaryFragmentDoc}
`;

export function useGetGroupsPermissionsQuery(
  options: Omit<Urql.UseQueryArgs<GetGroupsPermissionsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGroupsPermissionsQuery, GetGroupsPermissionsQueryVariables>({
    query: GetGroupsPermissionsDocument,
    ...options,
  });
}
export const ExportGroupsDocument = gql`
  query exportGroups($where: GroupFilterInput, $order: [GroupSortInput!]) {
    admin {
      exportGroupsToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportGroupsQuery(options?: Omit<Urql.UseQueryArgs<ExportGroupsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportGroupsQuery, ExportGroupsQueryVariables>({ query: ExportGroupsDocument, ...options });
}
export const CreateGroupDocument = gql`
  mutation createGroup($groupInput: AdminGroupInput!) {
    admin {
      addGroup(groupInput: $groupInput) {
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

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
}
export const UpdateGroupDocument = gql`
  mutation updateGroup($groupId: Int!, $groupInput: AdminGroupInput!) {
    admin {
      updateGroup(groupId: $groupId, groupInput: $groupInput) {
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

export function useUpdateGroupMutation() {
  return Urql.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument);
}
export const DeleteGroupDocument = gql`
  mutation deleteGroup($id: Int!) {
    admin {
      deleteGroup(groupId: $id) {
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

export function useDeleteGroupMutation() {
  return Urql.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument);
}
export const DeleteGroupsDocument = gql`
  mutation deleteGroups($ids: [Int!]!) {
    admin {
      deleteGroupsByIds(groupsIds: $ids) {
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

export function useDeleteGroupsMutation() {
  return Urql.useMutation<DeleteGroupsMutation, DeleteGroupsMutationVariables>(DeleteGroupsDocument);
}

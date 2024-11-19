// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { GroupDetailFragmentDoc } from './RealGimm.Web.Group.fragment';
import { UserContactFragmentDoc } from './RealGimm.Web.IAMContact.fragment';
import { OrgUnitFragmentDoc } from './RealGimm.Web.OrgUnit.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { GroupPermissionSummaryFragmentDoc } from './RealGimm.Web.PermissionSummary.fragment';
import { SessionFragmentDoc } from './RealGimm.Web.Session.fragment';
import { UserDetailFragmentDoc, UserFragmentDoc } from './RealGimm.Web.User.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetUsersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UserFilterInput>;
  order?: Types.InputMaybe<Array<Types.UserSortInput> | Types.UserSortInput>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    listUsers?: {
      __typename?: 'ListUsersConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'User';
        id: number;
        firstName?: string | null;
        lastName?: string | null;
        userName: string;
        status: Types.UserStatus;
        type: Types.UserType;
        officeAccess: Types.OfficeAccess;
        managementSubjects: Array<
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string }
        >;
        groups: Array<{ __typename?: 'Group'; id: number; name: string }>;
      }> | null;
    } | null;
  };
};

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    user?: {
      __typename?: 'User';
      id: number;
      firstName?: string | null;
      lastName?: string | null;
      userName: string;
      type: Types.UserType;
      officeAccess: Types.OfficeAccess;
      status: Types.UserStatus;
      enabledSince?: string | null;
      ceasedDate?: string | null;
      lockedSince?: string | null;
      suspensionReason?: string | null;
      supplierSubject?:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string }
        | null;
      groups: Array<{
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
      }>;
      managementSubjects: Array<
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string }
      >;
      managementOrgUnits: Array<{
        __typename?: 'OrgUnit';
        id: number;
        name?: string | null;
        internalCode: string;
        externalCode?: string | null;
        entryStatus: Types.EntryStatus;
        closureDate?: string | null;
        orgUnitType: Types.OrgUnitType;
        cities: Array<{
          __typename?: 'City';
          guid: string;
          id: number;
          name: string;
          countyName?: string | null;
          countryName?: string | null;
          countryISO: string;
          cadastralCode?: string | null;
        }>;
        parentSubject:
          | {
              __typename: 'LegalSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              } | null;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            }
          | {
              __typename: 'ManagementSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              companyGroupParent?: {
                __typename?: 'SubjectRelation';
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              } | null;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            }
          | {
              __typename: 'PhysicalSubject';
              name: string;
              id: number;
              personType: Types.PersonType;
              relationSubordinates: Array<{
                __typename?: 'SubjectRelation';
                relationType: Types.SubjectRelationType;
                main:
                  | { __typename?: 'LegalSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'ManagementSubject'; name: string; id: number; personType: Types.PersonType }
                  | { __typename?: 'PhysicalSubject'; name: string; id: number; personType: Types.PersonType };
              }>;
            };
        parentOrgUnit?: {
          __typename?: 'OrgUnit';
          id: number;
          name?: string | null;
          orgUnitType: Types.OrgUnitType;
        } | null;
        contacts: Array<{
          __typename?: 'Contact';
          id: number;
          contactInfo?: string | null;
          contactInfoType: Types.ContactInfoType;
          contactType: Types.ContactType;
        }>;
      }>;
      contacts: Array<{
        __typename?: 'IAMContact';
        id: number;
        contactInfoType: Types.ContactInfoType;
        contactInfo?: string | null;
        contactType: Types.ContactType;
      }>;
    } | null;
  };
};

export type ExportUsersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UserFilterInput>;
  order?: Types.InputMaybe<Array<Types.UserSortInput> | Types.UserSortInput>;
}>;

export type ExportUsersQuery = {
  __typename?: 'Query';
  admin: { __typename?: 'AdminQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type CreateUserMutationVariables = Types.Exact<{
  userInput: Types.AdminUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    addUser: {
      __typename?: 'ResultOfUser';
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

export type UpdateUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  userInput: Types.AdminUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    updateUser: {
      __typename?: 'ResultOfUser';
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

export type DeleteUserMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    deleteUser: {
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

export type DeleteUsersMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteUsersMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    deleteByIds: {
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

export type GetUserSessionsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;

export type GetUserSessionsQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    user?: {
      __typename?: 'User';
      sessions: Array<{
        __typename?: 'Session';
        id: number;
        loginUserAgent?: string | null;
        loginIPAddress?: string | null;
        loginLocation?: string | null;
        creationDate: string;
        refreshTokenExpiration: string;
      }>;
    } | null;
  };
};

export type RevokeUserSessionMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  sessionId: Types.Scalars['Int']['input'];
}>;

export type RevokeUserSessionMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    revokeSession: {
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

export type RevokeAllUserSessionsMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;

export type RevokeAllUserSessionsMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    revokeAllSessions: {
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

export type CanUseUsernameQueryVariables = Types.Exact<{
  userName: Types.Scalars['String']['input'];
  currentUserId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseUsernameQuery = {
  __typename?: 'Query';
  admin: { __typename?: 'AdminQueries'; canUseUsername: boolean };
};

export const GetUsersDocument = gql`
  query getUsers(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    admin {
      listUsers(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...UserFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UserFragmentDoc}
`;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
}
export const GetUserDocument = gql`
  query getUser($userId: Int!) {
    admin {
      user(userId: $userId) {
        ...UserDetailFragment
      }
    }
  }
  ${UserDetailFragmentDoc}
  ${GroupDetailFragmentDoc}
  ${GroupPermissionSummaryFragmentDoc}
  ${OrgUnitFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${UserContactFragmentDoc}
`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
}
export const ExportUsersDocument = gql`
  query exportUsers($where: UserFilterInput, $order: [UserSortInput!]) {
    admin {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportUsersQuery(options?: Omit<Urql.UseQueryArgs<ExportUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportUsersQuery, ExportUsersQueryVariables>({ query: ExportUsersDocument, ...options });
}
export const CreateUserDocument = gql`
  mutation createUser($userInput: AdminUserInput!) {
    admin {
      addUser(userInput: $userInput) {
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

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
}
export const UpdateUserDocument = gql`
  mutation updateUser($userId: Int!, $userInput: AdminUserInput!) {
    admin {
      updateUser(userId: $userId, userInput: $userInput) {
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

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
}
export const DeleteUserDocument = gql`
  mutation deleteUser($id: Int!) {
    admin {
      deleteUser(userId: $id) {
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

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
}
export const DeleteUsersDocument = gql`
  mutation deleteUsers($ids: [Int!]!) {
    admin {
      deleteByIds(userIds: $ids) {
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

export function useDeleteUsersMutation() {
  return Urql.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(DeleteUsersDocument);
}
export const GetUserSessionsDocument = gql`
  query getUserSessions($userId: Int!) {
    admin {
      user(userId: $userId) {
        sessions {
          ...SessionFragment
        }
      }
    }
  }
  ${SessionFragmentDoc}
`;

export function useGetUserSessionsQuery(options: Omit<Urql.UseQueryArgs<GetUserSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserSessionsQuery, GetUserSessionsQueryVariables>({
    query: GetUserSessionsDocument,
    ...options,
  });
}
export const RevokeUserSessionDocument = gql`
  mutation revokeUserSession($userId: Int!, $sessionId: Int!) {
    admin {
      revokeSession(userId: $userId, sessionId: $sessionId) {
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

export function useRevokeUserSessionMutation() {
  return Urql.useMutation<RevokeUserSessionMutation, RevokeUserSessionMutationVariables>(RevokeUserSessionDocument);
}
export const RevokeAllUserSessionsDocument = gql`
  mutation revokeAllUserSessions($userId: Int!) {
    admin {
      revokeAllSessions(userId: $userId) {
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

export function useRevokeAllUserSessionsMutation() {
  return Urql.useMutation<RevokeAllUserSessionsMutation, RevokeAllUserSessionsMutationVariables>(
    RevokeAllUserSessionsDocument,
  );
}
export const CanUseUsernameDocument = gql`
  query canUseUsername($userName: String!, $currentUserId: Int) {
    admin {
      canUseUsername(userName: $userName, currentUserId: $currentUserId)
    }
  }
`;

export function useCanUseUsernameQuery(options: Omit<Urql.UseQueryArgs<CanUseUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<CanUseUsernameQuery, CanUseUsernameQueryVariables>({
    query: CanUseUsernameDocument,
    ...options,
  });
}

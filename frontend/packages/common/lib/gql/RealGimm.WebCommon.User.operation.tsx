// @ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { LoginResultFragmentDoc } from './RealGimm.WebCommon.LoginResult.fragment';
import { UserProfileFragmentDoc } from './RealGimm.WebCommon.User.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.WebCommon.ValidationError.fragment';
import * as Types from './types';

export type SwitchTenantMutationVariables = Types.Exact<{
  input: Types.SwitchTenantInput;
}>;

export type SwitchTenantMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
    switchTenant?: {
      __typename?: 'LoginResult';
      jwt: string;
      refreshToken?: string | null;
      user: { __typename?: 'UserModel'; username: string };
    } | null;
  };
};

export type ChangePasswordMutationVariables = Types.Exact<{
  input: Types.ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
    changePassword: {
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

export type GetProfileQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetProfileQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserQueries';
    me?: {
      __typename?: 'User';
      id: number;
      firstName?: string | null;
      lastName?: string | null;
      userName: string;
      status: Types.UserStatus;
      enabledSince?: string | null;
      managementSubjects: Array<
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string }
      >;
      contacts: Array<{
        __typename?: 'IAMContact';
        id: number;
        contactType: Types.ContactType;
        contactInfo?: string | null;
        contactInfoType: Types.ContactInfoType;
      }>;
    } | null;
  };
};

export type GetSessionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetSessionsQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserQueries';
    sessions: Array<{
      __typename?: 'Session';
      id: number;
      loginUserAgent?: string | null;
      loginIPAddress?: string | null;
      loginLocation?: string | null;
      creationDate: string;
      refreshTokenExpiration: string;
    }>;
  };
};

export type RevokeSessionMutationVariables = Types.Exact<{
  sessionId: Types.Scalars['Int']['input'];
}>;

export type RevokeSessionMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
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

export type RevokeAllSessionsMutationVariables = Types.Exact<{ [key: string]: never }>;

export type RevokeAllSessionsMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
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

export const SwitchTenantDocument = gql`
  mutation switchTenant($input: SwitchTenantInput!) {
    user {
      switchTenant(input: $input) {
        ...LoginResultFragment
      }
    }
  }
  ${LoginResultFragmentDoc}
`;

export function useSwitchTenantMutation() {
  return Urql.useMutation<SwitchTenantMutation, SwitchTenantMutationVariables>(SwitchTenantDocument);
}
export const ChangePasswordDocument = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    user {
      changePassword(input: $input) {
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

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
}
export const GetProfileDocument = gql`
  query getProfile {
    user {
      me {
        ...UserProfileFragment
      }
    }
  }
  ${UserProfileFragmentDoc}
`;

export function useGetProfileQuery(options?: Omit<Urql.UseQueryArgs<GetProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProfileQuery, GetProfileQueryVariables>({ query: GetProfileDocument, ...options });
}
export const GetSessionsDocument = gql`
  query getSessions {
    user {
      sessions {
        id
        loginUserAgent
        loginIPAddress
        loginLocation
        creationDate
        refreshTokenExpiration
      }
    }
  }
`;

export function useGetSessionsQuery(options?: Omit<Urql.UseQueryArgs<GetSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSessionsQuery, GetSessionsQueryVariables>({ query: GetSessionsDocument, ...options });
}
export const RevokeSessionDocument = gql`
  mutation revokeSession($sessionId: Int!) {
    user {
      revokeSession(sessionId: $sessionId) {
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

export function useRevokeSessionMutation() {
  return Urql.useMutation<RevokeSessionMutation, RevokeSessionMutationVariables>(RevokeSessionDocument);
}
export const RevokeAllSessionsDocument = gql`
  mutation revokeAllSessions {
    user {
      revokeAllSessions {
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

export function useRevokeAllSessionsMutation() {
  return Urql.useMutation<RevokeAllSessionsMutation, RevokeAllSessionsMutationVariables>(RevokeAllSessionsDocument);
}

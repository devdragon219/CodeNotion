// @ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { LoginResultFragmentDoc } from './RealGimm.WebCommon.LoginResult.fragment';
import * as Types from './types';

export type LoginMutationVariables = Types.Exact<{
  credentials: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserLoginMutations';
    login: {
      __typename?: 'LoginResult';
      jwt: string;
      refreshToken?: string | null;
      user: { __typename?: 'UserModel'; username: string };
    };
  };
};

export type LoginWithOidcMutationVariables = Types.Exact<{
  idToken: Types.Scalars['String']['input'];
}>;

export type LoginWithOidcMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserLoginMutations';
    loginOIDC: {
      __typename?: 'LoginResult';
      jwt: string;
      refreshToken?: string | null;
      user: { __typename?: 'UserModel'; username: string };
    };
  };
};

export type RefreshTokenMutationVariables = Types.Exact<{
  accessToken: Types.Scalars['String']['input'];
  refreshToken: Types.Scalars['String']['input'];
}>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserLoginMutations';
    refreshAccessToken: {
      __typename?: 'LoginResult';
      jwt: string;
      refreshToken?: string | null;
      user: { __typename?: 'UserModel'; username: string };
    };
  };
};

export const LoginDocument = gql`
  mutation login($credentials: LoginInput!) {
    login {
      login(input: $credentials) {
        ...LoginResultFragment
      }
    }
  }
  ${LoginResultFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LoginWithOidcDocument = gql`
  mutation loginWithOidc($idToken: String!) {
    login {
      loginOIDC(idToken: $idToken) {
        ...LoginResultFragment
      }
    }
  }
  ${LoginResultFragmentDoc}
`;

export function useLoginWithOidcMutation() {
  return Urql.useMutation<LoginWithOidcMutation, LoginWithOidcMutationVariables>(LoginWithOidcDocument);
}
export const RefreshTokenDocument = gql`
  mutation refreshToken($accessToken: String!, $refreshToken: String!) {
    login {
      refreshAccessToken(accessToken: $accessToken, refreshToken: $refreshToken) {
        ...LoginResultFragment
      }
    }
  }
  ${LoginResultFragmentDoc}
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
}

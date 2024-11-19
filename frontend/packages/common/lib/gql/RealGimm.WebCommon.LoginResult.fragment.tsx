// @ts-nocheck
import gql from 'graphql-tag';

import * as Types from './types';

export type LoginResultFragment = {
  __typename?: 'LoginResult';
  jwt: string;
  refreshToken?: string | null;
  user: { __typename?: 'UserModel'; username: string };
};

export const LoginResultFragmentDoc = gql`
  fragment LoginResultFragment on LoginResult {
    jwt
    refreshToken
    user {
      username
    }
  }
`;

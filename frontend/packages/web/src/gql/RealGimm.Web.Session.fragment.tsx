// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type SessionFragment = {
  __typename?: 'Session';
  id: number;
  loginUserAgent?: string | null;
  loginIPAddress?: string | null;
  loginLocation?: string | null;
  creationDate: string;
  refreshTokenExpiration: string;
};

export const SessionFragmentDoc = gql`
  fragment SessionFragment on Session {
    id
    loginUserAgent
    loginIPAddress
    loginLocation
    creationDate
    refreshTokenExpiration
  }
`;

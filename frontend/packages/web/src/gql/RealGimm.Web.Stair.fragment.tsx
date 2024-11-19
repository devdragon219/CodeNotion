// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type StairFragment = { __typename?: 'Stair'; id: number; description: string };

export const StairFragmentDoc = gql`
  fragment StairFragment on Stair {
    id
    description
  }
`;

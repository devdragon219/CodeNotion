// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CraftFragment = { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number };

export const CraftFragmentDoc = gql`
  fragment CraftFragment on Craft {
    internalCode
    name
    ordering
    id
  }
`;

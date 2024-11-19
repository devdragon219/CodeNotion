// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type FloorFragment = {
  __typename?: 'Floor';
  id: number;
  name: string;
  position: number;
  templateReference: string;
};

export const FloorFragmentDoc = gql`
  fragment FloorFragment on Floor {
    id
    name
    position
    templateReference
  }
`;

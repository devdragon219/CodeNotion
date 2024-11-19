// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type FunctionAreaFragment = {
  __typename?: 'FunctionArea';
  name: string;
  internalCode: string;
  surfaceType: Types.SurfaceType;
  id: number;
};

export const FunctionAreaFragmentDoc = gql`
  fragment FunctionAreaFragment on FunctionArea {
    name
    internalCode
    surfaceType
    id
  }
`;

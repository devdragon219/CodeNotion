// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type InterventionTypeFragment = {
  __typename?: 'InterventionType';
  internalCode: string;
  name: string;
  id: number;
};

export const InterventionTypeFragmentDoc = gql`
  fragment InterventionTypeFragment on InterventionType {
    internalCode
    name
    id
  }
`;

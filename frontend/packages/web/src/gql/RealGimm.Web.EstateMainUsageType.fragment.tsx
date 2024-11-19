// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type MainUsageTypeFragment = {
  __typename?: 'EstateMainUsageType';
  id: number;
  name: string;
  internalCode: string;
  ordering: number;
};

export const MainUsageTypeFragmentDoc = gql`
  fragment MainUsageTypeFragment on EstateMainUsageType {
    id
    name
    internalCode
    ordering
  }
`;

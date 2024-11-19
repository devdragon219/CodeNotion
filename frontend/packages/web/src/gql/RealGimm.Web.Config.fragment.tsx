// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ConfigFragment = {
  __typename?: 'Config';
  id: number;
  function: Types.ConfigFunction;
  name: string;
  value?: string | null;
  lastUpdated: string;
};

export const ConfigFragmentDoc = gql`
  fragment ConfigFragment on Config {
    id
    function
    name
    value
    lastUpdated
  }
`;

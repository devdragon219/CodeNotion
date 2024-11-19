// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ReadingValueFragment = {
  __typename?: 'ReadingValue';
  touRateIndex: number;
  value?: number | null;
  id: number;
};

export const ReadingValueFragmentDoc = gql`
  fragment ReadingValueFragment on ReadingValue {
    touRateIndex
    value
    id
  }
`;

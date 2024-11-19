// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ReadingValueFragmentDoc } from './RealGimm.Web.ReadingValue.fragment';

export type ReadingFragment = {
  __typename?: 'Reading';
  notes?: string | null;
  readingTimestamp: string;
  isEstimated: boolean;
  id: number;
  values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
};

export const ReadingFragmentDoc = gql`
  fragment ReadingFragment on Reading {
    notes
    readingTimestamp
    isEstimated
    values {
      ...ReadingValueFragment
    }
    id
  }
`;

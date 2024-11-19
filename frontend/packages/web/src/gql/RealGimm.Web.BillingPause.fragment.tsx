// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type BillingPauseFragment = {
  __typename?: 'BillingPause';
  since: string;
  until?: string | null;
  notes?: string | null;
  isRecoveryArrears?: boolean | null;
  id: number;
};

export const BillingPauseFragmentDoc = gql`
  fragment BillingPauseFragment on BillingPause {
    since
    until
    notes
    isRecoveryArrears
    id
  }
`;

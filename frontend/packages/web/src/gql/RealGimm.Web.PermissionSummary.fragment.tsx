// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type GroupPermissionSummaryFragment = {
  __typename?: 'PermissionSummary';
  feature: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export const GroupPermissionSummaryFragmentDoc = gql`
  fragment GroupPermissionSummaryFragment on PermissionSummary {
    feature
    canCreate
    canRead
    canUpdate
    canDelete
  }
`;

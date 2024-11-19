// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { GroupPermissionSummaryFragmentDoc } from './RealGimm.Web.PermissionSummary.fragment';

export type GroupFragment = { __typename?: 'Group'; id: number; name: string; description?: string | null };

export type GroupDetailFragment = {
  __typename?: 'Group';
  id: number;
  name: string;
  description?: string | null;
  permissionSummary: Array<{
    __typename?: 'PermissionSummary';
    feature: string;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }>;
};

export const GroupFragmentDoc = gql`
  fragment GroupFragment on Group {
    id
    name
    description
  }
`;
export const GroupDetailFragmentDoc = gql`
  fragment GroupDetailFragment on Group {
    id
    name
    description
    permissionSummary {
      ...GroupPermissionSummaryFragment
    }
  }
`;

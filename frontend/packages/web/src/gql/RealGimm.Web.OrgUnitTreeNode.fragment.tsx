// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type OrgUnitTreeNodeFragment = {
  __typename?: 'OrgUnitTreeNode';
  id: number;
  name?: string | null;
  isSubject: boolean;
  children?: Array<{
    __typename?: 'OrgUnitTreeNode';
    id: number;
    name?: string | null;
    isSubject: boolean;
    children?: Array<{
      __typename?: 'OrgUnitTreeNode';
      id: number;
      name?: string | null;
      isSubject: boolean;
      children?: Array<{ __typename?: 'OrgUnitTreeNode'; id: number; name?: string | null; isSubject: boolean }> | null;
    }> | null;
  }> | null;
};

export const OrgUnitTreeNodeFragmentDoc = gql`
  fragment OrgUnitTreeNodeFragment on OrgUnitTreeNode {
    id
    name
    isSubject
    children {
      id
      name
      isSubject
      children {
        id
        name
        isSubject
        children {
          id
          name
          isSubject
        }
      }
    }
  }
`;

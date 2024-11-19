// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type QualificationLevelFragment = {
  __typename?: 'QualificationLevel';
  internalCode: string;
  name: string;
  ordering: number;
  id: number;
};

export const QualificationLevelFragmentDoc = gql`
  fragment QualificationLevelFragment on QualificationLevel {
    internalCode
    name
    ordering
    id
  }
`;

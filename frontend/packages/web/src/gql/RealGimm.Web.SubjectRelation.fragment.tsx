// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type SubjectRelationFragment = {
  __typename?: 'SubjectRelation';
  since?: string | null;
  until?: string | null;
  groupRelationType?: Types.CompanyGroup | null;
  officerRelationType?: Types.OfficerType | null;
  relationType: Types.SubjectRelationType;
  id: number;
  main:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number };
  subordinate:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number };
};

export const SubjectRelationFragmentDoc = gql`
  fragment SubjectRelationFragment on SubjectRelation {
    main {
      name
      id
    }
    subordinate {
      name
      id
    }
    since
    until
    groupRelationType
    officerRelationType
    relationType
    id
  }
`;

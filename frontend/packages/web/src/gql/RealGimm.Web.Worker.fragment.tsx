// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';

export type WorkerFragment = {
  __typename?: 'Worker';
  id: number;
  firstName: string;
  lastName: string;
  since: string;
  until?: string | null;
  craft: { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number };
  qualificationLevel: {
    __typename?: 'QualificationLevel';
    internalCode: string;
    name: string;
    ordering: number;
    id: number;
  };
};

export const WorkerFragmentDoc = gql`
  fragment WorkerFragment on Worker {
    id
    firstName
    lastName
    since
    until
    craft {
      ...CraftFragment
    }
    qualificationLevel {
      ...QualificationLevelFragment
    }
  }
`;

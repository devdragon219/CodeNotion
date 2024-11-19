// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';
import { WorkerFragmentDoc } from './RealGimm.Web.Worker.fragment';

export type WorkTeamFragment = {
  __typename?: 'WorkTeam';
  internalCode: string;
  description: string;
  insertionDate: string;
  id: number;
  providerSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  leaderUser: { __typename?: 'User'; id: number; firstName?: string | null; lastName?: string | null };
  workers: Array<{
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
  }>;
};

export const WorkTeamFragmentDoc = gql`
  fragment WorkTeamFragment on WorkTeam {
    internalCode
    description
    insertionDate
    id
    providerSubject {
      id
      name
    }
    leaderUser {
      id
      firstName
      lastName
    }
    workers {
      ...WorkerFragment
    }
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { WorkTeamFragmentDoc } from './RealGimm.Web.WorkTeam.fragment';
import { WorkerFragmentDoc } from './RealGimm.Web.Worker.fragment';

export type GetWorkTeamsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.WorkTeamFilterInput>;
  order?: Types.InputMaybe<Array<Types.WorkTeamSortInput> | Types.WorkTeamSortInput>;
}>;

export type GetWorkTeamsQuery = {
  __typename?: 'Query';
  workTeam: {
    __typename?: 'WorkTeamQueries';
    listWorkTeams?: {
      __typename?: 'ListWorkTeamsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type AddWorkTeamMutationVariables = Types.Exact<{
  input: Types.WorkTeamInput;
}>;

export type AddWorkTeamMutation = {
  __typename?: 'Mutation';
  workTeam: {
    __typename?: 'WorkTeamMutations';
    add: {
      __typename?: 'ResultOfWorkTeam';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type UpdateWorkTeamMutationVariables = Types.Exact<{
  workTeamId: Types.Scalars['Int']['input'];
  input: Types.WorkTeamInput;
}>;

export type UpdateWorkTeamMutation = {
  __typename?: 'Mutation';
  workTeam: {
    __typename?: 'WorkTeamMutations';
    update: {
      __typename?: 'ResultOfWorkTeam';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type DeleteWorkTeamsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteWorkTeamsMutation = {
  __typename?: 'Mutation';
  workTeam: {
    __typename?: 'WorkTeamMutations';
    deleteRange: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type GetWorkTeamInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetWorkTeamInternalCodeQuery = {
  __typename?: 'Query';
  workTeam: { __typename?: 'WorkTeamQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseWorkTeamInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentWorkTeamId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseWorkTeamInternalCodeQuery = {
  __typename?: 'Query';
  workTeam: { __typename?: 'WorkTeamQueries'; canUseInternalCode: boolean };
};

export type ExportWorkTeamsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkTeamFilterInput>;
  order?: Types.InputMaybe<Array<Types.WorkTeamSortInput> | Types.WorkTeamSortInput>;
}>;

export type ExportWorkTeamsQuery = {
  __typename?: 'Query';
  workTeam: { __typename?: 'WorkTeamQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetWorkTeamQueryVariables = Types.Exact<{
  workTeamId: Types.Scalars['Int']['input'];
}>;

export type GetWorkTeamQuery = {
  __typename?: 'Query';
  workTeam: {
    __typename?: 'WorkTeamQueries';
    get?: {
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
    } | null;
  };
};

export type DeleteWorkTeamMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteWorkTeamMutation = {
  __typename?: 'Mutation';
  workTeam: {
    __typename?: 'WorkTeamMutations';
    delete: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export const GetWorkTeamsDocument = gql`
  query getWorkTeams(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: WorkTeamFilterInput
    $order: [WorkTeamSortInput!]
  ) {
    workTeam {
      listWorkTeams(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...WorkTeamFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${WorkTeamFragmentDoc}
  ${WorkerFragmentDoc}
  ${CraftFragmentDoc}
  ${QualificationLevelFragmentDoc}
`;

export function useGetWorkTeamsQuery(options?: Omit<Urql.UseQueryArgs<GetWorkTeamsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetWorkTeamsQuery, GetWorkTeamsQueryVariables>({ query: GetWorkTeamsDocument, ...options });
}
export const AddWorkTeamDocument = gql`
  mutation addWorkTeam($input: WorkTeamInput!) {
    workTeam {
      add(input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddWorkTeamMutation() {
  return Urql.useMutation<AddWorkTeamMutation, AddWorkTeamMutationVariables>(AddWorkTeamDocument);
}
export const UpdateWorkTeamDocument = gql`
  mutation updateWorkTeam($workTeamId: Int!, $input: WorkTeamInput!) {
    workTeam {
      update(id: $workTeamId, input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateWorkTeamMutation() {
  return Urql.useMutation<UpdateWorkTeamMutation, UpdateWorkTeamMutationVariables>(UpdateWorkTeamDocument);
}
export const DeleteWorkTeamsDocument = gql`
  mutation deleteWorkTeams($ids: [Int!]!) {
    workTeam {
      deleteRange(ids: $ids) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteWorkTeamsMutation() {
  return Urql.useMutation<DeleteWorkTeamsMutation, DeleteWorkTeamsMutationVariables>(DeleteWorkTeamsDocument);
}
export const GetWorkTeamInternalCodeDocument = gql`
  query getWorkTeamInternalCode {
    workTeam {
      proposeNewInternalCode
    }
  }
`;

export function useGetWorkTeamInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetWorkTeamInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetWorkTeamInternalCodeQuery, GetWorkTeamInternalCodeQueryVariables>({
    query: GetWorkTeamInternalCodeDocument,
    ...options,
  });
}
export const CanUseWorkTeamInternalCodeDocument = gql`
  query canUseWorkTeamInternalCode($internalCode: String!, $currentWorkTeamId: Int) {
    workTeam {
      canUseInternalCode(internalCode: $internalCode, currentWorkTeamId: $currentWorkTeamId)
    }
  }
`;

export function useCanUseWorkTeamInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseWorkTeamInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseWorkTeamInternalCodeQuery, CanUseWorkTeamInternalCodeQueryVariables>({
    query: CanUseWorkTeamInternalCodeDocument,
    ...options,
  });
}
export const ExportWorkTeamsDocument = gql`
  query exportWorkTeams($where: WorkTeamFilterInput, $order: [WorkTeamSortInput!]) {
    workTeam {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportWorkTeamsQuery(options?: Omit<Urql.UseQueryArgs<ExportWorkTeamsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportWorkTeamsQuery, ExportWorkTeamsQueryVariables>({
    query: ExportWorkTeamsDocument,
    ...options,
  });
}
export const GetWorkTeamDocument = gql`
  query getWorkTeam($workTeamId: Int!) {
    workTeam {
      get(id: $workTeamId) {
        ...WorkTeamFragment
      }
    }
  }
  ${WorkTeamFragmentDoc}
  ${WorkerFragmentDoc}
  ${CraftFragmentDoc}
  ${QualificationLevelFragmentDoc}
`;

export function useGetWorkTeamQuery(options: Omit<Urql.UseQueryArgs<GetWorkTeamQueryVariables>, 'query'>) {
  return Urql.useQuery<GetWorkTeamQuery, GetWorkTeamQueryVariables>({ query: GetWorkTeamDocument, ...options });
}
export const DeleteWorkTeamDocument = gql`
  mutation deleteWorkTeam($id: Int!) {
    workTeam {
      delete(id: $id) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteWorkTeamMutation() {
  return Urql.useMutation<DeleteWorkTeamMutation, DeleteWorkTeamMutationVariables>(DeleteWorkTeamDocument);
}

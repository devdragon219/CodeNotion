// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetQualificationLevelsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.QualificationLevelFilterInput>;
  order?: Types.InputMaybe<Array<Types.QualificationLevelSortInput> | Types.QualificationLevelSortInput>;
}>;

export type GetQualificationLevelsQuery = {
  __typename?: 'Query';
  qualificationLevel: {
    __typename?: 'QualificationLevelQueries';
    listQualificationLevels?: {
      __typename?: 'ListQualificationLevelsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'QualificationLevel';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      }> | null;
    } | null;
  };
};

export type AddQualificationLevelMutationVariables = Types.Exact<{
  input: Types.QualificationLevelInput;
}>;

export type AddQualificationLevelMutation = {
  __typename?: 'Mutation';
  qualificationLevel: {
    __typename?: 'QualificationLevelMutations';
    add: {
      __typename?: 'ResultOfQualificationLevel';
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

export type UpdateQualificationLevelMutationVariables = Types.Exact<{
  qualificationLevelId: Types.Scalars['Int']['input'];
  input: Types.QualificationLevelInput;
}>;

export type UpdateQualificationLevelMutation = {
  __typename?: 'Mutation';
  qualificationLevel: {
    __typename?: 'QualificationLevelMutations';
    update: {
      __typename?: 'ResultOfQualificationLevel';
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

export type DeleteQualificationLevelsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteQualificationLevelsMutation = {
  __typename?: 'Mutation';
  qualificationLevel: {
    __typename?: 'QualificationLevelMutations';
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

export type GetQualificationLevelInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetQualificationLevelInternalCodeQuery = {
  __typename?: 'Query';
  qualificationLevel: { __typename?: 'QualificationLevelQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseQualificationLevelInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentQualificationLevelId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseQualificationLevelInternalCodeQuery = {
  __typename?: 'Query';
  qualificationLevel: { __typename?: 'QualificationLevelQueries'; canUseInternalCode: boolean };
};

export type ExportQualificationLevelsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.QualificationLevelFilterInput>;
  order?: Types.InputMaybe<Array<Types.QualificationLevelSortInput> | Types.QualificationLevelSortInput>;
}>;

export type ExportQualificationLevelsQuery = {
  __typename?: 'Query';
  qualificationLevel: {
    __typename?: 'QualificationLevelQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetQualificationLevelsDocument = gql`
  query getQualificationLevels(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: QualificationLevelFilterInput
    $order: [QualificationLevelSortInput!]
  ) {
    qualificationLevel {
      listQualificationLevels(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...QualificationLevelFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${QualificationLevelFragmentDoc}
`;

export function useGetQualificationLevelsQuery(
  options?: Omit<Urql.UseQueryArgs<GetQualificationLevelsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQualificationLevelsQuery, GetQualificationLevelsQueryVariables>({
    query: GetQualificationLevelsDocument,
    ...options,
  });
}
export const AddQualificationLevelDocument = gql`
  mutation addQualificationLevel($input: QualificationLevelInput!) {
    qualificationLevel {
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

export function useAddQualificationLevelMutation() {
  return Urql.useMutation<AddQualificationLevelMutation, AddQualificationLevelMutationVariables>(
    AddQualificationLevelDocument,
  );
}
export const UpdateQualificationLevelDocument = gql`
  mutation updateQualificationLevel($qualificationLevelId: Int!, $input: QualificationLevelInput!) {
    qualificationLevel {
      update(id: $qualificationLevelId, input: $input) {
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

export function useUpdateQualificationLevelMutation() {
  return Urql.useMutation<UpdateQualificationLevelMutation, UpdateQualificationLevelMutationVariables>(
    UpdateQualificationLevelDocument,
  );
}
export const DeleteQualificationLevelsDocument = gql`
  mutation deleteQualificationLevels($ids: [Int!]!) {
    qualificationLevel {
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

export function useDeleteQualificationLevelsMutation() {
  return Urql.useMutation<DeleteQualificationLevelsMutation, DeleteQualificationLevelsMutationVariables>(
    DeleteQualificationLevelsDocument,
  );
}
export const GetQualificationLevelInternalCodeDocument = gql`
  query getQualificationLevelInternalCode {
    qualificationLevel {
      proposeNewInternalCode
    }
  }
`;

export function useGetQualificationLevelInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetQualificationLevelInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQualificationLevelInternalCodeQuery, GetQualificationLevelInternalCodeQueryVariables>({
    query: GetQualificationLevelInternalCodeDocument,
    ...options,
  });
}
export const CanUseQualificationLevelInternalCodeDocument = gql`
  query canUseQualificationLevelInternalCode($internalCode: String!, $currentQualificationLevelId: Int) {
    qualificationLevel {
      canUseInternalCode(internalCode: $internalCode, currentQualificationLevelId: $currentQualificationLevelId)
    }
  }
`;

export function useCanUseQualificationLevelInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseQualificationLevelInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseQualificationLevelInternalCodeQuery, CanUseQualificationLevelInternalCodeQueryVariables>({
    query: CanUseQualificationLevelInternalCodeDocument,
    ...options,
  });
}
export const ExportQualificationLevelsDocument = gql`
  query exportQualificationLevels($where: QualificationLevelFilterInput, $order: [QualificationLevelSortInput!]) {
    qualificationLevel {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportQualificationLevelsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportQualificationLevelsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportQualificationLevelsQuery, ExportQualificationLevelsQueryVariables>({
    query: ExportQualificationLevelsDocument,
    ...options,
  });
}

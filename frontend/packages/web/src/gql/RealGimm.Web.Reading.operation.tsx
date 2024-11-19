// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ReadingFragmentDoc } from './RealGimm.Web.Reading.fragment';
import { ReadingValueFragmentDoc } from './RealGimm.Web.ReadingValue.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetReadingsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ReadingFilterInput>;
  order?: Types.InputMaybe<Array<Types.ReadingSortInput> | Types.ReadingSortInput>;
}>;

export type GetReadingsQuery = {
  __typename?: 'Query';
  reading: {
    __typename?: 'ReadingQueries';
    listReadings?: {
      __typename?: 'ListReadingsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'Reading';
        notes?: string | null;
        readingTimestamp: string;
        isEstimated: boolean;
        id: number;
        values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
      }> | null;
    } | null;
  };
};

export type DeleteReadingsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteReadingsMutation = {
  __typename?: 'Mutation';
  reading: {
    __typename?: 'ReadingMutations';
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

export type CreateReadingMutationVariables = Types.Exact<{
  readingInput: Types.ReadingInput;
}>;

export type CreateReadingMutation = {
  __typename?: 'Mutation';
  reading: {
    __typename?: 'ReadingMutations';
    add: {
      __typename?: 'ResultOfReading';
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

export type UpdateReadingMutationVariables = Types.Exact<{
  readingId: Types.Scalars['Int']['input'];
  readingInput: Types.ReadingInput;
}>;

export type UpdateReadingMutation = {
  __typename?: 'Mutation';
  reading: {
    __typename?: 'ReadingMutations';
    update: {
      __typename?: 'ResultOfReading';
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

export const GetReadingsDocument = gql`
  query getReadings(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ReadingFilterInput
    $order: [ReadingSortInput!]
  ) {
    reading {
      listReadings(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...ReadingFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${ReadingFragmentDoc}
  ${ReadingValueFragmentDoc}
`;

export function useGetReadingsQuery(options?: Omit<Urql.UseQueryArgs<GetReadingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReadingsQuery, GetReadingsQueryVariables>({ query: GetReadingsDocument, ...options });
}
export const DeleteReadingsDocument = gql`
  mutation deleteReadings($ids: [Int!]!) {
    reading {
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

export function useDeleteReadingsMutation() {
  return Urql.useMutation<DeleteReadingsMutation, DeleteReadingsMutationVariables>(DeleteReadingsDocument);
}
export const CreateReadingDocument = gql`
  mutation createReading($readingInput: ReadingInput!) {
    reading {
      add(input: $readingInput) {
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

export function useCreateReadingMutation() {
  return Urql.useMutation<CreateReadingMutation, CreateReadingMutationVariables>(CreateReadingDocument);
}
export const UpdateReadingDocument = gql`
  mutation updateReading($readingId: Int!, $readingInput: ReadingInput!) {
    reading {
      update(id: $readingId, input: $readingInput) {
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

export function useUpdateReadingMutation() {
  return Urql.useMutation<UpdateReadingMutation, UpdateReadingMutationVariables>(UpdateReadingDocument);
}

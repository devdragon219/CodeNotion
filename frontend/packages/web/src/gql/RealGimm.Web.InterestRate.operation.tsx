// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { InterestRateFragmentDoc } from './RealGimm.Web.InterestRate.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetInterestRatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.InterestRateFilterInput>;
  order?: Types.InputMaybe<Array<Types.InterestRateSortInput> | Types.InterestRateSortInput>;
}>;

export type GetInterestRatesQuery = {
  __typename?: 'Query';
  interestRate: {
    __typename?: 'InterestRateQueries';
    listInterestRates?: {
      __typename?: 'ListInterestRatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'InterestRate';
        id: number;
        since?: string | null;
        until?: string | null;
        rate: number;
      }> | null;
    } | null;
  };
};

export type AddInterestRateMutationVariables = Types.Exact<{
  input: Types.InterestRateInput;
}>;

export type AddInterestRateMutation = {
  __typename?: 'Mutation';
  interestRate: {
    __typename?: 'InterestRateMutations';
    add: {
      __typename?: 'ResultOfInterestRate';
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

export type UpdateInterestRateMutationVariables = Types.Exact<{
  interestRateId: Types.Scalars['Int']['input'];
  input: Types.InterestRateInput;
}>;

export type UpdateInterestRateMutation = {
  __typename?: 'Mutation';
  interestRate: {
    __typename?: 'InterestRateMutations';
    update: {
      __typename?: 'ResultOfInterestRate';
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

export type DeleteInterestRatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteInterestRatesMutation = {
  __typename?: 'Mutation';
  interestRate: {
    __typename?: 'InterestRateMutations';
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

export type ExportInterestRatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.InterestRateFilterInput>;
  order?: Types.InputMaybe<Array<Types.InterestRateSortInput> | Types.InterestRateSortInput>;
}>;

export type ExportInterestRatesQuery = {
  __typename?: 'Query';
  interestRate: {
    __typename?: 'InterestRateQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetInterestRatesDocument = gql`
  query getInterestRates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: InterestRateFilterInput
    $order: [InterestRateSortInput!]
  ) {
    interestRate {
      listInterestRates(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...InterestRateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${InterestRateFragmentDoc}
`;

export function useGetInterestRatesQuery(options?: Omit<Urql.UseQueryArgs<GetInterestRatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetInterestRatesQuery, GetInterestRatesQueryVariables>({
    query: GetInterestRatesDocument,
    ...options,
  });
}
export const AddInterestRateDocument = gql`
  mutation addInterestRate($input: InterestRateInput!) {
    interestRate {
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

export function useAddInterestRateMutation() {
  return Urql.useMutation<AddInterestRateMutation, AddInterestRateMutationVariables>(AddInterestRateDocument);
}
export const UpdateInterestRateDocument = gql`
  mutation updateInterestRate($interestRateId: Int!, $input: InterestRateInput!) {
    interestRate {
      update(id: $interestRateId, input: $input) {
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

export function useUpdateInterestRateMutation() {
  return Urql.useMutation<UpdateInterestRateMutation, UpdateInterestRateMutationVariables>(UpdateInterestRateDocument);
}
export const DeleteInterestRatesDocument = gql`
  mutation deleteInterestRates($ids: [Int!]!) {
    interestRate {
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

export function useDeleteInterestRatesMutation() {
  return Urql.useMutation<DeleteInterestRatesMutation, DeleteInterestRatesMutationVariables>(
    DeleteInterestRatesDocument,
  );
}
export const ExportInterestRatesDocument = gql`
  query exportInterestRates($where: InterestRateFilterInput, $order: [InterestRateSortInput!]) {
    interestRate {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportInterestRatesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportInterestRatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportInterestRatesQuery, ExportInterestRatesQueryVariables>({
    query: ExportInterestRatesDocument,
    ...options,
  });
}

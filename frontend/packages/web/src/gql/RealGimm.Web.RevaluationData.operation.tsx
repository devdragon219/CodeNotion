// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { RevaluationDataFragmentDoc } from './RealGimm.Web.RevaluationData.fragment';

export type GetRevaluationDataQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RevaluationDataFilterInput>;
  order?: Types.InputMaybe<Array<Types.RevaluationDataSortInput> | Types.RevaluationDataSortInput>;
}>;

export type GetRevaluationDataQuery = {
  __typename?: 'Query';
  revaluationData: {
    __typename?: 'RevaluationDataQueries';
    listRevaluationData?: {
      __typename?: 'ListRevaluationDataConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RevaluationData';
        id: number;
        year: number;
        month: number;
        baseYear: number;
        revaluationIndex: number;
      }> | null;
    } | null;
  };
};

export type ExportRevaluationDataQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RevaluationDataFilterInput>;
  order?: Types.InputMaybe<Array<Types.RevaluationDataSortInput> | Types.RevaluationDataSortInput>;
}>;

export type ExportRevaluationDataQuery = {
  __typename?: 'Query';
  revaluationData: {
    __typename?: 'RevaluationDataQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetRevaluationDataDocument = gql`
  query getRevaluationData(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RevaluationDataFilterInput
    $order: [RevaluationDataSortInput!]
  ) {
    revaluationData {
      listRevaluationData(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...RevaluationDataFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RevaluationDataFragmentDoc}
`;

export function useGetRevaluationDataQuery(
  options?: Omit<Urql.UseQueryArgs<GetRevaluationDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRevaluationDataQuery, GetRevaluationDataQueryVariables>({
    query: GetRevaluationDataDocument,
    ...options,
  });
}
export const ExportRevaluationDataDocument = gql`
  query exportRevaluationData($where: RevaluationDataFilterInput, $order: [RevaluationDataSortInput!]) {
    revaluationData {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportRevaluationDataQuery(
  options?: Omit<Urql.UseQueryArgs<ExportRevaluationDataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportRevaluationDataQuery, ExportRevaluationDataQueryVariables>({
    query: ExportRevaluationDataDocument,
    ...options,
  });
}

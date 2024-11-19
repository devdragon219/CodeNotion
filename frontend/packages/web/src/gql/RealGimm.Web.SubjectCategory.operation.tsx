// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { SubjectCategoryFragmentDoc } from './RealGimm.Web.SubjectCategory';

export type GetSubjectCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.SubjectCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectCategorySortInput> | Types.SubjectCategorySortInput>;
}>;

export type GetSubjectCategoriesQuery = {
  __typename?: 'Query';
  subjectCategory: {
    __typename?: 'SubjectCategoryQueries';
    listSubjectCategories?: {
      __typename?: 'ListSubjectCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'SubjectCategory';
        name: string;
        id: number;
        function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
      }> | null;
    } | null;
  };
};

export type GetAllSubjectCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SubjectCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectCategorySortInput> | Types.SubjectCategorySortInput>;
}>;

export type GetAllSubjectCategoriesQuery = {
  __typename?: 'Query';
  subjectCategory: {
    __typename?: 'SubjectCategoryQueries';
    allSubjectCategories: Array<{
      __typename?: 'SubjectCategory';
      name: string;
      id: number;
      function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
    }>;
  };
};

export const GetSubjectCategoriesDocument = gql`
  query getSubjectCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: SubjectCategoryFilterInput
    $order: [SubjectCategorySortInput!]
  ) {
    subjectCategory {
      listSubjectCategories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...SubjectCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${SubjectCategoryFragmentDoc}
`;

export function useGetSubjectCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetSubjectCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetSubjectCategoriesQuery, GetSubjectCategoriesQueryVariables>({
    query: GetSubjectCategoriesDocument,
    ...options,
  });
}
export const GetAllSubjectCategoriesDocument = gql`
  query getAllSubjectCategories($where: SubjectCategoryFilterInput, $order: [SubjectCategorySortInput!]) {
    subjectCategory {
      allSubjectCategories(where: $where, order: $order) {
        ...SubjectCategoryFragment
      }
    }
  }
  ${SubjectCategoryFragmentDoc}
`;

export function useGetAllSubjectCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllSubjectCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllSubjectCategoriesQuery, GetAllSubjectCategoriesQueryVariables>({
    query: GetAllSubjectCategoriesDocument,
    ...options,
  });
}

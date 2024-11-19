// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';

export type GetCadastralCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CadastralCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CadastralCategorySortInput> | Types.CadastralCategorySortInput>;
}>;

export type GetCadastralCategoriesQuery = {
  __typename?: 'Query';
  cadastralCategory: {
    __typename?: 'CadastralCategoryQueries';
    listCadastralCategories?: {
      __typename?: 'ListCadastralCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CadastralCategory';
        id: number;
        description: string;
        externalCode?: string | null;
      }> | null;
    } | null;
  };
};

export const GetCadastralCategoriesDocument = gql`
  query getCadastralCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CadastralCategoryFilterInput
    $order: [CadastralCategorySortInput!]
  ) {
    cadastralCategory {
      listCadastralCategories(
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
          ...CadastralCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CadastralCategoryFragmentDoc}
`;

export function useGetCadastralCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCadastralCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCadastralCategoriesQuery, GetCadastralCategoriesQueryVariables>({
    query: GetCadastralCategoriesDocument,
    ...options,
  });
}

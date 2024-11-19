// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';

export type GetCitiesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CityFilterInput>;
  order?: Types.InputMaybe<Array<Types.CitySortInput> | Types.CitySortInput>;
}>;

export type GetCitiesQuery = {
  __typename?: 'Query';
  city: {
    __typename?: 'CityQueries';
    listCities?: {
      __typename?: 'ListCitiesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'City';
        guid: string;
        id: number;
        name: string;
        countyName?: string | null;
        countryName?: string | null;
        countryISO: string;
        cadastralCode?: string | null;
      }> | null;
    } | null;
  };
};

export type GetAllCitiesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CityFilterInput>;
  order?: Types.InputMaybe<Array<Types.CitySortInput> | Types.CitySortInput>;
}>;

export type GetAllCitiesQuery = {
  __typename?: 'Query';
  city: {
    __typename?: 'CityQueries';
    listCitiesFull: Array<{
      __typename?: 'City';
      guid: string;
      id: number;
      name: string;
      countyName?: string | null;
      countryName?: string | null;
      countryISO: string;
      cadastralCode?: string | null;
    }>;
  };
};

export type FindCountyCityQueryVariables = Types.Exact<{
  countyShortCode: Types.Scalars['String']['input'];
}>;

export type FindCountyCityQuery = {
  __typename?: 'Query';
  city: {
    __typename?: 'CityQueries';
    findCountyCity: {
      __typename?: 'ResultOfCity';
      value?: {
        __typename?: 'City';
        guid: string;
        id: number;
        name: string;
        countyName?: string | null;
        countryName?: string | null;
        countryISO: string;
        cadastralCode?: string | null;
      } | null;
    };
  };
};

export const GetCitiesDocument = gql`
  query getCities(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CityFilterInput
    $order: [CitySortInput!]
  ) {
    city {
      listCities(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CityFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetCitiesQuery(options?: Omit<Urql.UseQueryArgs<GetCitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCitiesQuery, GetCitiesQueryVariables>({ query: GetCitiesDocument, ...options });
}
export const GetAllCitiesDocument = gql`
  query getAllCities($where: CityFilterInput, $order: [CitySortInput!]) {
    city {
      listCitiesFull(where: $where, order: $order) {
        ...CityFragment
      }
    }
  }
  ${CityFragmentDoc}
`;

export function useGetAllCitiesQuery(options?: Omit<Urql.UseQueryArgs<GetAllCitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>({ query: GetAllCitiesDocument, ...options });
}
export const FindCountyCityDocument = gql`
  query findCountyCity($countyShortCode: String!) {
    city {
      findCountyCity(countyShortCode: $countyShortCode) {
        value {
          ...CityFragment
        }
      }
    }
  }
  ${CityFragmentDoc}
`;

export function useFindCountyCityQuery(options: Omit<Urql.UseQueryArgs<FindCountyCityQueryVariables>, 'query'>) {
  return Urql.useQuery<FindCountyCityQuery, FindCountyCityQueryVariables>({
    query: FindCountyCityDocument,
    ...options,
  });
}

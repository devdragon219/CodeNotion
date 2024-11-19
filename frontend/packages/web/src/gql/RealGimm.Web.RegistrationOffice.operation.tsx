// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { RegistrationOfficeFragmentDoc } from './RealGimm.Web.RegistrationOffice.fragment';

export type GetRegistrationOfficesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.RegistrationOfficeFilterInput>;
  order?: Types.InputMaybe<Array<Types.RegistrationOfficeSortInput> | Types.RegistrationOfficeSortInput>;
}>;

export type GetRegistrationOfficesQuery = {
  __typename?: 'Query';
  registrationOffice: {
    __typename?: 'RegistrationOfficeQueries';
    listRegistrationOffices?: {
      __typename?: 'ListRegistrationOfficesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'RegistrationOffice';
        id: number;
        description: string;
        externalCode: string;
        city?: {
          __typename?: 'City';
          guid: string;
          id: number;
          name: string;
          countyName?: string | null;
          countryName?: string | null;
          countryISO: string;
          cadastralCode?: string | null;
        } | null;
      }> | null;
    } | null;
  };
};

export const GetRegistrationOfficesDocument = gql`
  query getRegistrationOffices(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: RegistrationOfficeFilterInput
    $order: [RegistrationOfficeSortInput!]
  ) {
    registrationOffice {
      listRegistrationOffices(
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
          ...RegistrationOfficeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${RegistrationOfficeFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetRegistrationOfficesQuery(
  options?: Omit<Urql.UseQueryArgs<GetRegistrationOfficesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRegistrationOfficesQuery, GetRegistrationOfficesQueryVariables>({
    query: GetRegistrationOfficesDocument,
    ...options,
  });
}

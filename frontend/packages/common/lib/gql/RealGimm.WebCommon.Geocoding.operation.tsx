// @ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type GetGeoPositionQueryVariables = Types.Exact<{
  address: Types.AsstAddressInput;
}>;

export type GetGeoPositionQuery = {
  __typename?: 'Query';
  geocoding: {
    __typename?: 'GeocodingQueries';
    position?: { __typename?: 'GeocodingResult'; boundingBox: Array<number>; position?: Array<number> | null } | null;
  };
};

export const GetGeoPositionDocument = gql`
  query getGeoPosition($address: AsstAddressInput!) {
    geocoding {
      position(address: $address) {
        boundingBox
        position
      }
    }
  }
`;

export function useGetGeoPositionQuery(options: Omit<Urql.UseQueryArgs<GetGeoPositionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGeoPositionQuery, GetGeoPositionQueryVariables>({
    query: GetGeoPositionDocument,
    ...options,
  });
}

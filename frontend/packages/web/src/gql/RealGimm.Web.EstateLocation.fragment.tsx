// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateLocationFragment = {
  __typename?: 'EstateLocation';
  estateId: number;
  estateInternalCode: string;
  estateName?: string | null;
  address?: {
    __typename?: 'AsstAddress';
    id: number;
    cityName?: string | null;
    countryISO?: string | null;
    countyName?: string | null;
    localPostCode?: string | null;
    numbering?: string | null;
    toponymy?: string | null;
    locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
  } | null;
};

export const EstateLocationFragmentDoc = gql`
  fragment EstateLocationFragment on EstateLocation {
    estateId
    estateInternalCode
    estateName
    address {
      id
      cityName
      countryISO
      countyName
      localPostCode
      numbering
      toponymy
      locationLatLon {
        coordinates
      }
    }
  }
`;

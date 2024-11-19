// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type AddressFragment = {
  __typename?: 'Address';
  id: number;
  addressType: Types.AddressType;
  cityName?: string | null;
  countryISO?: string | null;
  countyName?: string | null;
  localPostCode?: string | null;
  notes?: string | null;
  numbering?: string | null;
  toponymy?: string | null;
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
};

export const AddressFragmentDoc = gql`
  fragment AddressFragment on Address {
    id
    addressType
    city {
      ...CityFragment
    }
    cityName
    countryISO
    countyName
    localPostCode
    notes
    numbering
    toponymy
  }
`;

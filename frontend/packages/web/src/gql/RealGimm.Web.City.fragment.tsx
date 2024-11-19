// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CityFragment = {
  __typename?: 'City';
  guid: string;
  id: number;
  name: string;
  countyName?: string | null;
  countryName?: string | null;
  countryISO: string;
  cadastralCode?: string | null;
};

export const CityFragmentDoc = gql`
  fragment CityFragment on City {
    guid
    id
    name
    countyName
    countryName
    countryISO
    cadastralCode
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type RegistrationOfficeFragment = {
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
};

export const RegistrationOfficeFragmentDoc = gql`
  fragment RegistrationOfficeFragment on RegistrationOffice {
    id
    description
    externalCode
    city {
      ...CityFragment
    }
  }
`;

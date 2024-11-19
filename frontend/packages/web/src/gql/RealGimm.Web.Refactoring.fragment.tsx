// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type RefactoringFragment = {
  __typename?: 'Refactoring';
  referenceYear: number;
  buildingPermitYear?: number | null;
  condition: Types.UnitCondition;
  ageCoefficient?: number | null;
  id: number;
  estateUnits: Array<{
    __typename?: 'EstateUnit';
    id: number;
    internalCode: string;
    name?: string | null;
    address: {
      __typename?: 'AsstAddress';
      id: number;
      addressType: Types.AsstAddressType;
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
      locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
    };
  }>;
};

export const RefactoringFragmentDoc = gql`
  fragment RefactoringFragment on Refactoring {
    referenceYear
    buildingPermitYear
    condition
    ageCoefficient
    estateUnits {
      id
      internalCode
      name
      address {
        ...AsstAddressFragment
      }
    }
    id
  }
`;

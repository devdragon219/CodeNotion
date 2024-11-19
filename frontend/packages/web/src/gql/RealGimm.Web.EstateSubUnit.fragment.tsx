// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type EstateSubUnitFragment = {
  __typename?: 'EstateSubUnit';
  internalCode: string;
  occupantType?: Types.OccupantType | null;
  occupancyPercent?: number | null;
  notes?: string | null;
  since?: string | null;
  until?: string | null;
  surfaceSqM?: number | null;
  id: number;
  occupantSubject?:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number }
    | null;
  orgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
  usageType?: {
    __typename?: 'EstateUsageType';
    id: number;
    name: string;
    internalCode: string;
    ordering: number;
    isForEstate: boolean;
    isForEstateUnit: boolean;
    isForEstateSubUnit: boolean;
    isForContracts: boolean;
  } | null;
  estateUnit: {
    __typename?: 'EstateUnit';
    id: number;
    name?: string | null;
    type: Types.EstateUnitType;
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
    currentCadastralUnit?: {
      __typename?: 'CadastralUnit';
      id: number;
      isAncillaryUnit: boolean;
      isCadastralRegistrationInProgress: boolean;
    } | null;
  };
};

export const EstateSubUnitFragmentDoc = gql`
  fragment EstateSubUnitFragment on EstateSubUnit {
    internalCode
    occupantType
    occupantSubject {
      name
      id
    }
    orgUnit {
      id
      name
    }
    occupancyPercent
    usageType {
      ...UsageTypeFragment
    }
    notes
    since
    until
    surfaceSqM
    id
    estateUnit {
      id
      name
      type
      address {
        ...AsstAddressFragment
      }
      currentCadastralUnit {
        id
        isAncillaryUnit
        isCadastralRegistrationInProgress
      }
    }
  }
`;

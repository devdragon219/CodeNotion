// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type EstateLightDtoFragment = {
  __typename?: 'EstateLightDto';
  id: number;
  managementSubjectId: number;
  internalCode: string;
  name?: string | null;
  managementSubjectName?: string | null;
  status: Types.EstateStatus;
  type: Types.EstateType;
  usageType: {
    __typename?: 'EstateUsageType';
    id: number;
    name: string;
    internalCode: string;
    ordering: number;
    isForEstate: boolean;
    isForEstateUnit: boolean;
    isForEstateSubUnit: boolean;
    isForContracts: boolean;
  };
  addresses: Array<{
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
  }>;
};

export const EstateLightDtoFragmentDoc = gql`
  fragment EstateLightDtoFragment on EstateLightDto {
    id
    managementSubjectId
    internalCode
    name
    managementSubjectName
    status
    type
    usageType {
      ...UsageTypeFragment
    }
    addresses {
      ...AsstAddressFragment
    }
  }
`;

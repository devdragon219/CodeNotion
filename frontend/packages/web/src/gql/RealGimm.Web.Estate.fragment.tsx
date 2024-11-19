// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { EstateTotalMarketValueFragmentDoc } from './RealGimm.Web.EstateTotalMarketValue.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { RefactoringFragmentDoc } from './RealGimm.Web.Refactoring.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValuationFragmentDoc } from './RealGimm.Web.Valuation.fragment';

export type EstateFragment = {
  __typename?: 'Estate';
  id: number;
  internalCode: string;
  name?: string | null;
  type: Types.EstateType;
  externalCode?: string | null;
  surfaceAreaSqM?: number | null;
  ownership: Types.EstateOwnership;
  buildYear?: number | null;
  status: Types.EstateStatus;
  notes?: string | null;
  managementSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
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
  estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
  floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
  mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
  usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
  managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
  stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
};

export type EstateDetailFragment = {
  __typename?: 'Estate';
  id: number;
  name?: string | null;
  internalCode: string;
  type: Types.EstateType;
  status: Types.EstateStatus;
  decommissioningDate?: string | null;
  externalCode?: string | null;
  surfaceAreaSqM?: number | null;
  ownership: Types.EstateOwnership;
  buildYear?: number | null;
  notes?: string | null;
  managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
  managementSubject:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number };
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
  floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
  mainUsageType: {
    __typename?: 'EstateMainUsageType';
    id: number;
    name: string;
    internalCode: string;
    ordering: number;
  };
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
  stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
  totalMarketValue?: {
    __typename?: 'EstateTotalMarketValue';
    totalSurfaceAreaSqM: number;
    notes?: string | null;
    coefficients: Array<{
      __typename?: 'EstateTotalMarketValueCoefficient';
      id: number;
      type: Types.EstateTotalMarketValueCoefficientType;
      value: number;
    }>;
    marketValues: Array<{
      __typename?: 'EstateMarketValue';
      id: number;
      type: Types.EstateMarketValueType;
      value: number;
    }>;
  } | null;
  estateUnits: Array<{ __typename?: 'EstateUnit'; id: number; name?: string | null }>;
  valuations: Array<{
    __typename?: 'Valuation';
    referenceYear: number;
    iasValue?: number | null;
    rbaValue?: number | null;
    mortgageAmount?: number | null;
    transferYear?: number | null;
    revampOperations?: number | null;
    id: number;
  }>;
  refactorings: Array<{
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
  }>;
  catalogueItems: Array<{ __typename?: 'CatalogueItem'; id: number }>;
};

export const EstateFragmentDoc = gql`
  fragment EstateFragment on Estate {
    id
    internalCode
    name
    type
    managementSubject {
      id
      name
    }
    addresses {
      ...AsstAddressFragment
    }
    externalCode
    surfaceAreaSqM
    estateUnits {
      id
    }
    floors {
      ...FloorFragment
    }
    mainUsageType {
      id
      name
    }
    usageType {
      id
      name
    }
    ownership
    buildYear
    status
    managementOrgUnit {
      id
      name
    }
    notes
    stairs {
      ...StairFragment
    }
  }
`;
export const EstateDetailFragmentDoc = gql`
  fragment EstateDetailFragment on Estate {
    id
    name
    internalCode
    type
    status
    decommissioningDate
    managementOrgUnit {
      id
      name
    }
    managementSubject {
      name
      id
    }
    addresses {
      ...AsstAddressFragment
    }
    externalCode
    surfaceAreaSqM
    floors {
      ...FloorFragment
    }
    mainUsageType {
      ...MainUsageTypeFragment
    }
    usageType {
      ...UsageTypeFragment
    }
    ownership
    buildYear
    notes
    stairs {
      ...StairFragment
    }
    totalMarketValue {
      ...EstateTotalMarketValueFragment
    }
    estateUnits {
      id
      name
    }
    valuations {
      ...ValuationFragment
    }
    refactorings {
      ...RefactoringFragment
    }
    catalogueItems {
      id
    }
  }
`;

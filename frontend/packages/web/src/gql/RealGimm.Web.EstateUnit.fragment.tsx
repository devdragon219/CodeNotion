// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import { EstateUnitCadastralUnitDetailFragmentDoc } from './RealGimm.Web.CadastralUnit.fragment';
import { CadastralUnitIncomeFragmentDoc } from './RealGimm.Web.CadastralUnitIncome.fragment';
import { CadastralUnitInspectionFragmentDoc } from './RealGimm.Web.CadastralUnitInspection.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { EstateUnitSurfaceSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummary.fragment';
import { EstateUnitSurfaceSummaryFloorFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloor.fragment';
import { EstateUnitSurfaceSummaryFloorSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloorSummary.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';

export type EstateUnitFragment = {
  __typename?: 'EstateUnit';
  id: number;
  internalCode: string;
  type: Types.EstateUnitType;
  subNumbering?: string | null;
  externalCode?: string | null;
  name?: string | null;
  netSurface?: number | null;
  grossSurface?: number | null;
  ownershipStartDate: string;
  status: Types.EstateUnitStatus;
  sharedArea: boolean;
  disusedDate?: string | null;
  ownershipType: Types.EstateUnitOwnershipType;
  ownershipEndDate?: string | null;
  ownershipPercent?: number | null;
  notes?: string | null;
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
  stair?: { __typename?: 'Stair'; id: number; description: string } | null;
  floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
  estate: {
    __typename?: 'Estate';
    id: number;
    internalCode: string;
    name?: string | null;
    type: Types.EstateType;
    managementSubject:
      | { __typename?: 'LegalSubject'; name: string; id: number }
      | { __typename?: 'ManagementSubject'; name: string; id: number }
      | { __typename?: 'PhysicalSubject'; name: string; id: number };
  };
  currentCadastralUnit?: {
    __typename?: 'CadastralUnit';
    id: number;
    since?: string | null;
    isCadastralRegistrationInProgress: boolean;
    isAncillaryUnit: boolean;
    coordinates: Array<{
      __typename?: 'CadastralCoordinates';
      coordinateType: Types.CoordinateType;
      unmanagedOverride?: string | null;
      level1?: string | null;
      level2?: string | null;
      level3?: string | null;
      level4?: string | null;
      level5?: string | null;
      itTavPartita?: string | null;
      itTavCorpo?: string | null;
      itTavPorzione?: string | null;
      hasITTavData: boolean;
      notes?: string | null;
      id: number;
    }>;
  } | null;
  usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
};

export type EstateUnitDetailFragment = {
  __typename?: 'EstateUnit';
  id: number;
  name?: string | null;
  internalCode: string;
  externalCode?: string | null;
  type: Types.EstateUnitType;
  status: Types.EstateUnitStatus;
  disusedDate?: string | null;
  ownershipType: Types.EstateUnitOwnershipType;
  ownershipStartDate: string;
  ownershipEndDate?: string | null;
  ownershipPercent?: number | null;
  subNumbering?: string | null;
  sharedArea: boolean;
  notes?: string | null;
  netSurface?: number | null;
  grossSurface?: number | null;
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
  estate: {
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
  floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
  stair?: { __typename?: 'Stair'; id: number; description: string } | null;
  officialAct?: {
    __typename?: 'OfficialAct';
    id: number;
    protocolNumber: string;
    registrationNumber?: string | null;
    registrationDate?: string | null;
    issuerName?: string | null;
    actRegistrationFields: Array<{
      __typename?: 'ActRegistrationField';
      fieldType: Types.RegistrationFieldType;
      value?: string | null;
      id: number;
    }>;
    actRegistrationDates: Array<{
      __typename?: 'ActRegistrationDate';
      dateType: Types.RegistrationDateType;
      value: string;
      id: number;
    }>;
  } | null;
  lastRepossession?: {
    __typename?: 'Repossession';
    notes?: string | null;
    eventDate?: string | null;
    eventType?: Types.RepossessionType | null;
    eventReason?: Types.RepossessionReason | null;
    unitStatus?: Types.UnitCondition | null;
    isAssignable?: boolean | null;
    isKeysReturned?: boolean | null;
    isWithValuables?: boolean | null;
    id: number;
  } | null;
  surfacesTree: Array<{
    __typename?: 'EstateUnitSurfaceSummary';
    surfaceId?: number | null;
    metric: Types.SurfaceMeasurementMetric;
    surfaceSqMTotal?: number | null;
    surfaceSqMCommonArea?: number | null;
    surfaceSqMSideArea?: number | null;
    floors: Array<{
      __typename?: 'EstateUnitSurfaceSummaryFloor';
      surfaceId?: number | null;
      surfaceSqMTotal?: number | null;
      surfaceSqMCommonArea?: number | null;
      surfaceSqMSideArea?: number | null;
      floor: {
        __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
        id?: number | null;
        name?: string | null;
        position: number;
        templateReference?: string | null;
      };
      functionAreas: Array<{
        __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
        surfaceId?: number | null;
        surfaceSqMTotal?: number | null;
        surfaceSqMCommonArea?: number | null;
        surfaceSqMSideArea?: number | null;
        functionArea: {
          __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
          id?: number | null;
          name?: string | null;
          surfaceType: Types.SurfaceType;
        };
      }>;
    }>;
  }>;
  currentCadastralUnit?: {
    __typename?: 'CadastralUnit';
    internalCode: string;
    type: Types.EstateUnitType;
    status: Types.CadastralUnitStatus;
    since?: string | null;
    until?: string | null;
    lastRelevantChangeDate?: string | null;
    cadastralNotes?: string | null;
    fiscalNotes?: string | null;
    consortiumNotes?: string | null;
    isCadastralRegistrationInProgress: boolean;
    isAncillaryUnit: boolean;
    id: number;
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
    coordinates: Array<{
      __typename?: 'CadastralCoordinates';
      coordinateType: Types.CoordinateType;
      unmanagedOverride?: string | null;
      level1?: string | null;
      level2?: string | null;
      level3?: string | null;
      level4?: string | null;
      level5?: string | null;
      itTavPartita?: string | null;
      itTavCorpo?: string | null;
      itTavPorzione?: string | null;
      hasITTavData: boolean;
      notes?: string | null;
      id: number;
    }>;
    unavailabilities: Array<{
      __typename?: 'CadastralUnavailability';
      since?: string | null;
      until?: string | null;
      notes?: string | null;
      id: number;
    }>;
    inspection?: {
      __typename?: 'CadastralUnitInspection';
      date?: string | null;
      protocolDate?: string | null;
      protocolNumber?: string | null;
      heading?: string | null;
      macroZone?: string | null;
      microZone?: string | null;
      isHistoricalEstate: boolean;
      isDirectRestriction: boolean;
    } | null;
    income: {
      __typename?: 'CadastralUnitIncome';
      macroCategory?: string | null;
      microCategory?: string | null;
      metric?: Types.IncomeMetric | null;
      metricAmount?: number | null;
      metricRentedAmount?: number | null;
      registeredSurface?: number | null;
      type?: Types.IncomeType | null;
      cadastralAmount?: number | null;
      farmAmount?: number | null;
      landAmount?: number | null;
      marketValue?: number | null;
      cadastralCategory?: {
        __typename?: 'CadastralCategory';
        id: number;
        description: string;
        externalCode?: string | null;
      } | null;
      cadastralLandCategory?: {
        __typename?: 'CadastralLandCategory';
        id: number;
        description: string;
        internalCode: string;
        countryISO: string;
        ordering: number;
      } | null;
    };
  } | null;
};

export const EstateUnitFragmentDoc = gql`
  fragment EstateUnitFragment on EstateUnit {
    id
    internalCode
    type
    address {
      ...AsstAddressFragment
    }
    subNumbering
    stair {
      ...StairFragment
    }
    externalCode
    name
    netSurface
    grossSurface
    floors {
      ...FloorFragment
    }
    estate {
      id
      internalCode
      name
      type
      managementSubject {
        name
        id
      }
    }
    currentCadastralUnit {
      id
      coordinates {
        ...CadastralCoordinatesFragment
      }
      since
      isCadastralRegistrationInProgress
      isAncillaryUnit
    }
    usageType {
      id
      name
    }
    ownershipStartDate
    status
    sharedArea
    disusedDate
    ownershipType
    ownershipEndDate
    ownershipPercent
    notes
  }
`;
export const EstateUnitDetailFragmentDoc = gql`
  fragment EstateUnitDetailFragment on EstateUnit {
    id
    name
    internalCode
    externalCode
    type
    status
    usageType {
      ...UsageTypeFragment
    }
    disusedDate
    ownershipType
    ownershipStartDate
    ownershipEndDate
    ownershipPercent
    address {
      ...AsstAddressFragment
    }
    subNumbering
    estate {
      ...EstateFragment
    }
    floors {
      ...FloorFragment
    }
    stair {
      ...StairFragment
    }
    sharedArea
    notes
    netSurface
    grossSurface
    officialAct {
      id
      protocolNumber
      registrationNumber
      registrationDate
      issuerName
      actRegistrationFields {
        fieldType
        value
        id
      }
      actRegistrationDates {
        dateType
        value
        id
      }
    }
    lastRepossession {
      notes
      eventDate
      eventType
      eventReason
      unitStatus
      isAssignable
      isKeysReturned
      isWithValuables
      id
    }
    surfacesTree {
      ...EstateUnitSurfaceSummaryFragment
    }
    currentCadastralUnit {
      ...EstateUnitCadastralUnitDetailFragment
    }
  }
`;

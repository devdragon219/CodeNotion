// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import { CadastralUnitIncomeFragmentDoc } from './RealGimm.Web.CadastralUnitIncome.fragment';
import { CadastralUnitInspectionFragmentDoc } from './RealGimm.Web.CadastralUnitInspection.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';

export type EstateUnitCadastralUnitDetailFragment = {
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
};

export type CadastralUnitDetailFragment = {
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
  estateUnit: {
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
  history: Array<{
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
    estateUnit: { __typename?: 'EstateUnit'; internalCode: string };
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
  }>;
  taxConfig: Array<{
    __typename?: 'CadastralUnitTaxConfig';
    taxCalculator: string;
    code: string;
    isMandatory: boolean;
    templateTypeId: string;
    type: Types.CustomFieldType;
    value?: string | null;
    id: number;
  }>;
  taxCalculators: Array<{
    __typename?: 'ConfigSection';
    name: string;
    taxCalculator: string;
    form: Array<
      Array<{
        __typename?: 'ConfigField';
        name?: string | null;
        isMandatory: boolean;
        id: string;
        type: Types.CustomFieldType;
        validValues?: Array<{ __typename?: 'KeyValuePairOfStringAndString'; key: string; value: string }> | null;
      }>
    >;
  }>;
  taxPayments: Array<{
    __typename?: 'AssetTaxCalculation';
    id: number;
    expectedInstallments: number;
    taxCalculator: string;
    year: number;
    installments: Array<{
      __typename?: 'AssetTaxPayment';
      installmentsPaid: Array<number>;
      amountPaid: number;
      date: string;
    }>;
  }>;
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
};

export type CadastralUnitFragment = {
  __typename?: 'CadastralUnit';
  id: number;
  internalCode: string;
  type: Types.EstateUnitType;
  since?: string | null;
  until?: string | null;
  status: Types.CadastralUnitStatus;
  estateUnit: {
    __typename?: 'EstateUnit';
    id: number;
    internalCode: string;
    managementSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    estate: { __typename?: 'Estate'; id: number; internalCode: string };
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
};

export const EstateUnitCadastralUnitDetailFragmentDoc = gql`
  fragment EstateUnitCadastralUnitDetailFragment on CadastralUnit {
    internalCode
    type
    address {
      ...AsstAddressFragment
    }
    coordinates {
      ...CadastralCoordinatesFragment
    }
    unavailabilities {
      since
      until
      notes
      id
    }
    status
    since
    until
    lastRelevantChangeDate
    inspection {
      ...CadastralUnitInspectionFragment
    }
    income {
      ...CadastralUnitIncomeFragment
    }
    cadastralNotes
    fiscalNotes
    consortiumNotes
    isCadastralRegistrationInProgress
    isAncillaryUnit
    id
  }
`;
export const CadastralUnitDetailFragmentDoc = gql`
  fragment CadastralUnitDetailFragment on CadastralUnit {
    ...EstateUnitCadastralUnitDetailFragment
    estateUnit {
      ...EstateUnitFragment
    }
    history {
      ...EstateUnitCadastralUnitDetailFragment
      estateUnit {
        internalCode
      }
    }
    taxConfig {
      taxCalculator
      code
      isMandatory
      templateTypeId
      type
      value
      id
    }
    taxCalculators {
      name
      taxCalculator
      form {
        name
        isMandatory
        id
        type
        validValues {
          key
          value
        }
      }
    }
    taxPayments {
      id
      expectedInstallments
      taxCalculator
      year
      installments {
        installmentsPaid
        amountPaid
        date
      }
    }
  }
`;
export const CadastralUnitFragmentDoc = gql`
  fragment CadastralUnitFragment on CadastralUnit {
    id
    internalCode
    estateUnit {
      id
      internalCode
      managementSubject {
        id
        name
      }
      estate {
        id
        internalCode
      }
    }
    type
    since
    until
    address {
      ...AsstAddressFragment
    }
    coordinates {
      ...CadastralCoordinatesFragment
    }
    status
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';
import { UtilityTypeDetailFragmentDoc } from './RealGimm.Web.UtilityType.fragment';

export type UtilityServiceFragment = {
  __typename?: 'UtilityService';
  id: number;
  internalCode: string;
  status: Types.EntryStatus;
  activationDate: string;
  utilityContractCode: string;
  utilityUserCode: string;
  description?: string | null;
  isFreeMarket: boolean;
  deposit?: number | null;
  contractPowerNominal?: string | null;
  contractPowerMaximum?: string | null;
  utilityMeterSerial?: string | null;
  contractNominalTension?: string | null;
  utilityDeliveryPointCode?: string | null;
  deactivationDate?: string | null;
  deactivationRequestDate?: string | null;
  notes?: string | null;
  referenceSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  orgUnit: { __typename?: 'OrgUnit'; id: number; name?: string | null };
  utilityType: {
    __typename?: 'UtilityType';
    id: number;
    internalCode: string;
    description: string;
    category: Types.UtilityCategory;
    meteringType: Types.MeteringType;
    timeOfUseRateCount: number;
    measurementUnit: string;
    chargeFields?: Array<
      Array<{
        __typename?: 'UtilityChargeField';
        name: string;
        isMandatory: boolean;
        id: string;
        type: Types.CustomFieldType;
        validValues?: Array<string> | null;
      }>
    > | null;
  };
  providerSubject:
    | {
        __typename: 'LegalSubject';
        baseCountryTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      }
    | {
        __typename: 'ManagementSubject';
        baseCountryTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      }
    | {
        __typename: 'PhysicalSubject';
        professionalTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      };
  accountingItem: { __typename?: 'AccountingItem'; id: number; internalCode: string; description: string };
  estates: Array<{
    __typename?: 'Estate';
    id: number;
    name?: string | null;
    internalCode: string;
    status: Types.EstateStatus;
    type: Types.EstateType;
    usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
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
  }>;
  estateUnits: Array<{
    __typename?: 'EstateUnit';
    id: number;
    name?: string | null;
    internalCode: string;
    type: Types.EstateUnitType;
    subNumbering?: string | null;
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
    usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
    currentCadastralUnit?: {
      __typename?: 'CadastralUnit';
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
    estate: { __typename?: 'Estate'; id: number };
  }>;
};

export type UtilityServiceDetailFragment = {
  __typename?: 'UtilityService';
  internalCode: string;
  description?: string | null;
  utilityUserCode: string;
  utilityContractCode: string;
  utilityMeterSerial?: string | null;
  utilityDeliveryPointCode?: string | null;
  isFreeMarket: boolean;
  deposit?: number | null;
  status: Types.EntryStatus;
  activationDate: string;
  deactivationRequestDate?: string | null;
  deactivationDate?: string | null;
  contractPowerMaximum?: string | null;
  contractPowerNominal?: string | null;
  contractNominalTension?: string | null;
  notes?: string | null;
  id: number;
  utilityType: {
    __typename?: 'UtilityType';
    category: Types.UtilityCategory;
    description: string;
    internalCode: string;
    expenseClass?: string | null;
    externalCode?: string | null;
    measurementUnit: string;
    measurementUnitDescription: string;
    timeOfUseRateCount: number;
    meteringType: Types.MeteringType;
    hasHeatingAccountingSystem: boolean;
    id: number;
    chargeFields?: Array<
      Array<{
        __typename?: 'UtilityChargeField';
        name: string;
        isMandatory: boolean;
        id: string;
        type: Types.CustomFieldType;
        validValues?: Array<string> | null;
      }>
    > | null;
  };
  estates: Array<{
    __typename?: 'Estate';
    id: number;
    name?: string | null;
    internalCode: string;
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
  }>;
  estateUnits: Array<{
    __typename?: 'EstateUnit';
    id: number;
    name?: string | null;
    internalCode: string;
    type: Types.EstateUnitType;
    subNumbering?: string | null;
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
    currentCadastralUnit?: {
      __typename?: 'CadastralUnit';
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
    estate: { __typename?: 'Estate'; id: number };
  }>;
  providerSubject:
    | {
        __typename: 'LegalSubject';
        baseCountryTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      }
    | {
        __typename: 'ManagementSubject';
        baseCountryTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      }
    | {
        __typename: 'PhysicalSubject';
        professionalTaxIdCode?: string | null;
        name: string;
        id: number;
        internalCode: string;
      };
  referenceSubject:
    | { __typename?: 'LegalSubject'; name: string; id: number; internalCode: string }
    | { __typename?: 'ManagementSubject'; name: string; id: number; internalCode: string }
    | { __typename?: 'PhysicalSubject'; name: string; id: number; internalCode: string };
  orgUnit: { __typename?: 'OrgUnit'; id: number; name?: string | null };
  accountingItem: { __typename?: 'AccountingItem'; description: string; internalCode: string; id: number };
};

export const UtilityServiceFragmentDoc = gql`
  fragment UtilityServiceFragment on UtilityService {
    id
    internalCode
    referenceSubject {
      id
      name
    }
    orgUnit {
      id
      name
    }
    utilityType {
      id
      internalCode
      description
      category
      meteringType
      timeOfUseRateCount
      chargeFields {
        ...UtilityChargeFieldFragment
      }
      measurementUnit
    }
    providerSubject {
      __typename
      name
      id
      internalCode
      ... on LegalSubject {
        baseCountryTaxIdCode
      }
      ... on ManagementSubject {
        baseCountryTaxIdCode
      }
      ... on PhysicalSubject {
        professionalTaxIdCode
      }
    }
    status
    activationDate
    utilityContractCode
    utilityUserCode
    description
    accountingItem {
      id
      internalCode
      description
    }
    isFreeMarket
    deposit
    contractPowerNominal
    contractPowerMaximum
    utilityMeterSerial
    contractNominalTension
    utilityDeliveryPointCode
    estates {
      id
      name
      internalCode
      status
      type
      usageType {
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
    }
    estateUnits {
      address {
        ...AsstAddressFragment
      }
      id
      name
      internalCode
      usageType {
        id
        name
      }
      type
      subNumbering
      currentCadastralUnit {
        coordinates {
          ...CadastralCoordinatesFragment
        }
      }
      estate {
        id
      }
    }
    deactivationDate
    deactivationRequestDate
    notes
  }
`;
export const UtilityServiceDetailFragmentDoc = gql`
  fragment UtilityServiceDetailFragment on UtilityService {
    internalCode
    utilityType {
      ...UtilityTypeDetailFragment
    }
    estates {
      id
      name
      internalCode
      status
      type
      usageType {
        ...UsageTypeFragment
      }
      managementSubject {
        name
        id
      }
      addresses {
        ...AsstAddressFragment
      }
    }
    estateUnits {
      address {
        ...AsstAddressFragment
      }
      id
      name
      internalCode
      usageType {
        ...UsageTypeFragment
      }
      type
      subNumbering
      currentCadastralUnit {
        coordinates {
          ...CadastralCoordinatesFragment
        }
      }
      estate {
        id
      }
    }
    providerSubject {
      __typename
      name
      id
      internalCode
      ... on LegalSubject {
        baseCountryTaxIdCode
      }
      ... on ManagementSubject {
        baseCountryTaxIdCode
      }
      ... on PhysicalSubject {
        professionalTaxIdCode
      }
    }
    referenceSubject {
      name
      id
      internalCode
    }
    orgUnit {
      id
      name
    }
    accountingItem {
      description
      internalCode
      id
    }
    description
    utilityUserCode
    utilityContractCode
    utilityMeterSerial
    utilityDeliveryPointCode
    isFreeMarket
    deposit
    status
    activationDate
    deactivationRequestDate
    deactivationDate
    contractPowerMaximum
    contractPowerNominal
    contractNominalTension
    notes
    id
  }
`;

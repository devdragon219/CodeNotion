// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { CostChargeConsumptionFragmentDoc } from './RealGimm.Web.CostChargeConsumption.fragment';
import { CostChargeFieldFragmentDoc } from './RealGimm.Web.CostChargeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { ReadingValueFragmentDoc } from './RealGimm.Web.ReadingValue.fragment';
import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';
import { UtilityServiceDetailFragmentDoc, UtilityServiceFragmentDoc } from './RealGimm.Web.UtilityService.fragment';

export type CostChargeFragment = {
  __typename?: 'CostCharge';
  id: number;
  referenceDate: string;
  totalAmount: number;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  invoiceNumber: string;
  totalVATAmount: number;
  invoicedConsumptionAmount: number;
  actualConsumption?: { __typename?: 'CostChargeConsumption'; since: string; until: string } | null;
  expectedConsumption?: { __typename?: 'CostChargeConsumption'; since: string; until: string } | null;
  service: {
    __typename?: 'UtilityService';
    estateIds: Array<number>;
    estateUnitIds: Array<number>;
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
    utilityType: { __typename?: 'UtilityType'; internalCode: string; description: string; measurementUnit: string };
  };
};

export type CostChargeDetailFragment = {
  __typename?: 'CostCharge';
  totalAmount: number;
  referenceDate: string;
  dueDate: string;
  invoiceNumber: string;
  totalVATAmount: number;
  periodStart: string;
  periodEnd: string;
  invoicedConsumptionAmount: number;
  id: number;
  service: {
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
  actualConsumption?: {
    __typename?: 'CostChargeConsumption';
    since: string;
    until: string;
    values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
  } | null;
  expectedConsumption?: {
    __typename?: 'CostChargeConsumption';
    since: string;
    until: string;
    values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
  } | null;
  fields: Array<{
    __typename?: 'CostChargeField';
    name: string;
    isMandatory: boolean;
    templateTypeId: string;
    type: Types.CustomFieldType;
    value?: string | null;
  }>;
};

export const CostChargeFragmentDoc = gql`
  fragment CostChargeFragment on CostCharge {
    id
    referenceDate
    totalAmount
    periodStart
    periodEnd
    dueDate
    invoiceNumber
    totalVATAmount
    invoicedConsumptionAmount
    actualConsumption {
      since
      until
    }
    expectedConsumption {
      since
      until
    }
    service {
      estateIds
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
          id
          name
        }
        addresses {
          ...AsstAddressFragment
        }
      }
      estateUnitIds
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
      utilityType {
        internalCode
        description
        measurementUnit
      }
    }
  }
`;
export const CostChargeDetailFragmentDoc = gql`
  fragment CostChargeDetailFragment on CostCharge {
    service {
      ...UtilityServiceFragment
    }
    totalAmount
    referenceDate
    dueDate
    invoiceNumber
    totalVATAmount
    periodStart
    periodEnd
    invoicedConsumptionAmount
    actualConsumption {
      ...CostChargeConsumptionFragment
    }
    expectedConsumption {
      ...CostChargeConsumptionFragment
    }
    fields {
      ...CostChargeFieldFragment
    }
    id
  }
`;

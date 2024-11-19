// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import {
  FacilityContractDetailFragmentDoc,
  FacilityContractFragmentDoc,
} from './RealGimm.Web.FacilityContract.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { InterventionTypeFragmentDoc } from './RealGimm.Web.InterventionType.fragment';
import { PriceListDetailFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';

export type TicketChecklistFragment = {
  __typename?: 'TicketChecklist';
  internalCode: string;
  name: string;
  type: Types.TicketChecklistTemplateType;
  costBaseFactor: Types.CostBaseFactor;
  rawWorkCost: number;
  safetyCost: number;
  id: number;
  catalogueType: {
    __typename?: 'CatalogueType';
    id: number;
    category: { __typename?: 'CatalogueCategory'; id: number; name: string };
    subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
  };
  estateUnit: {
    __typename?: 'EstateUnit';
    id: number;
    internalCode: string;
    grossSurface?: number | null;
    netSurface?: number | null;
  };
};

export type TicketChecklistDetailFragment = {
  __typename?: 'TicketChecklist';
  internalCode: string;
  name: string;
  type: Types.TicketChecklistTemplateType;
  costBaseFactor: Types.CostBaseFactor;
  rawWorkCost: number;
  safetyCost: number;
  preventativePlannedPeriod?: Types.PlannedPeriod | null;
  preventativeDaysOfWeek?: Array<Types.DayOfWeek> | null;
  preventativeToleranceDays?: number | null;
  id: number;
  catalogueType: {
    __typename?: 'CatalogueType';
    id: number;
    internalCode: string;
    name: string;
    notes?: string | null;
    category: {
      __typename?: 'CatalogueCategory';
      name: string;
      internalCode: string;
      id: number;
      subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
      catalogueTypes: Array<{
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        notes?: string | null;
        subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
        activities: Array<{
          __typename?: 'CatalogueTypeActivity';
          activityType: Types.CatalogueTypeActivityType;
          id: number;
          name: string;
          isMandatoryByLaw: boolean;
        }>;
        usageTypes: Array<{
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        }>;
        fields?: Array<
          Array<{
            __typename?: 'CatalogueTypeField';
            name: string;
            isMandatory: boolean;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
            id: string;
          }>
        > | null;
      }>;
    };
    subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
    activities: Array<{
      __typename?: 'CatalogueTypeActivity';
      activityType: Types.CatalogueTypeActivityType;
      id: number;
      name: string;
      isMandatoryByLaw: boolean;
    }>;
    usageTypes: Array<{
      __typename?: 'EstateUsageType';
      id: number;
      name: string;
      internalCode: string;
      ordering: number;
      isForEstate: boolean;
      isForEstateUnit: boolean;
      isForEstateSubUnit: boolean;
      isForContracts: boolean;
    }>;
    fields?: Array<
      Array<{
        __typename?: 'CatalogueTypeField';
        name: string;
        isMandatory: boolean;
        type: Types.CustomFieldType;
        validValues?: Array<string> | null;
        id: string;
      }>
    > | null;
  };
  preventativeActivities?: Array<{
    __typename?: 'CatalogueTypeActivity';
    activityType: Types.CatalogueTypeActivityType;
    id: number;
    name: string;
    isMandatoryByLaw: boolean;
  }> | null;
  preventativeInterventionType?: {
    __typename?: 'InterventionType';
    internalCode: string;
    name: string;
    id: number;
  } | null;
  preventativeCraft?: { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number } | null;
  onTriggerActivities?: Array<{
    __typename?: 'CatalogueTypeActivity';
    activityType: Types.CatalogueTypeActivityType;
    id: number;
    name: string;
    isMandatoryByLaw: boolean;
  }> | null;
  onTriggerInterventionType?: {
    __typename?: 'InterventionType';
    internalCode: string;
    name: string;
    id: number;
  } | null;
  onTriggerCraft?: { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number } | null;
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
  contract: {
    __typename?: 'FcltContract';
    id: number;
    internalCode: string;
    externalCode?: string | null;
    entryStatus: Types.EntryStatus;
    description: string;
    agreementDate?: string | null;
    effectiveDate: string;
    expirationDate: string;
    estateUnitIds: Array<number>;
    type: { __typename?: 'FcltContractType'; id: number; name: string };
    providerSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    priceLists: Array<{
      __typename?: 'PriceList';
      internalCode: string;
      name: string;
      ordering: number;
      isDefault: boolean;
      id: number;
    }>;
  };
};

export const TicketChecklistFragmentDoc = gql`
  fragment TicketChecklistFragment on TicketChecklist {
    internalCode
    name
    catalogueType {
      id
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
    }
    estateUnit {
      id
      internalCode
      grossSurface
      netSurface
    }
    type
    costBaseFactor
    rawWorkCost
    safetyCost
    id
  }
`;
export const TicketChecklistDetailFragmentDoc = gql`
  fragment TicketChecklistDetailFragment on TicketChecklist {
    internalCode
    name
    catalogueType {
      ...CatalogueTypeDetailFragment
    }
    type
    costBaseFactor
    rawWorkCost
    safetyCost
    preventativeActivities {
      ...CatalogueTypeActivityFragment
    }
    preventativePlannedPeriod
    preventativeInterventionType {
      ...InterventionTypeFragment
    }
    preventativeCraft {
      ...CraftFragment
    }
    preventativeDaysOfWeek
    preventativeToleranceDays
    onTriggerActivities {
      ...CatalogueTypeActivityFragment
    }
    onTriggerInterventionType {
      ...InterventionTypeFragment
    }
    onTriggerCraft {
      ...CraftFragment
    }
    id
    estateUnit {
      ...EstateUnitFragment
    }
    contract {
      ...FacilityContractFragment
    }
  }
`;

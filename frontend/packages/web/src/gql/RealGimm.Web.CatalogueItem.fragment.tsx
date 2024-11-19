// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueItemFieldFragmentDoc } from './RealGimm.Web.CatalogueItemField.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';

export type CatalogueItemFragment = {
  __typename?: 'CatalogueItem';
  internalCode: string;
  id: number;
  estate: { __typename?: 'Estate'; id: number };
  catalogueType: {
    __typename?: 'CatalogueType';
    id: number;
    name: string;
    category: { __typename?: 'CatalogueCategory'; id: number; name: string };
    subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
  };
};

export type CatalogueItemDetailFragment = {
  __typename?: 'CatalogueItem';
  internalCode: string;
  status: Types.EstateStatus;
  activationDate: string;
  lastMaintenanceDate: string;
  decommissioningDate?: string | null;
  id: number;
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
  fields: Array<{
    __typename?: 'CatalogueItemField';
    name: string;
    isMandatory: boolean;
    templateTypeId: string;
    type: Types.CustomFieldType;
    value?: string | null;
  }>;
};

export const CatalogueItemFragmentDoc = gql`
  fragment CatalogueItemFragment on CatalogueItem {
    estate {
      id
    }
    catalogueType {
      ...FacilityCatalogueTypeFragment
    }
    internalCode
    id
  }
`;
export const CatalogueItemDetailFragmentDoc = gql`
  fragment CatalogueItemDetailFragment on CatalogueItem {
    estate {
      ...EstateFragment
    }
    catalogueType {
      ...CatalogueTypeDetailFragment
    }
    internalCode
    status
    activationDate
    lastMaintenanceDate
    decommissioningDate
    fields {
      ...CatalogueItemFieldFragment
    }
    id
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type CatalogueTypeFragment = {
  __typename?: 'CatalogueType';
  id: number;
  internalCode: string;
  name: string;
  category: { __typename?: 'CatalogueCategory'; id: number; name: string };
  subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
  usageTypes: Array<{ __typename?: 'EstateUsageType'; id: number; name: string }>;
};

export type CatalogueCategoryCatalogueTypeDetailFragment = {
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
};

export type CatalogueTypeDetailFragment = {
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

export type FacilityCatalogueTypeFragment = {
  __typename?: 'CatalogueType';
  id: number;
  name: string;
  category: { __typename?: 'CatalogueCategory'; id: number; name: string };
  subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
};

export const CatalogueTypeFragmentDoc = gql`
  fragment CatalogueTypeFragment on CatalogueType {
    id
    internalCode
    name
    category {
      id
      name
    }
    subCategory {
      id
      name
    }
    usageTypes {
      id
      name
    }
  }
`;
export const CatalogueCategoryCatalogueTypeDetailFragmentDoc = gql`
  fragment CatalogueCategoryCatalogueTypeDetailFragment on CatalogueType {
    id
    internalCode
    name
    notes
    subCategory {
      ...CatalogueSubCategoryFragment
    }
    activities {
      ...CatalogueTypeActivityFragment
    }
    usageTypes {
      ...UsageTypeFragment
    }
    fields {
      ...CatalogueTypeFieldFragment
    }
  }
`;
export const CatalogueTypeDetailFragmentDoc = gql`
  fragment CatalogueTypeDetailFragment on CatalogueType {
    ...CatalogueCategoryCatalogueTypeDetailFragment
    category {
      ...CatalogueCategoryFragment
    }
  }
`;
export const FacilityCatalogueTypeFragmentDoc = gql`
  fragment FacilityCatalogueTypeFragment on CatalogueType {
    id
    name
    category {
      id
      name
    }
    subCategory {
      id
      name
    }
  }
`;

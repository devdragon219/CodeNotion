// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type CatalogueCategoryFragment = {
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

export const CatalogueCategoryFragmentDoc = gql`
  fragment CatalogueCategoryFragment on CatalogueCategory {
    name
    internalCode
    subCategories {
      ...CatalogueSubCategoryFragment
    }
    catalogueTypes {
      ...CatalogueCategoryCatalogueTypeDetailFragment
    }
    id
  }
`;

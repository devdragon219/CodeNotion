// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { InterventionTypeFragmentDoc } from './RealGimm.Web.InterventionType.fragment';

export type TicketChecklistTemplateFragment = {
  __typename?: 'TicketChecklistTemplate';
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
};

export type TicketChecklistTemplateDetailFragment = {
  __typename?: 'TicketChecklistTemplate';
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
};

export const TicketChecklistTemplateFragmentDoc = gql`
  fragment TicketChecklistTemplateFragment on TicketChecklistTemplate {
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
    type
    costBaseFactor
    rawWorkCost
    safetyCost
    id
  }
`;
export const TicketChecklistTemplateDetailFragmentDoc = gql`
  fragment TicketChecklistTemplateDetailFragment on TicketChecklistTemplate {
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
  }
`;

// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CalendarFragmentDoc } from './RealGimm.Web.Calendar.fragment';
import { CalendarDayFragmentDoc } from './RealGimm.Web.CalendarDay.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';

export type ComplexTicketConditionFragment = {
  __typename?: 'ComplexTicketCondition';
  booleanOperator: Types.BooleanOperator;
  internalConditions: Array<
    | { __typename?: 'ComplexTicketCondition'; id: number }
    | { __typename?: 'TicketCatalogueCategoryEqualityCondition'; id: number }
    | { __typename?: 'TicketCatalogueSubCategoryEqualityCondition'; id: number }
    | { __typename?: 'TicketCatalogueTypeEqualityCondition'; id: number }
    | { __typename?: 'TicketMasterStatusCondition'; id: number }
    | { __typename?: 'TicketPriorityEqualityCondition'; id: number }
    | { __typename?: 'TicketTypeEqualityCondition'; id: number }
  >;
};

export type TicketCatalogueCategoryEqualityConditionFragment = {
  __typename?: 'TicketCatalogueCategoryEqualityCondition';
  equalityOperator: Types.EqualityOperator;
  targetCatalogueCategory: {
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
};

export type TicketCatalogueSubCategoryEqualityConditionFragment = {
  __typename?: 'TicketCatalogueSubCategoryEqualityCondition';
  equalityOperator: Types.EqualityOperator;
  targetCatalogueSubCategory: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number };
};

export type TicketCatalogueTypeEqualityConditionFragment = {
  __typename?: 'TicketCatalogueTypeEqualityCondition';
  equalityOperator: Types.EqualityOperator;
  targetCatalogueType: {
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
};

export type TicketMasterStatusConditionFragment = {
  __typename?: 'TicketMasterStatusCondition';
  targetMasterStatus: Types.TicketMasterStatus;
  minTimePeriodInMinutes?: number | null;
  maxTimePeriodInMinutes?: number | null;
  comparisonOperator: Types.ComparisonOperator;
  calendar: {
    __typename?: 'Calendar';
    name: string;
    timeZoneId: string;
    id: number;
    sunday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    monday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    tuesday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    wednesday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    thursday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    friday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    saturday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    holidays: Array<{
      __typename?: 'Holiday';
      name: string;
      date: string;
      periodicity: Types.HolidayPeriodicity;
      id: number;
    }>;
  };
};

export type TicketPriorityEqualityConditionFragment = {
  __typename?: 'TicketPriorityEqualityCondition';
  targetPriority: Types.Priority;
  equalityOperator: Types.EqualityOperator;
};

export type TicketTypeEqualityConditionFragment = {
  __typename?: 'TicketTypeEqualityCondition';
  equalityOperator: Types.EqualityOperator;
  targetTicketType: { __typename?: 'TicketType'; id: number; description: string };
};

export type TicketConditionFragment_ComplexTicketCondition = {
  __typename: 'ComplexTicketCondition';
  id: number;
  booleanOperator: Types.BooleanOperator;
  internalConditions: Array<
    | { __typename?: 'ComplexTicketCondition'; id: number }
    | { __typename?: 'TicketCatalogueCategoryEqualityCondition'; id: number }
    | { __typename?: 'TicketCatalogueSubCategoryEqualityCondition'; id: number }
    | { __typename?: 'TicketCatalogueTypeEqualityCondition'; id: number }
    | { __typename?: 'TicketMasterStatusCondition'; id: number }
    | { __typename?: 'TicketPriorityEqualityCondition'; id: number }
    | { __typename?: 'TicketTypeEqualityCondition'; id: number }
  >;
};

export type TicketConditionFragment_TicketCatalogueCategoryEqualityCondition = {
  __typename: 'TicketCatalogueCategoryEqualityCondition';
  id: number;
  equalityOperator: Types.EqualityOperator;
  targetCatalogueCategory: {
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
};

export type TicketConditionFragment_TicketCatalogueSubCategoryEqualityCondition = {
  __typename: 'TicketCatalogueSubCategoryEqualityCondition';
  id: number;
  equalityOperator: Types.EqualityOperator;
  targetCatalogueSubCategory: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number };
};

export type TicketConditionFragment_TicketCatalogueTypeEqualityCondition = {
  __typename: 'TicketCatalogueTypeEqualityCondition';
  id: number;
  equalityOperator: Types.EqualityOperator;
  targetCatalogueType: {
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
};

export type TicketConditionFragment_TicketMasterStatusCondition = {
  __typename: 'TicketMasterStatusCondition';
  id: number;
  targetMasterStatus: Types.TicketMasterStatus;
  minTimePeriodInMinutes?: number | null;
  maxTimePeriodInMinutes?: number | null;
  comparisonOperator: Types.ComparisonOperator;
  calendar: {
    __typename?: 'Calendar';
    name: string;
    timeZoneId: string;
    id: number;
    sunday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    monday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    tuesday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    wednesday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    thursday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    friday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    saturday?: {
      __typename?: 'CalendarDay';
      dayOfWeek: Types.DayOfWeek;
      id: number;
      timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
    } | null;
    holidays: Array<{
      __typename?: 'Holiday';
      name: string;
      date: string;
      periodicity: Types.HolidayPeriodicity;
      id: number;
    }>;
  };
};

export type TicketConditionFragment_TicketPriorityEqualityCondition = {
  __typename: 'TicketPriorityEqualityCondition';
  id: number;
  targetPriority: Types.Priority;
  equalityOperator: Types.EqualityOperator;
};

export type TicketConditionFragment_TicketTypeEqualityCondition = {
  __typename: 'TicketTypeEqualityCondition';
  id: number;
  equalityOperator: Types.EqualityOperator;
  targetTicketType: { __typename?: 'TicketType'; id: number; description: string };
};

export type TicketConditionFragment =
  | TicketConditionFragment_ComplexTicketCondition
  | TicketConditionFragment_TicketCatalogueCategoryEqualityCondition
  | TicketConditionFragment_TicketCatalogueSubCategoryEqualityCondition
  | TicketConditionFragment_TicketCatalogueTypeEqualityCondition
  | TicketConditionFragment_TicketMasterStatusCondition
  | TicketConditionFragment_TicketPriorityEqualityCondition
  | TicketConditionFragment_TicketTypeEqualityCondition;

export const ComplexTicketConditionFragmentDoc = gql`
  fragment ComplexTicketConditionFragment on ComplexTicketCondition {
    booleanOperator: operator
    internalConditions {
      id
    }
  }
`;
export const TicketCatalogueCategoryEqualityConditionFragmentDoc = gql`
  fragment TicketCatalogueCategoryEqualityConditionFragment on TicketCatalogueCategoryEqualityCondition {
    equalityOperator: operator
    targetCatalogueCategory {
      ...CatalogueCategoryFragment
    }
  }
`;
export const TicketCatalogueSubCategoryEqualityConditionFragmentDoc = gql`
  fragment TicketCatalogueSubCategoryEqualityConditionFragment on TicketCatalogueSubCategoryEqualityCondition {
    equalityOperator: operator
    targetCatalogueSubCategory {
      ...CatalogueSubCategoryFragment
    }
  }
`;
export const TicketCatalogueTypeEqualityConditionFragmentDoc = gql`
  fragment TicketCatalogueTypeEqualityConditionFragment on TicketCatalogueTypeEqualityCondition {
    equalityOperator: operator
    targetCatalogueType {
      ...CatalogueTypeDetailFragment
    }
  }
`;
export const TicketMasterStatusConditionFragmentDoc = gql`
  fragment TicketMasterStatusConditionFragment on TicketMasterStatusCondition {
    targetMasterStatus
    comparisonOperator: timeComparisonOperator
    calendar {
      ...CalendarFragment
    }
    minTimePeriodInMinutes
    maxTimePeriodInMinutes
  }
`;
export const TicketPriorityEqualityConditionFragmentDoc = gql`
  fragment TicketPriorityEqualityConditionFragment on TicketPriorityEqualityCondition {
    equalityOperator: operator
    targetPriority
  }
`;
export const TicketTypeEqualityConditionFragmentDoc = gql`
  fragment TicketTypeEqualityConditionFragment on TicketTypeEqualityCondition {
    equalityOperator: operator
    targetTicketType {
      id
      description
    }
  }
`;
export const TicketConditionFragmentDoc = gql`
  fragment TicketConditionFragment on TicketCondition {
    __typename
    id
    ... on ComplexTicketCondition {
      ...ComplexTicketConditionFragment
    }
    ... on TicketCatalogueCategoryEqualityCondition {
      ...TicketCatalogueCategoryEqualityConditionFragment
    }
    ... on TicketCatalogueSubCategoryEqualityCondition {
      ...TicketCatalogueSubCategoryEqualityConditionFragment
    }
    ... on TicketCatalogueTypeEqualityCondition {
      ...TicketCatalogueTypeEqualityConditionFragment
    }
    ... on TicketMasterStatusCondition {
      ...TicketMasterStatusConditionFragment
    }
    ... on TicketPriorityEqualityCondition {
      ...TicketPriorityEqualityConditionFragment
    }
    ... on TicketTypeEqualityCondition {
      ...TicketTypeEqualityConditionFragment
    }
  }
`;

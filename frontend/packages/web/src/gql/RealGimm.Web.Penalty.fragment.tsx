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
import {
  ComplexTicketConditionFragmentDoc,
  TicketCatalogueCategoryEqualityConditionFragmentDoc,
  TicketCatalogueSubCategoryEqualityConditionFragmentDoc,
  TicketCatalogueTypeEqualityConditionFragmentDoc,
  TicketConditionFragmentDoc,
  TicketMasterStatusConditionFragmentDoc,
  TicketPriorityEqualityConditionFragmentDoc,
  TicketTypeEqualityConditionFragmentDoc,
} from './RealGimm.Web.TicketCondition.fragment';

export type PenaltyFragment = { __typename?: 'Penalty'; internalCode: string; description: string; id: number };

export type PenaltyDetailFragment = {
  __typename?: 'Penalty';
  internalCode: string;
  description: string;
  thenOperator: Types.BooleanOperator;
  id: number;
  ifCondition: { __typename?: 'ComplexTicketCondition'; id: number };
  flatIfConditions: Array<
    | {
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
      }
    | {
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
            subCategory?: {
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            } | null;
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
      }
    | {
        __typename: 'TicketCatalogueSubCategoryEqualityCondition';
        id: number;
        equalityOperator: Types.EqualityOperator;
        targetCatalogueSubCategory: {
          __typename?: 'CatalogueSubCategory';
          name: string;
          internalCode: string;
          id: number;
        };
      }
    | {
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
            subCategories: Array<{
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            }>;
            catalogueTypes: Array<{
              __typename?: 'CatalogueType';
              id: number;
              internalCode: string;
              name: string;
              notes?: string | null;
              subCategory?: {
                __typename?: 'CatalogueSubCategory';
                name: string;
                internalCode: string;
                id: number;
              } | null;
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
      }
    | {
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
      }
    | {
        __typename: 'TicketPriorityEqualityCondition';
        id: number;
        targetPriority: Types.Priority;
        equalityOperator: Types.EqualityOperator;
      }
    | {
        __typename: 'TicketTypeEqualityCondition';
        id: number;
        equalityOperator: Types.EqualityOperator;
        targetTicketType: { __typename?: 'TicketType'; id: number; description: string };
      }
  >;
  thenPenalties: Array<{ __typename?: 'PenaltyValue'; type: Types.PenaltyType; amount: number; id: number }>;
};

export const PenaltyFragmentDoc = gql`
  fragment PenaltyFragment on Penalty {
    internalCode
    description
    id
  }
`;
export const PenaltyDetailFragmentDoc = gql`
  fragment PenaltyDetailFragment on Penalty {
    internalCode
    description
    ifCondition {
      id
    }
    flatIfConditions {
      ...TicketConditionFragment
    }
    thenOperator
    thenPenalties {
      type
      amount
      id
    }
    id
  }
`;

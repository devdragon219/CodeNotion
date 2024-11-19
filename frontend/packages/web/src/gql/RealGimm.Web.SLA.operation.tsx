// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

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
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { SlaDetailFragmentDoc, SlaFragmentDoc } from './RealGimm.Web.SLA.fragment';
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
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetSlasQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.SlaFilterInput>;
  order?: Types.InputMaybe<Array<Types.SlaSortInput> | Types.SlaSortInput>;
}>;

export type GetSlasQuery = {
  __typename?: 'Query';
  sla: {
    __typename?: 'SLAQueries';
    listSLAs?: {
      __typename?: 'ListSLAsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'SLA'; internalCode: string; description: string; id: number }> | null;
    } | null;
  };
};

export type GetAllSlasQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SlaFilterInput>;
  order?: Types.InputMaybe<Array<Types.SlaSortInput> | Types.SlaSortInput>;
}>;

export type GetAllSlasQuery = {
  __typename?: 'Query';
  sla: {
    __typename?: 'SLAQueries';
    listSLAsFull: Array<{
      __typename?: 'SLA';
      internalCode: string;
      description: string;
      id: number;
      ifCondition: {
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
      thenCondition: {
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
      flatThenConditions: Array<
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
    }>;
  };
};

export type AddSlasMutationVariables = Types.Exact<{
  inputs: Array<Types.SlaInput> | Types.SlaInput;
}>;

export type AddSlasMutation = {
  __typename?: 'Mutation';
  sla: {
    __typename?: 'SLAMutations';
    addRange: {
      __typename?: 'ResultOfSLA__';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: Array<{
        __typename?: 'SLA';
        internalCode: string;
        description: string;
        id: number;
        ifCondition: {
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
        thenCondition: {
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
        flatThenConditions: Array<
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
      } | null> | null;
    };
  };
};

export type UpdateSlaMutationVariables = Types.Exact<{
  slaId: Types.Scalars['Int']['input'];
  input: Types.SlaInput;
}>;

export type UpdateSlaMutation = {
  __typename?: 'Mutation';
  sla: {
    __typename?: 'SLAMutations';
    update: {
      __typename?: 'ResultOfSLA';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type DeleteSlasMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteSlasMutation = {
  __typename?: 'Mutation';
  sla: {
    __typename?: 'SLAMutations';
    deleteRange: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type GetSlaInternalCodeQueryVariables = Types.Exact<{
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
  contractInternalCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetSlaInternalCodeQuery = {
  __typename?: 'Query';
  sla: { __typename?: 'SLAQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseSlaInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentSlaId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseSlaInternalCodeQuery = {
  __typename?: 'Query';
  sla: { __typename?: 'SLAQueries'; canUseInternalCode: boolean };
};

export type ExportSlasQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SlaFilterInput>;
  order?: Types.InputMaybe<Array<Types.SlaSortInput> | Types.SlaSortInput>;
}>;

export type ExportSlasQuery = {
  __typename?: 'Query';
  sla: { __typename?: 'SLAQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetSlaQueryVariables = Types.Exact<{
  slaId: Types.Scalars['Int']['input'];
}>;

export type GetSlaQuery = {
  __typename?: 'Query';
  sla: {
    __typename?: 'SLAQueries';
    get?: {
      __typename?: 'SLA';
      internalCode: string;
      description: string;
      id: number;
      ifCondition: {
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
      thenCondition: {
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
      flatThenConditions: Array<
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
    } | null;
  };
};

export type DeleteSlaMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteSlaMutation = {
  __typename?: 'Mutation';
  sla: {
    __typename?: 'SLAMutations';
    delete: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export const GetSlasDocument = gql`
  query getSlas(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: SLAFilterInput
    $order: [SLASortInput!]
  ) {
    sla {
      listSLAs(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...SlaFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${SlaFragmentDoc}
`;

export function useGetSlasQuery(options?: Omit<Urql.UseQueryArgs<GetSlasQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSlasQuery, GetSlasQueryVariables>({ query: GetSlasDocument, ...options });
}
export const GetAllSlasDocument = gql`
  query getAllSlas($where: SLAFilterInput, $order: [SLASortInput!]) {
    sla {
      listSLAsFull(where: $where, order: $order) {
        ...SlaDetailFragment
      }
    }
  }
  ${SlaDetailFragmentDoc}
  ${TicketConditionFragmentDoc}
  ${ComplexTicketConditionFragmentDoc}
  ${TicketCatalogueCategoryEqualityConditionFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${TicketCatalogueSubCategoryEqualityConditionFragmentDoc}
  ${TicketCatalogueTypeEqualityConditionFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${TicketMasterStatusConditionFragmentDoc}
  ${CalendarFragmentDoc}
  ${CalendarDayFragmentDoc}
  ${TicketPriorityEqualityConditionFragmentDoc}
  ${TicketTypeEqualityConditionFragmentDoc}
`;

export function useGetAllSlasQuery(options?: Omit<Urql.UseQueryArgs<GetAllSlasQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllSlasQuery, GetAllSlasQueryVariables>({ query: GetAllSlasDocument, ...options });
}
export const AddSlasDocument = gql`
  mutation addSlas($inputs: [SLAInput!]!) {
    sla {
      addRange(inputs: $inputs) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...SlaDetailFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${SlaDetailFragmentDoc}
  ${TicketConditionFragmentDoc}
  ${ComplexTicketConditionFragmentDoc}
  ${TicketCatalogueCategoryEqualityConditionFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${TicketCatalogueSubCategoryEqualityConditionFragmentDoc}
  ${TicketCatalogueTypeEqualityConditionFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${TicketMasterStatusConditionFragmentDoc}
  ${CalendarFragmentDoc}
  ${CalendarDayFragmentDoc}
  ${TicketPriorityEqualityConditionFragmentDoc}
  ${TicketTypeEqualityConditionFragmentDoc}
`;

export function useAddSlasMutation() {
  return Urql.useMutation<AddSlasMutation, AddSlasMutationVariables>(AddSlasDocument);
}
export const UpdateSlaDocument = gql`
  mutation updateSla($slaId: Int!, $input: SLAInput!) {
    sla {
      update(id: $slaId, input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateSlaMutation() {
  return Urql.useMutation<UpdateSlaMutation, UpdateSlaMutationVariables>(UpdateSlaDocument);
}
export const DeleteSlasDocument = gql`
  mutation deleteSlas($ids: [Int!]!) {
    sla {
      deleteRange(ids: $ids) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteSlasMutation() {
  return Urql.useMutation<DeleteSlasMutation, DeleteSlasMutationVariables>(DeleteSlasDocument);
}
export const GetSlaInternalCodeDocument = gql`
  query getSlaInternalCode($additionallyOccupiedCodes: [String!]!, $contractInternalCode: String) {
    sla {
      proposeNewInternalCode(
        additionallyOccupiedCodes: $additionallyOccupiedCodes
        contractInternalCode: $contractInternalCode
      )
    }
  }
`;

export function useGetSlaInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetSlaInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetSlaInternalCodeQuery, GetSlaInternalCodeQueryVariables>({
    query: GetSlaInternalCodeDocument,
    ...options,
  });
}
export const CanUseSlaInternalCodeDocument = gql`
  query canUseSlaInternalCode($internalCode: String!, $currentSlaId: Int) {
    sla {
      canUseInternalCode(internalCode: $internalCode, currentSLAId: $currentSlaId)
    }
  }
`;

export function useCanUseSlaInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseSlaInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseSlaInternalCodeQuery, CanUseSlaInternalCodeQueryVariables>({
    query: CanUseSlaInternalCodeDocument,
    ...options,
  });
}
export const ExportSlasDocument = gql`
  query exportSlas($where: SLAFilterInput, $order: [SLASortInput!]) {
    sla {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportSlasQuery(options?: Omit<Urql.UseQueryArgs<ExportSlasQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportSlasQuery, ExportSlasQueryVariables>({ query: ExportSlasDocument, ...options });
}
export const GetSlaDocument = gql`
  query getSla($slaId: Int!) {
    sla {
      get(id: $slaId) {
        ...SlaDetailFragment
      }
    }
  }
  ${SlaDetailFragmentDoc}
  ${TicketConditionFragmentDoc}
  ${ComplexTicketConditionFragmentDoc}
  ${TicketCatalogueCategoryEqualityConditionFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${TicketCatalogueSubCategoryEqualityConditionFragmentDoc}
  ${TicketCatalogueTypeEqualityConditionFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${TicketMasterStatusConditionFragmentDoc}
  ${CalendarFragmentDoc}
  ${CalendarDayFragmentDoc}
  ${TicketPriorityEqualityConditionFragmentDoc}
  ${TicketTypeEqualityConditionFragmentDoc}
`;

export function useGetSlaQuery(options: Omit<Urql.UseQueryArgs<GetSlaQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSlaQuery, GetSlaQueryVariables>({ query: GetSlaDocument, ...options });
}
export const DeleteSlaDocument = gql`
  mutation deleteSla($id: Int!) {
    sla {
      delete(id: $id) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteSlaMutation() {
  return Urql.useMutation<DeleteSlaMutation, DeleteSlaMutationVariables>(DeleteSlaDocument);
}

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
import {
  FacilityContractTemplateDetailFragmentDoc,
  FacilityContractTemplateFragmentDoc,
} from './RealGimm.Web.FacilityContractTemplate.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PenaltyDetailFragmentDoc } from './RealGimm.Web.Penalty.fragment';
import { SlaDetailFragmentDoc } from './RealGimm.Web.SLA.fragment';
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

export type GetFacilityContractTemplatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ContractTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractTemplateSortInput> | Types.ContractTemplateSortInput>;
}>;

export type GetFacilityContractTemplatesQuery = {
  __typename?: 'Query';
  contractTemplate: {
    __typename?: 'ContractTemplateQueries';
    listContractTemplates?: {
      __typename?: 'ListContractTemplatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ContractTemplate';
        id: number;
        description: string;
        internalCode: string;
        contractType: { __typename?: 'FcltContractType'; id: number; name: string };
        catalogueTypes: Array<{
          __typename?: 'CatalogueType';
          id: number;
          name: string;
          category: { __typename?: 'CatalogueCategory'; id: number; name: string };
          subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        }>;
      }> | null;
    } | null;
  };
};

export type GetFullFacilityContractTemplatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ContractTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractTemplateSortInput> | Types.ContractTemplateSortInput>;
}>;

export type GetFullFacilityContractTemplatesQuery = {
  __typename?: 'Query';
  contractTemplate: {
    __typename?: 'ContractTemplateQueries';
    listContractTemplates?: {
      __typename?: 'ListContractTemplatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ContractTemplate';
        id: number;
        description: string;
        internalCode: string;
        contractType: { __typename?: 'FcltContractType'; id: number; name: string };
        catalogueTypes: Array<{
          __typename?: 'CatalogueType';
          id: number;
          name: string;
          category: { __typename?: 'CatalogueCategory'; id: number; name: string };
          subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        }>;
        slas: Array<{
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
        penalties: Array<{
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
          thenPenalties: Array<{ __typename?: 'PenaltyValue'; type: Types.PenaltyType; amount: number; id: number }>;
        }>;
      }> | null;
    } | null;
  };
};

export type AddFacilityContractTemplateMutationVariables = Types.Exact<{
  input: Types.ContractTemplateInput;
}>;

export type AddFacilityContractTemplateMutation = {
  __typename?: 'Mutation';
  contractTemplate: {
    __typename?: 'ContractTemplateMutations';
    add: {
      __typename?: 'ResultOfContractTemplate';
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

export type UpdateFacilityContractTemplateMutationVariables = Types.Exact<{
  facilityContractTemplateId: Types.Scalars['Int']['input'];
  input: Types.ContractTemplateInput;
}>;

export type UpdateFacilityContractTemplateMutation = {
  __typename?: 'Mutation';
  contractTemplate: {
    __typename?: 'ContractTemplateMutations';
    update: {
      __typename?: 'ResultOfContractTemplate';
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

export type DeleteFacilityContractTemplatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteFacilityContractTemplatesMutation = {
  __typename?: 'Mutation';
  contractTemplate: {
    __typename?: 'ContractTemplateMutations';
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

export type GetFacilityContractTemplateInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFacilityContractTemplateInternalCodeQuery = {
  __typename?: 'Query';
  contractTemplate: { __typename?: 'ContractTemplateQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseFacilityContractTemplateInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentFacilityContractTemplateId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseFacilityContractTemplateInternalCodeQuery = {
  __typename?: 'Query';
  contractTemplate: { __typename?: 'ContractTemplateQueries'; canUseInternalCode: boolean };
};

export type ExportFacilityContractTemplatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractTemplateSortInput> | Types.ContractTemplateSortInput>;
}>;

export type ExportFacilityContractTemplatesQuery = {
  __typename?: 'Query';
  contractTemplate: {
    __typename?: 'ContractTemplateQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetFacilityContractTemplateQueryVariables = Types.Exact<{
  facilityContractTemplateId: Types.Scalars['Int']['input'];
}>;

export type GetFacilityContractTemplateQuery = {
  __typename?: 'Query';
  contractTemplate: {
    __typename?: 'ContractTemplateQueries';
    get?: {
      __typename?: 'ContractTemplate';
      id: number;
      description: string;
      internalCode: string;
      contractType: { __typename?: 'FcltContractType'; id: number; name: string };
      catalogueTypes: Array<{
        __typename?: 'CatalogueType';
        id: number;
        name: string;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      }>;
      slas: Array<{
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
      penalties: Array<{
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
        thenPenalties: Array<{ __typename?: 'PenaltyValue'; type: Types.PenaltyType; amount: number; id: number }>;
      }>;
    } | null;
  };
};

export type DeleteFacilityContractTemplateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteFacilityContractTemplateMutation = {
  __typename?: 'Mutation';
  contractTemplate: {
    __typename?: 'ContractTemplateMutations';
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

export const GetFacilityContractTemplatesDocument = gql`
  query getFacilityContractTemplates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ContractTemplateFilterInput
    $order: [ContractTemplateSortInput!]
  ) {
    contractTemplate {
      listContractTemplates(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FacilityContractTemplateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FacilityContractTemplateFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
`;

export function useGetFacilityContractTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractTemplatesQuery, GetFacilityContractTemplatesQueryVariables>({
    query: GetFacilityContractTemplatesDocument,
    ...options,
  });
}
export const GetFullFacilityContractTemplatesDocument = gql`
  query getFullFacilityContractTemplates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ContractTemplateFilterInput
    $order: [ContractTemplateSortInput!]
  ) {
    contractTemplate {
      listContractTemplates(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FacilityContractTemplateDetailFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FacilityContractTemplateDetailFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
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
  ${PenaltyDetailFragmentDoc}
`;

export function useGetFullFacilityContractTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetFullFacilityContractTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFullFacilityContractTemplatesQuery, GetFullFacilityContractTemplatesQueryVariables>({
    query: GetFullFacilityContractTemplatesDocument,
    ...options,
  });
}
export const AddFacilityContractTemplateDocument = gql`
  mutation addFacilityContractTemplate($input: ContractTemplateInput!) {
    contractTemplate {
      add(input: $input) {
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

export function useAddFacilityContractTemplateMutation() {
  return Urql.useMutation<AddFacilityContractTemplateMutation, AddFacilityContractTemplateMutationVariables>(
    AddFacilityContractTemplateDocument,
  );
}
export const UpdateFacilityContractTemplateDocument = gql`
  mutation updateFacilityContractTemplate($facilityContractTemplateId: Int!, $input: ContractTemplateInput!) {
    contractTemplate {
      update(id: $facilityContractTemplateId, input: $input) {
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

export function useUpdateFacilityContractTemplateMutation() {
  return Urql.useMutation<UpdateFacilityContractTemplateMutation, UpdateFacilityContractTemplateMutationVariables>(
    UpdateFacilityContractTemplateDocument,
  );
}
export const DeleteFacilityContractTemplatesDocument = gql`
  mutation deleteFacilityContractTemplates($ids: [Int!]!) {
    contractTemplate {
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

export function useDeleteFacilityContractTemplatesMutation() {
  return Urql.useMutation<DeleteFacilityContractTemplatesMutation, DeleteFacilityContractTemplatesMutationVariables>(
    DeleteFacilityContractTemplatesDocument,
  );
}
export const GetFacilityContractTemplateInternalCodeDocument = gql`
  query getFacilityContractTemplateInternalCode {
    contractTemplate {
      proposeNewInternalCode
    }
  }
`;

export function useGetFacilityContractTemplateInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractTemplateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetFacilityContractTemplateInternalCodeQuery,
    GetFacilityContractTemplateInternalCodeQueryVariables
  >({ query: GetFacilityContractTemplateInternalCodeDocument, ...options });
}
export const CanUseFacilityContractTemplateInternalCodeDocument = gql`
  query canUseFacilityContractTemplateInternalCode($internalCode: String!, $currentFacilityContractTemplateId: Int) {
    contractTemplate {
      canUseInternalCode(internalCode: $internalCode, currentContractTemplateId: $currentFacilityContractTemplateId)
    }
  }
`;

export function useCanUseFacilityContractTemplateInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseFacilityContractTemplateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUseFacilityContractTemplateInternalCodeQuery,
    CanUseFacilityContractTemplateInternalCodeQueryVariables
  >({ query: CanUseFacilityContractTemplateInternalCodeDocument, ...options });
}
export const ExportFacilityContractTemplatesDocument = gql`
  query exportFacilityContractTemplates($where: ContractTemplateFilterInput, $order: [ContractTemplateSortInput!]) {
    contractTemplate {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportFacilityContractTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportFacilityContractTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportFacilityContractTemplatesQuery, ExportFacilityContractTemplatesQueryVariables>({
    query: ExportFacilityContractTemplatesDocument,
    ...options,
  });
}
export const GetFacilityContractTemplateDocument = gql`
  query getFacilityContractTemplate($facilityContractTemplateId: Int!) {
    contractTemplate {
      get(id: $facilityContractTemplateId) {
        ...FacilityContractTemplateDetailFragment
      }
    }
  }
  ${FacilityContractTemplateDetailFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
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
  ${PenaltyDetailFragmentDoc}
`;

export function useGetFacilityContractTemplateQuery(
  options: Omit<Urql.UseQueryArgs<GetFacilityContractTemplateQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractTemplateQuery, GetFacilityContractTemplateQueryVariables>({
    query: GetFacilityContractTemplateDocument,
    ...options,
  });
}
export const DeleteFacilityContractTemplateDocument = gql`
  mutation deleteFacilityContractTemplate($id: Int!) {
    contractTemplate {
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

export function useDeleteFacilityContractTemplateMutation() {
  return Urql.useMutation<DeleteFacilityContractTemplateMutation, DeleteFacilityContractTemplateMutationVariables>(
    DeleteFacilityContractTemplateDocument,
  );
}

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
import { PenaltyDetailFragmentDoc, PenaltyFragmentDoc } from './RealGimm.Web.Penalty.fragment';
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

export type GetPenaltiesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.PenaltyFilterInput>;
  order?: Types.InputMaybe<Array<Types.PenaltySortInput> | Types.PenaltySortInput>;
}>;

export type GetPenaltiesQuery = {
  __typename?: 'Query';
  penalty: {
    __typename?: 'PenaltyQueries';
    listPenalties?: {
      __typename?: 'ListPenaltiesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'Penalty'; internalCode: string; description: string; id: number }> | null;
    } | null;
  };
};

export type GetAllPenaltiesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PenaltyFilterInput>;
  order?: Types.InputMaybe<Array<Types.PenaltySortInput> | Types.PenaltySortInput>;
}>;

export type GetAllPenaltiesQuery = {
  __typename?: 'Query';
  penalty: {
    __typename?: 'PenaltyQueries';
    listPenaltiesFull: Array<{
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
  };
};

export type AddPenaltiesMutationVariables = Types.Exact<{
  inputs: Array<Types.PenaltyInput> | Types.PenaltyInput;
}>;

export type AddPenaltiesMutation = {
  __typename?: 'Mutation';
  penalty: {
    __typename?: 'PenaltyMutations';
    addRange: {
      __typename?: 'ResultOfPenalty__';
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
      } | null> | null;
    };
  };
};

export type UpdatePenaltyMutationVariables = Types.Exact<{
  penaltyId: Types.Scalars['Int']['input'];
  input: Types.PenaltyInput;
}>;

export type UpdatePenaltyMutation = {
  __typename?: 'Mutation';
  penalty: {
    __typename?: 'PenaltyMutations';
    update: {
      __typename?: 'ResultOfPenalty';
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

export type DeletePenaltiesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeletePenaltiesMutation = {
  __typename?: 'Mutation';
  penalty: {
    __typename?: 'PenaltyMutations';
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

export type GetPenaltyInternalCodeQueryVariables = Types.Exact<{
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
  contractInternalCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetPenaltyInternalCodeQuery = {
  __typename?: 'Query';
  penalty: { __typename?: 'PenaltyQueries'; proposeNewInternalCode?: string | null };
};

export type CanUsePenaltyInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentPenaltyId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUsePenaltyInternalCodeQuery = {
  __typename?: 'Query';
  penalty: { __typename?: 'PenaltyQueries'; canUseInternalCode: boolean };
};

export type ExportPenaltiesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PenaltyFilterInput>;
  order?: Types.InputMaybe<Array<Types.PenaltySortInput> | Types.PenaltySortInput>;
}>;

export type ExportPenaltiesQuery = {
  __typename?: 'Query';
  penalty: { __typename?: 'PenaltyQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetPenaltyQueryVariables = Types.Exact<{
  penaltyId: Types.Scalars['Int']['input'];
}>;

export type GetPenaltyQuery = {
  __typename?: 'Query';
  penalty: {
    __typename?: 'PenaltyQueries';
    get?: {
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
    } | null;
  };
};

export type DeletePenaltyMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeletePenaltyMutation = {
  __typename?: 'Mutation';
  penalty: {
    __typename?: 'PenaltyMutations';
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

export const GetPenaltiesDocument = gql`
  query getPenalties(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: PenaltyFilterInput
    $order: [PenaltySortInput!]
  ) {
    penalty {
      listPenalties(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...PenaltyFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${PenaltyFragmentDoc}
`;

export function useGetPenaltiesQuery(options?: Omit<Urql.UseQueryArgs<GetPenaltiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPenaltiesQuery, GetPenaltiesQueryVariables>({ query: GetPenaltiesDocument, ...options });
}
export const GetAllPenaltiesDocument = gql`
  query getAllPenalties($where: PenaltyFilterInput, $order: [PenaltySortInput!]) {
    penalty {
      listPenaltiesFull(where: $where, order: $order) {
        ...PenaltyDetailFragment
      }
    }
  }
  ${PenaltyDetailFragmentDoc}
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

export function useGetAllPenaltiesQuery(options?: Omit<Urql.UseQueryArgs<GetAllPenaltiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllPenaltiesQuery, GetAllPenaltiesQueryVariables>({
    query: GetAllPenaltiesDocument,
    ...options,
  });
}
export const AddPenaltiesDocument = gql`
  mutation addPenalties($inputs: [PenaltyInput!]!) {
    penalty {
      addRange(inputs: $inputs) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...PenaltyDetailFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${PenaltyDetailFragmentDoc}
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

export function useAddPenaltiesMutation() {
  return Urql.useMutation<AddPenaltiesMutation, AddPenaltiesMutationVariables>(AddPenaltiesDocument);
}
export const UpdatePenaltyDocument = gql`
  mutation updatePenalty($penaltyId: Int!, $input: PenaltyInput!) {
    penalty {
      update(id: $penaltyId, input: $input) {
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

export function useUpdatePenaltyMutation() {
  return Urql.useMutation<UpdatePenaltyMutation, UpdatePenaltyMutationVariables>(UpdatePenaltyDocument);
}
export const DeletePenaltiesDocument = gql`
  mutation deletePenalties($ids: [Int!]!) {
    penalty {
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

export function useDeletePenaltiesMutation() {
  return Urql.useMutation<DeletePenaltiesMutation, DeletePenaltiesMutationVariables>(DeletePenaltiesDocument);
}
export const GetPenaltyInternalCodeDocument = gql`
  query getPenaltyInternalCode($additionallyOccupiedCodes: [String!]!, $contractInternalCode: String) {
    penalty {
      proposeNewInternalCode(
        additionallyOccupiedCodes: $additionallyOccupiedCodes
        contractInternalCode: $contractInternalCode
      )
    }
  }
`;

export function useGetPenaltyInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetPenaltyInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPenaltyInternalCodeQuery, GetPenaltyInternalCodeQueryVariables>({
    query: GetPenaltyInternalCodeDocument,
    ...options,
  });
}
export const CanUsePenaltyInternalCodeDocument = gql`
  query canUsePenaltyInternalCode($internalCode: String!, $currentPenaltyId: Int) {
    penalty {
      canUseInternalCode(internalCode: $internalCode, currentPenaltyId: $currentPenaltyId)
    }
  }
`;

export function useCanUsePenaltyInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUsePenaltyInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUsePenaltyInternalCodeQuery, CanUsePenaltyInternalCodeQueryVariables>({
    query: CanUsePenaltyInternalCodeDocument,
    ...options,
  });
}
export const ExportPenaltiesDocument = gql`
  query exportPenalties($where: PenaltyFilterInput, $order: [PenaltySortInput!]) {
    penalty {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportPenaltiesQuery(options?: Omit<Urql.UseQueryArgs<ExportPenaltiesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportPenaltiesQuery, ExportPenaltiesQueryVariables>({
    query: ExportPenaltiesDocument,
    ...options,
  });
}
export const GetPenaltyDocument = gql`
  query getPenalty($penaltyId: Int!) {
    penalty {
      get(id: $penaltyId) {
        ...PenaltyDetailFragment
      }
    }
  }
  ${PenaltyDetailFragmentDoc}
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

export function useGetPenaltyQuery(options: Omit<Urql.UseQueryArgs<GetPenaltyQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPenaltyQuery, GetPenaltyQueryVariables>({ query: GetPenaltyDocument, ...options });
}
export const DeletePenaltyDocument = gql`
  mutation deletePenalty($id: Int!) {
    penalty {
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

export function useDeletePenaltyMutation() {
  return Urql.useMutation<DeletePenaltyMutation, DeletePenaltyMutationVariables>(DeletePenaltyDocument);
}

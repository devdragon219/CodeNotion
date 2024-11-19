// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
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
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFragmentDoc } from './RealGimm.Web.EstateUnitGroup.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import {
  FacilityContractDetailFragmentDoc,
  FacilityContractFragmentDoc,
} from './RealGimm.Web.FacilityContract.fragment';
import { FacilityContractTemplateDetailFragmentDoc } from './RealGimm.Web.FacilityContractTemplate.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PenaltyDetailFragmentDoc } from './RealGimm.Web.Penalty.fragment';
import { PriceListDetailFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { SlaDetailFragmentDoc } from './RealGimm.Web.SLA.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { TicketChecklistDetailFragmentDoc, TicketChecklistFragmentDoc } from './RealGimm.Web.TicketChecklist.fragment';
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

export type GetFacilityContractsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FcltContractFilterInput>;
  order?: Types.InputMaybe<Array<Types.FcltContractSortInput> | Types.FcltContractSortInput>;
}>;

export type GetFacilityContractsQuery = {
  __typename?: 'Query';
  fcltContract: {
    __typename?: 'FcltContractQueries';
    listFcltContracts?: {
      __typename?: 'ListFcltContractsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type DeleteFacilityContractMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteFacilityContractMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
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

export type DeleteFacilityContractsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteFacilityContractsMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
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

export type ExportFacilityContractsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FcltContractFilterInput>;
  order?: Types.InputMaybe<Array<Types.FcltContractSortInput> | Types.FcltContractSortInput>;
}>;

export type ExportFacilityContractsQuery = {
  __typename?: 'Query';
  fcltContract: {
    __typename?: 'FcltContractQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetFacilityContractInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFacilityContractInternalCodeQuery = {
  __typename?: 'Query';
  fcltContract: { __typename?: 'FcltContractQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseFacilityContractInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentFacilityContractId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseFacilityContractInternalCodeQuery = {
  __typename?: 'Query';
  fcltContract: { __typename?: 'FcltContractQueries'; canUseInternalCode: boolean };
};

export type CreateFacilityContractMutationVariables = Types.Exact<{
  input: Types.FcltContractInput;
}>;

export type CreateFacilityContractMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
    add: {
      __typename?: 'ResultOfFcltContract';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'FcltContract'; id: number } | null;
    };
  };
};

export type GetFacilityContractQueryVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
}>;

export type GetFacilityContractQuery = {
  __typename?: 'Query';
  fcltContract: {
    __typename?: 'FcltContractQueries';
    get?: {
      __typename?: 'FcltContract';
      cancellationNoticeDaysCount?: number | null;
      maximumRenewalDaysCount?: number | null;
      renewalNoticeDaysCount?: number | null;
      id: number;
      internalCode: string;
      externalCode?: string | null;
      entryStatus: Types.EntryStatus;
      description: string;
      agreementDate?: string | null;
      effectiveDate: string;
      expirationDate: string;
      estateUnitIds: Array<number>;
      billingInfo: {
        __typename?: 'BillingInfo';
        billingPeriod?: Types.BillingPeriod | null;
        vatPercentage?: number | null;
        purchaseFeeWithoutVAT?: number | null;
        fixedRateFee?: number | null;
        discountPercentage?: number | null;
      };
      catalogueTypes: Array<{
        __typename?: 'CatalogueType';
        id: number;
        name: string;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      }>;
      estateUnits: Array<{
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
      }>;
      frameworkAgreements: Array<{
        __typename?: 'FrameworkAgreement';
        id: number;
        externalCode: string;
        notes?: string | null;
      }>;
      originalEstateUnitGroup?: {
        __typename?: 'EstateUnitGroup';
        name: string;
        internalCode: string;
        id: number;
        managementSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        estateUnits: Array<{
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
          floors: Array<{
            __typename?: 'Floor';
            id: number;
            name: string;
            position: number;
            templateReference: string;
          }>;
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
        }>;
      } | null;
      originalTemplate?: {
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
      priceLists: Array<{
        __typename?: 'PriceList';
        internalCode: string;
        name: string;
        ordering: number;
        isDefault: boolean;
        id: number;
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
      termExtensions: Array<{
        __typename?: 'TermExtension';
        daysCount: number;
        feeDifference?: number | null;
        notes?: string | null;
        id: number;
      }>;
      ticketChecklists: Array<{
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
      }>;
      type: { __typename?: 'FcltContractType'; id: number; name: string };
      providerSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
    } | null;
  };
};

export type UpdateFacilityContractMutationVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
  input: Types.FcltContractInput;
}>;

export type UpdateFacilityContractMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
    update: {
      __typename?: 'ResultOfFcltContract';
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

export type AddFacilityContractDocumentsMutationVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddFacilityContractDocumentsMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
    document: {
      __typename?: 'FcltContractDocumentMutations';
      addRange: {
        __typename?: 'ResultOfDocument__';
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
};

export type DeleteFacilityContractDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteFacilityContractDocumentsMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
    document: {
      __typename?: 'FcltContractDocumentMutations';
      deleteRange: {
        __typename?: 'ResultOfDocument__';
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
};

export type UpdateFacilityContractDocumentMutationVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateFacilityContractDocumentMutation = {
  __typename?: 'Mutation';
  fcltContract: {
    __typename?: 'FcltContractMutations';
    document: {
      __typename?: 'FcltContractDocumentMutations';
      update: {
        __typename?: 'ResultOfDocument';
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
};

export type GetFacilityContractDocumentsQueryVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetFacilityContractDocumentsQuery = {
  __typename?: 'Query';
  fcltContract: {
    __typename?: 'FcltContractQueries';
    get?: {
      __typename?: 'FcltContract';
      documents: Array<{
        __typename?: 'DocumentsPerContentCategoryGroupOutput';
        contentCategoryGroup: string;
        guid: string;
        subRows: Array<{
          __typename?: 'DocumentsPerContentCategoryOutput';
          contentCategory: Types.ContentCategory;
          guid: string;
          subRows: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }>;
      }>;
    } | null;
  };
};

export const GetFacilityContractsDocument = gql`
  query getFacilityContracts(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FcltContractFilterInput
    $order: [FcltContractSortInput!]
  ) {
    fcltContract {
      listFcltContracts(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FacilityContractFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FacilityContractFragmentDoc}
  ${PriceListDetailFragmentDoc}
`;

export function useGetFacilityContractsQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractsQuery, GetFacilityContractsQueryVariables>({
    query: GetFacilityContractsDocument,
    ...options,
  });
}
export const DeleteFacilityContractDocument = gql`
  mutation deleteFacilityContract($id: Int!) {
    fcltContract {
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

export function useDeleteFacilityContractMutation() {
  return Urql.useMutation<DeleteFacilityContractMutation, DeleteFacilityContractMutationVariables>(
    DeleteFacilityContractDocument,
  );
}
export const DeleteFacilityContractsDocument = gql`
  mutation deleteFacilityContracts($ids: [Int!]!) {
    fcltContract {
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

export function useDeleteFacilityContractsMutation() {
  return Urql.useMutation<DeleteFacilityContractsMutation, DeleteFacilityContractsMutationVariables>(
    DeleteFacilityContractsDocument,
  );
}
export const ExportFacilityContractsDocument = gql`
  query exportFacilityContracts($where: FcltContractFilterInput, $order: [FcltContractSortInput!]) {
    fcltContract {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportFacilityContractsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportFacilityContractsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportFacilityContractsQuery, ExportFacilityContractsQueryVariables>({
    query: ExportFacilityContractsDocument,
    ...options,
  });
}
export const GetFacilityContractInternalCodeDocument = gql`
  query getFacilityContractInternalCode {
    fcltContract {
      proposeNewInternalCode
    }
  }
`;

export function useGetFacilityContractInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityContractInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractInternalCodeQuery, GetFacilityContractInternalCodeQueryVariables>({
    query: GetFacilityContractInternalCodeDocument,
    ...options,
  });
}
export const CanUseFacilityContractInternalCodeDocument = gql`
  query canUseFacilityContractInternalCode($internalCode: String!, $currentFacilityContractId: Int) {
    fcltContract {
      canUseInternalCode(internalCode: $internalCode, currentContractId: $currentFacilityContractId)
    }
  }
`;

export function useCanUseFacilityContractInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseFacilityContractInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseFacilityContractInternalCodeQuery, CanUseFacilityContractInternalCodeQueryVariables>({
    query: CanUseFacilityContractInternalCodeDocument,
    ...options,
  });
}
export const CreateFacilityContractDocument = gql`
  mutation createFacilityContract($input: FcltContractInput!) {
    fcltContract {
      add(input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreateFacilityContractMutation() {
  return Urql.useMutation<CreateFacilityContractMutation, CreateFacilityContractMutationVariables>(
    CreateFacilityContractDocument,
  );
}
export const GetFacilityContractDocument = gql`
  query getFacilityContract($facilityContractId: Int!) {
    fcltContract {
      get(id: $facilityContractId) {
        ...FacilityContractDetailFragment
      }
    }
  }
  ${FacilityContractDetailFragmentDoc}
  ${FacilityContractFragmentDoc}
  ${PriceListDetailFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${EstateUnitGroupFragmentDoc}
  ${FacilityContractTemplateDetailFragmentDoc}
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
  ${TicketChecklistFragmentDoc}
`;

export function useGetFacilityContractQuery(
  options: Omit<Urql.UseQueryArgs<GetFacilityContractQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractQuery, GetFacilityContractQueryVariables>({
    query: GetFacilityContractDocument,
    ...options,
  });
}
export const UpdateFacilityContractDocument = gql`
  mutation updateFacilityContract($facilityContractId: Int!, $input: FcltContractInput!) {
    fcltContract {
      update(id: $facilityContractId, input: $input) {
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

export function useUpdateFacilityContractMutation() {
  return Urql.useMutation<UpdateFacilityContractMutation, UpdateFacilityContractMutationVariables>(
    UpdateFacilityContractDocument,
  );
}
export const AddFacilityContractDocumentsDocument = gql`
  mutation addFacilityContractDocuments($facilityContractId: Int!, $inputs: [DocumentInput!]!) {
    fcltContract {
      document {
        addRange(contractId: $facilityContractId, inputs: $inputs) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddFacilityContractDocumentsMutation() {
  return Urql.useMutation<AddFacilityContractDocumentsMutation, AddFacilityContractDocumentsMutationVariables>(
    AddFacilityContractDocumentsDocument,
  );
}
export const DeleteFacilityContractDocumentsDocument = gql`
  mutation deleteFacilityContractDocuments($entityId: Int!, $cmisIds: [String!]!) {
    fcltContract {
      document {
        deleteRange(contractId: $entityId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteFacilityContractDocumentsMutation() {
  return Urql.useMutation<DeleteFacilityContractDocumentsMutation, DeleteFacilityContractDocumentsMutationVariables>(
    DeleteFacilityContractDocumentsDocument,
  );
}
export const UpdateFacilityContractDocumentDocument = gql`
  mutation updateFacilityContractDocument($facilityContractId: Int!, $input: DocumentInput!) {
    fcltContract {
      document {
        update(contractId: $facilityContractId, input: $input) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateFacilityContractDocumentMutation() {
  return Urql.useMutation<UpdateFacilityContractDocumentMutation, UpdateFacilityContractDocumentMutationVariables>(
    UpdateFacilityContractDocumentDocument,
  );
}
export const GetFacilityContractDocumentsDocument = gql`
  query getFacilityContractDocuments(
    $facilityContractId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    fcltContract {
      get(id: $facilityContractId) {
        documents(where: $where, order: $order) {
          ...DocumentsPerContentCategoryGroupOutputFragment
        }
      }
    }
  }
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetFacilityContractDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetFacilityContractDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityContractDocumentsQuery, GetFacilityContractDocumentsQueryVariables>({
    query: GetFacilityContractDocumentsDocument,
    ...options,
  });
}

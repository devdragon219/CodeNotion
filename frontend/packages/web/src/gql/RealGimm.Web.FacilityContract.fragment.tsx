// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

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
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFragmentDoc } from './RealGimm.Web.EstateUnitGroup.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FacilityContractTemplateDetailFragmentDoc } from './RealGimm.Web.FacilityContractTemplate.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
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

export type FacilityContractFragment = {
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
};

export type FacilityContractDetailFragment = {
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
};

export const FacilityContractFragmentDoc = gql`
  fragment FacilityContractFragment on FcltContract {
    id
    internalCode
    externalCode
    type {
      id
      name
    }
    entryStatus
    providerSubject {
      id
      name
    }
    description
    agreementDate
    effectiveDate
    expirationDate
    estateUnitIds
    priceLists {
      ...PriceListDetailFragment
    }
  }
`;
export const FacilityContractDetailFragmentDoc = gql`
  fragment FacilityContractDetailFragment on FcltContract {
    ...FacilityContractFragment
    billingInfo {
      billingPeriod
      vatPercentage
      purchaseFeeWithoutVAT
      fixedRateFee
      discountPercentage
    }
    cancellationNoticeDaysCount
    catalogueTypes {
      ...FacilityCatalogueTypeFragment
    }
    estateUnits {
      ...EstateUnitFragment
    }
    frameworkAgreements {
      id
      externalCode
      notes
    }
    maximumRenewalDaysCount
    originalEstateUnitGroup {
      ...EstateUnitGroupFragment
    }
    originalTemplate {
      ...FacilityContractTemplateDetailFragment
    }
    penalties {
      ...PenaltyDetailFragment
    }
    priceLists {
      ...PriceListDetailFragment
    }
    renewalNoticeDaysCount
    slas {
      ...SlaDetailFragment
    }
    termExtensions {
      daysCount
      feeDifference
      notes
      id
    }
    ticketChecklists {
      ...TicketChecklistFragment
    }
  }
`;

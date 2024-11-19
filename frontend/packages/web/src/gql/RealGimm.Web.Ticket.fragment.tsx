// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
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
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import {
  FacilityContractDetailFragmentDoc,
  FacilityContractFragmentDoc,
} from './RealGimm.Web.FacilityContract.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PriceListDetailFragmentDoc, PriceListFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { TicketPriceListArticleFragmentDoc } from './RealGimm.Web.PriceListArticle.fragment';
import { PriceListMeasurementUnitFragmentDoc } from './RealGimm.Web.PriceListMeasurementUnit.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';
import { QuoteHistoryEntryFragmentDoc } from './RealGimm.Web.QuoteHistoryEntry.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { TicketChecklistDetailFragmentDoc, TicketChecklistFragmentDoc } from './RealGimm.Web.TicketChecklist.fragment';
import { TicketHistoryEntryFragmentDoc } from './RealGimm.Web.TicketHistoryEntry.fragment';
import { TicketUserFragmentDoc } from './RealGimm.Web.User.fragment';
import { WorkTeamFragmentDoc } from './RealGimm.Web.WorkTeam.fragment';
import { WorkerFragmentDoc } from './RealGimm.Web.Worker.fragment';

export type TicketFragment = {
  __typename?: 'Ticket';
  id: number;
  internalCode: string;
  workOrderReference?: string | null;
  mainType: Types.TicketMainType;
  description?: string | null;
  masterStatus: Types.TicketMasterStatus;
  requestor?: string | null;
  isExcludedFromMaintenanceContract: boolean;
  dueDate: string;
  supplierSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
};

export type TicketDetailFragment = {
  __typename?: 'Ticket';
  id: number;
  mainType: Types.TicketMainType;
  locationSector?: string | null;
  locationRoom?: string | null;
  internalCode: string;
  workOrderReference?: string | null;
  masterStatus: Types.TicketMasterStatus;
  isWorkSafetyExpected: boolean;
  requestor?: string | null;
  requestorContactEmail?: string | null;
  requestorContactPhone?: string | null;
  requestDateTime: string;
  dueDate: string;
  isExcludedFromMaintenanceContract: boolean;
  priority: Types.Priority;
  summary?: string | null;
  description?: string | null;
  locationEstateUnit: {
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
  };
  locationFloor?: {
    __typename?: 'Floor';
    id: number;
    name: string;
    position: number;
    templateReference: string;
  } | null;
  customType?: { __typename?: 'TicketType'; id: number; description: string } | null;
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
  catalogueItems: Array<{
    __typename?: 'CatalogueItem';
    id: number;
    internalCode: string;
    catalogueType: {
      __typename?: 'CatalogueType';
      id: number;
      name: string;
      category: { __typename?: 'CatalogueCategory'; id: number; name: string };
      subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
    };
  }>;
  supplierSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  plannedTeam?: {
    __typename?: 'WorkTeam';
    internalCode: string;
    description: string;
    insertionDate: string;
    id: number;
    providerSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    leaderUser: { __typename?: 'User'; id: number; firstName?: string | null; lastName?: string | null };
    workers: Array<{
      __typename?: 'Worker';
      id: number;
      firstName: string;
      lastName: string;
      since: string;
      until?: string | null;
      craft: { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number };
      qualificationLevel: {
        __typename?: 'QualificationLevel';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      };
    }>;
  } | null;
  plannedTeamLeaderUser?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
  quote?: {
    __typename?: 'Quote';
    isFrameworkAgreement?: boolean | null;
    masterStatus: Types.QuoteMasterStatus;
    externalCode?: string | null;
    classifications?: string | null;
    interventionDueDate?: string | null;
    orderNumber?: string | null;
    notes?: string | null;
    history: Array<
      | {
          __typename: 'AmountUpdatedQuoteHistoryEntry';
          oldAmount?: number | null;
          newAmount?: number | null;
          id: number;
          timestamp: string;
          userId: number;
          user?: {
            __typename?: 'User';
            id: number;
            firstName?: string | null;
            lastName?: string | null;
            userName: string;
          } | null;
        }
      | {
          __typename: 'ApprovedAmountUpdatedQuoteHistoryEntry';
          oldApprovedAmount?: number | null;
          newApprovedAmount?: number | null;
          id: number;
          timestamp: string;
          userId: number;
          user?: {
            __typename?: 'User';
            id: number;
            firstName?: string | null;
            lastName?: string | null;
            userName: string;
          } | null;
        }
      | {
          __typename: 'MasterStatusUpdatedQuoteHistoryEntry';
          oldMasterStatus?: Types.QuoteMasterStatus | null;
          newMasterStatus: Types.QuoteMasterStatus;
          id: number;
          timestamp: string;
          userId: number;
          user?: {
            __typename?: 'User';
            id: number;
            firstName?: string | null;
            lastName?: string | null;
            userName: string;
          } | null;
        }
    >;
    articles: Array<{
      __typename?: 'QuoteArticle';
      id: number;
      internalCode: string;
      name: string;
      unitPrice: number;
      isExcluded: boolean;
      quantity: number;
      ordering: number;
      sourceArticle?: {
        __typename?: 'PriceListArticle';
        id: number;
        internalCode: string;
        name: string;
        actualPrice?: number | null;
        priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
        measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
      } | null;
      measurementUnit: {
        __typename?: 'PriceListMeasurementUnit';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      };
    }>;
  } | null;
  reminders: Array<{ __typename?: 'Reminder'; id: number; date: string; summary: string }>;
  resolution?: {
    __typename?: 'Resolution';
    interventionStart?: string | null;
    interventionEnd?: string | null;
    closure?: string | null;
    operationsPerformed?: string | null;
    diagnosis?: string | null;
    resolutionNotes?: string | null;
    partsAndSupplies?: string | null;
  } | null;
  workers: Array<{
    __typename?: 'Worker';
    id: number;
    firstName: string;
    lastName: string;
    since: string;
    until?: string | null;
    craft: { __typename?: 'Craft'; internalCode: string; name: string; ordering: number; id: number };
    qualificationLevel: {
      __typename?: 'QualificationLevel';
      internalCode: string;
      name: string;
      ordering: number;
      id: number;
    };
  }>;
  history: Array<
    | {
        __typename: 'ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry';
        id: number;
        timestamp: string;
        userId: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
    | {
        __typename: 'MasterStatusUpdatedTicketHistoryEntry';
        oldMasterStatus?: Types.TicketMasterStatus | null;
        newMasterStatus: Types.TicketMasterStatus;
        id: number;
        timestamp: string;
        userId: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
    | {
        __typename: 'NewReminderTicketHistoryEntry';
        reminderDate: string;
        reminderSummary: string;
        id: number;
        timestamp: string;
        userId: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
    | {
        __typename: 'NewReplyTicketHistoryEntry';
        id: number;
        timestamp: string;
        userId: number;
        reply: {
          __typename?: 'Reply';
          id: number;
          user?: {
            __typename?: 'User';
            id: number;
            firstName?: string | null;
            lastName?: string | null;
            userName: string;
          } | null;
        };
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
    | {
        __typename: 'ReminderDeletedTicketHistoryEntry';
        reminderDate: string;
        reminderSummary: string;
        id: number;
        timestamp: string;
        userId: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
    | {
        __typename: 'ReminderUpdatedTicketHistoryEntry';
        oldReminderDate: string;
        oldReminderSummary: string;
        newReminderDate: string;
        newReminderSummary: string;
        id: number;
        timestamp: string;
        userId: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
      }
  >;
  checklist?: {
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
  } | null;
  contract?: {
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
  } | null;
  performedActivities: Array<{
    __typename?: 'PerformedActivity';
    id: number;
    status: Types.PerformedActivityStatus;
    ordering: number;
    name: string;
  }>;
};

export type FacilityContractTicketFragment = {
  __typename?: 'Ticket';
  id: number;
  internalCode: string;
  description?: string | null;
  masterStatus: Types.TicketMasterStatus;
  dueDate: string;
  requestDateTime: string;
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
  catalogueItems: Array<{ __typename?: 'CatalogueItem'; id: number; internalCode: string }>;
  supplierSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  plannedTeam?: { __typename?: 'WorkTeam'; id: number; description: string } | null;
  plannedTeamLeaderUser?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
};

export const TicketFragmentDoc = gql`
  fragment TicketFragment on Ticket {
    id
    internalCode
    workOrderReference
    mainType
    description
    masterStatus
    supplierSubject {
      id
      name
    }
    requestor
    isExcludedFromMaintenanceContract
    dueDate
  }
`;
export const TicketDetailFragmentDoc = gql`
  fragment TicketDetailFragment on Ticket {
    id
    mainType
    locationEstateUnit {
      ...EstateUnitFragment
    }
    locationFloor {
      ...FloorFragment
    }
    locationSector
    locationRoom
    internalCode
    workOrderReference
    masterStatus
    isWorkSafetyExpected
    requestor
    requestorContactEmail
    requestorContactPhone
    requestDateTime
    dueDate
    isExcludedFromMaintenanceContract
    customType {
      id
      description
    }
    priority
    catalogueType {
      ...CatalogueTypeDetailFragment
    }
    catalogueItems {
      id
      internalCode
      catalogueType {
        ...FacilityCatalogueTypeFragment
      }
    }
    summary
    description
    supplierSubject {
      id
      name
    }
    plannedTeam {
      ...WorkTeamFragment
    }
    plannedTeamLeaderUser {
      ...TicketUserFragment
    }
    quote {
      isFrameworkAgreement
      masterStatus
      externalCode
      classifications
      interventionDueDate
      orderNumber
      notes
      history {
        ...QuoteHistoryEntryFragment
      }
      articles {
        id
        sourceArticle {
          ...TicketPriceListArticleFragment
        }
        internalCode
        name
        unitPrice
        isExcluded
        quantity
        ordering
        measurementUnit {
          ...PriceListMeasurementUnitFragment
        }
      }
    }
    reminders {
      id
      date
      summary
    }
    resolution {
      interventionStart
      interventionEnd
      closure
      operationsPerformed
      diagnosis
      resolutionNotes
      partsAndSupplies
    }
    workers {
      ...WorkerFragment
    }
    history {
      ...TicketHistoryEntryFragment
    }
    checklist {
      ...TicketChecklistFragment
    }
    contract {
      ...FacilityContractFragment
    }
    performedActivities {
      id
      status
      ordering
      name
    }
  }
`;
export const FacilityContractTicketFragmentDoc = gql`
  fragment FacilityContractTicketFragment on Ticket {
    id
    internalCode
    description
    masterStatus
    dueDate
    catalogueType {
      ...CatalogueTypeDetailFragment
    }
    catalogueItems {
      id
      internalCode
    }
    requestDateTime
    supplierSubject {
      id
      name
    }
    plannedTeam {
      id
      description
    }
    plannedTeamLeaderUser {
      id
      firstName
      lastName
      userName
    }
  }
`;

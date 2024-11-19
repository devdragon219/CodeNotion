// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AddressFragmentDoc } from './RealGimm.Web.Address.fragment';
import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { BankAccountFragmentDoc } from './RealGimm.Web.BankAccount.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CalendarTicketOutputFragmentDoc } from './RealGimm.Web.CalendarTicketOutput.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { ChecklistTicketsCountLineChartDataPointFragmentDoc } from './RealGimm.Web.ChecklistTicketsCountLineChartDataPoint.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ContactFragmentDoc } from './RealGimm.Web.Contact.fragment';
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import {
  FacilityContractDetailFragmentDoc,
  FacilityContractFragmentDoc,
} from './RealGimm.Web.FacilityContract.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { IssuesExcludedFromMaintenanceContractLineChartDataPointFragmentDoc } from './RealGimm.Web.IssuesExcludedFromMaintenanceContractLineChartDataPoint.fragment';
import { IssuesStatusLineChartDataPointFragmentDoc } from './RealGimm.Web.IssuesStatusLineChartDataPoint.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PriceListDetailFragmentDoc, PriceListFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { TicketPriceListArticleFragmentDoc } from './RealGimm.Web.PriceListArticle.fragment';
import { PriceListMeasurementUnitFragmentDoc } from './RealGimm.Web.PriceListMeasurementUnit.fragment';
import { QualificationLevelFragmentDoc } from './RealGimm.Web.QualificationLevel.fragment';
import { QuoteHistoryEntryFragmentDoc } from './RealGimm.Web.QuoteHistoryEntry.fragment';
import { ReplyFragmentDoc } from './RealGimm.Web.Reply.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { SubjectDetailFragmentDoc, SubjectFragmentDoc } from './RealGimm.Web.Subject.fragment';
import {
  FacilityContractTicketFragmentDoc,
  TicketDetailFragmentDoc,
  TicketFragmentDoc,
} from './RealGimm.Web.Ticket.fragment';
import { TicketChecklistDetailFragmentDoc, TicketChecklistFragmentDoc } from './RealGimm.Web.TicketChecklist.fragment';
import { TicketHistoryEntryFragmentDoc } from './RealGimm.Web.TicketHistoryEntry.fragment';
import { TicketsAmountChartDataPointFragmentDoc } from './RealGimm.Web.TicketsAmountChartDataPoint.fragment';
import { TicketsPerEstateUnitFragmentDoc } from './RealGimm.Web.TicketsPerEstateUnit.fragment';
import { TicketsPerEstateUnitsPerYearFragmentDoc } from './RealGimm.Web.TicketsPerEstateUnitsPerYear.fragment';
import { TicketsTypeLineChartDataPointFragmentDoc } from './RealGimm.Web.TicketsTypeLineChartDataPoint.fragment';
import { TicketUserFragmentDoc } from './RealGimm.Web.User.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { WorkTeamFragmentDoc } from './RealGimm.Web.WorkTeam.fragment';
import { WorkerFragmentDoc } from './RealGimm.Web.Worker.fragment';

export type GetTicketsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketSortInput> | Types.TicketSortInput>;
}>;

export type GetTicketsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTickets?: {
      __typename?: 'ListTicketsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type DeleteTicketMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteTicketMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
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

export type DeleteTicketsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTicketsMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
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

export type ExportTicketsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketSortInput> | Types.TicketSortInput>;
}>;

export type ExportTicketsQuery = {
  __typename?: 'Query';
  ticket: { __typename?: 'TicketQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetTicketInternalCodeQueryVariables = Types.Exact<{
  mainType: Types.TicketMainType;
}>;

export type GetTicketInternalCodeQuery = {
  __typename?: 'Query';
  ticket: { __typename?: 'TicketQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseTicketInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentTicketId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseTicketInternalCodeQuery = {
  __typename?: 'Query';
  ticket: { __typename?: 'TicketQueries'; canUseInternalCode: boolean };
};

export type CreateIssueTicketMutationVariables = Types.Exact<{
  input: Types.TicketInput;
}>;

export type CreateIssueTicketMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    addIssue: {
      __typename?: 'ResultOfTicket';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'Ticket'; id: number } | null;
    };
  };
};

export type CreateOnConditionTicketMutationVariables = Types.Exact<{
  input: Types.AddOnTriggerChecklistTicketRangeInput;
}>;

export type CreateOnConditionTicketMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    addOnTriggerChecklistTicketRange: {
      __typename?: 'ResultOfIEnumerableOfTicket';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: Array<{ __typename?: 'Ticket'; id: number } | null> | null;
    };
  };
};

export type GetTicketQueryVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
}>;

export type GetTicketQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    get?: {
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
    } | null;
  };
};

export type UpdateTicketMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
  input: Types.TicketInput;
}>;

export type UpdateTicketMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    update: {
      __typename?: 'ResultOfTicket';
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

export type AddTicketDocumentsMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddTicketDocumentsMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    document: {
      __typename?: 'TicketDocumentMutations';
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

export type DeleteTicketDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteTicketDocumentsMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    document: {
      __typename?: 'TicketDocumentMutations';
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

export type UpdateTicketDocumentMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateTicketDocumentMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    document: {
      __typename?: 'TicketDocumentMutations';
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

export type GetTicketDocumentsQueryVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<Array<Types.DocumentSortInput> | Types.DocumentSortInput>;
}>;

export type GetTicketDocumentsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    get?: {
      __typename?: 'Ticket';
      documents: Array<{
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
    } | null;
  };
};

export type GetTicketImagesQueryVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
}>;

export type GetTicketImagesQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    get?: {
      __typename?: 'Ticket';
      images: Array<{
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
    } | null;
  };
};

export type GetTicketRepliesQueryVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
}>;

export type GetTicketRepliesQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    get?: {
      __typename?: 'Ticket';
      replies: Array<{
        __typename?: 'Reply';
        timestamp: string;
        isOperator: boolean;
        comment?: string | null;
        id: number;
        user?: {
          __typename?: 'User';
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          userName: string;
        } | null;
        documents: Array<{
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
        images: Array<{
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
    } | null;
  };
};

export type SendTicketReplyMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
  comment?: Types.InputMaybe<Types.Scalars['String']['input']>;
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type SendTicketReplyMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    sendReply: {
      __typename?: 'ResultOfTicket';
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

export type ConvertTicketToExcludedFromMaintenanceContractMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['Int']['input'];
}>;

export type ConvertTicketToExcludedFromMaintenanceContractMutation = {
  __typename?: 'Mutation';
  ticket: {
    __typename?: 'TicketMutations';
    convertToExcludedFromMaintenanceContract: {
      __typename?: 'ResultOfTicket';
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

export type GetTicketProviderSubjectsQueryVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  catalogueItemIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.SubjectFilterInput>;
  order?: Types.InputMaybe<Array<Types.SubjectSortInput> | Types.SubjectSortInput>;
}>;

export type GetTicketProviderSubjectsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listAvailableProviderSubjects?: {
      __typename?: 'ListAvailableProviderSubjectsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<
        | {
            __typename: 'LegalSubject';
            legalSubjectType: Types.LegalSubjectType;
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            interGroupSignature?: string | null;
            id: number;
            internalCode: string;
            name: string;
            entryStatus: Types.EntryStatus;
            externalSourceCode?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              id: number;
              groupRelationType?: Types.CompanyGroup | null;
              main:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            } | null;
            addresses: Array<{
              __typename?: 'Address';
              id: number;
              addressType: Types.AddressType;
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
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              main:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              until?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              since?: string | null;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
          }
        | {
            __typename: 'ManagementSubject';
            baseCountryTaxIdCode?: string | null;
            additionalTaxIdCode?: string | null;
            id: number;
            internalCode: string;
            name: string;
            entryStatus: Types.EntryStatus;
            externalSourceCode?: string | null;
            companyGroupParent?: {
              __typename?: 'SubjectRelation';
              id: number;
              groupRelationType?: Types.CompanyGroup | null;
              main:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            } | null;
            addresses: Array<{
              __typename?: 'Address';
              id: number;
              addressType: Types.AddressType;
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
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              main:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              until?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              since?: string | null;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
          }
        | {
            __typename: 'PhysicalSubject';
            professionalTaxIdCode?: string | null;
            birthCountryTaxIdCode?: string | null;
            id: number;
            internalCode: string;
            name: string;
            entryStatus: Types.EntryStatus;
            externalSourceCode?: string | null;
            addresses: Array<{
              __typename?: 'Address';
              id: number;
              addressType: Types.AddressType;
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
            }>;
            owningMgmtSubjects: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              main:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            categories: Array<{
              __typename?: 'SubjectCategory';
              id: number;
              function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
            }>;
            taxStatuses: Array<{
              __typename?: 'TaxStatus';
              taxStatusType: Types.TaxStatusType;
              until?: string | null;
              id: number;
            }>;
            contacts: Array<{
              __typename?: 'Contact';
              id: number;
              contactInfo?: string | null;
              contactInfoType: Types.ContactInfoType;
              contactType: Types.ContactType;
            }>;
            bankAccounts: Array<{
              __typename?: 'BankAccount';
              bankAccountType: Types.BankAccountType;
              referenceCode?: string | null;
              referenceCodeType: Types.BankAccountCodeType;
              notes?: string | null;
              accountHolder?: string | null;
              id: number;
            }>;
            officers: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
            heirs: Array<{
              __typename?: 'SubjectRelation';
              id: number;
              since?: string | null;
              subordinate:
                | { __typename?: 'LegalSubject'; id: number; name: string }
                | { __typename?: 'ManagementSubject'; id: number; name: string }
                | { __typename?: 'PhysicalSubject'; id: number; name: string };
            }>;
          }
      > | null;
    } | null;
  };
};

export type GetTicketsPerEstateUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketsPerEstateUnitSortInput> | Types.TicketsPerEstateUnitSortInput>;
}>;

export type GetTicketsPerEstateUnitsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTicketsPerEstateUnits?: {
      __typename?: 'ListTicketsPerEstateUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketsPerEstateUnit';
        locationEstateUnit: { __typename?: 'EstateUnit'; id: number; internalCode: string };
        tickets: Array<{
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
        }>;
      }> | null;
    } | null;
  };
};

export type GetTicketsPerEstateUnitsPerYearsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.TicketsPerEstateUnitsPerYearSortInput> | Types.TicketsPerEstateUnitsPerYearSortInput
  >;
}>;

export type GetTicketsPerEstateUnitsPerYearsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTicketsPerEstateUnitsPerYears?: {
      __typename?: 'ListTicketsPerEstateUnitsPerYearsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketsPerEstateUnitsPerYear';
        requestYear: number;
        tickets: Array<{
          __typename?: 'TicketsPerEstateUnit';
          locationEstateUnit: { __typename?: 'EstateUnit'; id: number; internalCode: string };
          tickets: Array<{
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
          }>;
        }>;
      }> | null;
    } | null;
  };
};

export type GetTicketsCalendarQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  where?: Types.InputMaybe<Types.CalendarTicketOutputFilterInput>;
}>;

export type GetTicketsCalendarQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTicketsForCalendar: Array<{
      __typename?: 'CalendarTicketOutput';
      id?: number | null;
      mainType: Types.TicketMainType;
      dueDate: string;
      internalCode?: string | null;
      workOrderReference?: string | null;
      description?: string | null;
      masterStatus?: Types.TicketMasterStatus | null;
      requestor?: string | null;
      isExcludedFromMaintenanceContract: boolean;
      supplierSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
    }>;
  };
};

export type GetIssueTicketsExcludedFromMaintenanceContractStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsExcludedFromMaintenanceContractStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesExcludedFromMaintenanceContractStatistics?: {
      __typename?: 'IssuesExcludedFromMaintenanceContractStatistics';
      excludedPercentage: number;
      nonExcludedPercentage: number;
    } | null;
  };
};

export type GetIssueTicketsPercentageByStatusStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsPercentageByStatusStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesPercentageByStatusStatistics?: {
      __typename?: 'IssuesPercentageByStatusStatistics';
      newStatusPercentage: number;
      assignedStatusPercentage: number;
      inProgressStatusPercentage: number;
      resolvedStatusPercentage: number;
      completedStatusPercentage: number;
    } | null;
  };
};

export type GetIssueTicketsPercentageByPriorityStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsPercentageByPriorityStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesPercentageByPriorityStatistics?: {
      __typename?: 'IssuesPercentageByPriorityStatistics';
      minorStatusPercentage: number;
      normalStatusPercentage: number;
      majorStatusPercentage: number;
      criticalStatusPercentage: number;
    } | null;
  };
};

export type GetIssueTicketsPercentageByTypeStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsPercentageByTypeStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesPercentageByTypeStatistics?: Array<{
      __typename?: 'KeyValuePairOfTicketTypeAndDouble';
      value: number;
      key: { __typename?: 'TicketType'; id: number; description: string };
    }> | null;
  };
};

export type GetIssueTicketsCountByStatusStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsCountByStatusStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesCountByStatusStatistics: {
      __typename?: 'IssuesCountByStatusStatistics';
      newStatusCount: number;
      assignedStatusCount: number;
      inProgressStatusCount: number;
      resolvedStatusCount: number;
      completedStatusCount: number;
    };
  };
};

export type GetTicketsCountStatisticsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketFilterInput>;
}>;

export type GetTicketsCountStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTickets?: { __typename?: 'ListTicketsConnection'; totalCount: number } | null;
  };
};

export type GetChecklistTicketsCountLineChartQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  chartType: Types.LineChartType;
}>;

export type GetChecklistTicketsCountLineChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    checklistTicketsCountLineChart: {
      __typename?: 'LineChartOfChecklistTicketsCountLineChartDataPoint';
      daily?: Array<{
        __typename?: 'LineChartDailySeriesOfChecklistTicketsCountLineChartDataPoint';
        date: string;
        dataPoint: {
          __typename?: 'ChecklistTicketsCountLineChartDataPoint';
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
      weekly?: Array<{
        __typename?: 'LineChartWeeklySeriesOfChecklistTicketsCountLineChartDataPoint';
        week: number;
        dataPoint: {
          __typename?: 'ChecklistTicketsCountLineChartDataPoint';
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
      monthly?: Array<{
        __typename?: 'LineChartMonthlySeriesOfChecklistTicketsCountLineChartDataPoint';
        month: number;
        dataPoint: {
          __typename?: 'ChecklistTicketsCountLineChartDataPoint';
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
    };
  };
};

export type GetIssueTicketsExcludedFromMaintenanceContractLineChartQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  chartType: Types.LineChartType;
}>;

export type GetIssueTicketsExcludedFromMaintenanceContractLineChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesExcludedFromMaintenanceContractLineChart: {
      __typename?: 'LineChartOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
      daily?: Array<{
        __typename?: 'LineChartDailySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
        date: string;
        dataPoint: {
          __typename?: 'IssuesExcludedFromMaintenanceContractLineChartDataPoint';
          excludedCount: number;
          nonExcludedCount: number;
        };
      }> | null;
      weekly?: Array<{
        __typename?: 'LineChartWeeklySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
        week: number;
        dataPoint: {
          __typename?: 'IssuesExcludedFromMaintenanceContractLineChartDataPoint';
          excludedCount: number;
          nonExcludedCount: number;
        };
      }> | null;
      monthly?: Array<{
        __typename?: 'LineChartMonthlySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
        month: number;
        dataPoint: {
          __typename?: 'IssuesExcludedFromMaintenanceContractLineChartDataPoint';
          excludedCount: number;
          nonExcludedCount: number;
        };
      }> | null;
    };
  };
};

export type GetIssueTicketsStatusLineChartQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  chartType: Types.LineChartType;
}>;

export type GetIssueTicketsStatusLineChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesStatusLineChart: {
      __typename?: 'LineChartOfIssuesStatusLineChartDataPoint';
      daily?: Array<{
        __typename?: 'LineChartDailySeriesOfIssuesStatusLineChartDataPoint';
        date: string;
        dataPoint: {
          __typename?: 'IssuesStatusLineChartDataPoint';
          newCount: number;
          assignedCount: number;
          inProgressCount: number;
          resolvedCount: number;
          completedCount: number;
        };
      }> | null;
      weekly?: Array<{
        __typename?: 'LineChartWeeklySeriesOfIssuesStatusLineChartDataPoint';
        week: number;
        dataPoint: {
          __typename?: 'IssuesStatusLineChartDataPoint';
          newCount: number;
          assignedCount: number;
          inProgressCount: number;
          resolvedCount: number;
          completedCount: number;
        };
      }> | null;
      monthly?: Array<{
        __typename?: 'LineChartMonthlySeriesOfIssuesStatusLineChartDataPoint';
        month: number;
        dataPoint: {
          __typename?: 'IssuesStatusLineChartDataPoint';
          newCount: number;
          assignedCount: number;
          inProgressCount: number;
          resolvedCount: number;
          completedCount: number;
        };
      }> | null;
    };
  };
};

export type GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    checklistTicketsMandatoryByLawPerformedActivitiesStatistics?: Array<{
      __typename?: 'KeyValuePairOfStringAndDouble';
      key: string;
      value: number;
    }> | null;
  };
};

export type GetChecklistTicketsMandatoryByLawStatusStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetChecklistTicketsMandatoryByLawStatusStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    mandatoryByLawChecklistTicketsStatusStatistics?: {
      __typename?: 'MandatoryByLawChecklistTicketsStatusStatistics';
      donePercentage: number;
      expiredPercentage: number;
      scheduledPercentage: number;
    } | null;
  };
};

export type GetChecklistTicketsMandatoryByLawQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetChecklistTicketsMandatoryByLawQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    listTickets?: {
      __typename?: 'ListTicketsConnection';
      nodes?: Array<{
        __typename?: 'Ticket';
        id: number;
        internalCode: string;
        dueDate: string;
        catalogueType: { __typename?: 'CatalogueType'; id: number; name: string };
      }> | null;
    } | null;
  };
};

export type GetIssueTicketsAverageResolutionDurationByStatusStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsAverageResolutionDurationByStatusStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesAverageResolutionDurationByStatusStatistics: {
      __typename?: 'IssuesAverageResolutionDurationByStatusStatistics';
      newDuration?: string | null;
      assignedDuration?: string | null;
      inProgressDuration?: string | null;
      resolvedDuration?: string | null;
      completedDuration?: string | null;
    };
  };
};

export type GetTicketsTypeLineChartQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  chartType: Types.LineChartType;
}>;

export type GetTicketsTypeLineChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    ticketsTypeLineChart: {
      __typename?: 'LineChartOfTicketsTypeLineChartDataPoint';
      daily?: Array<{
        __typename?: 'LineChartDailySeriesOfTicketsTypeLineChartDataPoint';
        date: string;
        dataPoint: {
          __typename?: 'TicketsTypeLineChartDataPoint';
          issuesCount: number;
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
      weekly?: Array<{
        __typename?: 'LineChartWeeklySeriesOfTicketsTypeLineChartDataPoint';
        week: number;
        dataPoint: {
          __typename?: 'TicketsTypeLineChartDataPoint';
          issuesCount: number;
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
      monthly?: Array<{
        __typename?: 'LineChartMonthlySeriesOfTicketsTypeLineChartDataPoint';
        month: number;
        dataPoint: {
          __typename?: 'TicketsTypeLineChartDataPoint';
          issuesCount: number;
          preventiveCount: number;
          onTriggerConditionCount: number;
        };
      }> | null;
    };
  };
};

export type GetTicketsCountMonthlyChartQueryVariables = Types.Exact<{
  years: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type GetTicketsCountMonthlyChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    ticketsCountMonthlyChart: Array<{
      __typename?: 'LineChartMonthlySeriesOfTicketsCountLineChartDataPoint';
      year: number;
      month: number;
      dataPoint: { __typename?: 'TicketsCountLineChartDataPoint'; ticketsCount: number };
    }>;
  };
};

export type GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    ticketAmountPercentageByIsExcludedFromMaintenanceContractStatistics?: {
      __typename?: 'TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics';
      excludedAmountPercentage: number;
      nonExcludedAmountPercentage: number;
    } | null;
  };
};

export type GetTicketsExcludedFromMaintenanceContractExpensesLineChartQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
  chartType: Types.LineChartType;
}>;

export type GetTicketsExcludedFromMaintenanceContractExpensesLineChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    ticketsAmountLineChart: {
      __typename?: 'LineChartOfTicketsAmountChartDataPoint';
      daily?: Array<{
        __typename?: 'LineChartDailySeriesOfTicketsAmountChartDataPoint';
        date: string;
        dataPoint: { __typename?: 'TicketsAmountChartDataPoint'; excludedAmount: number; nonExcludedAmount: number };
      }> | null;
      weekly?: Array<{
        __typename?: 'LineChartWeeklySeriesOfTicketsAmountChartDataPoint';
        week: number;
        dataPoint: { __typename?: 'TicketsAmountChartDataPoint'; excludedAmount: number; nonExcludedAmount: number };
      }> | null;
      monthly?: Array<{
        __typename?: 'LineChartMonthlySeriesOfTicketsAmountChartDataPoint';
        month: number;
        dataPoint: { __typename?: 'TicketsAmountChartDataPoint'; excludedAmount: number; nonExcludedAmount: number };
      }> | null;
    };
  };
};

export type GetTicketsTotalExpensesMonthlyChartQueryVariables = Types.Exact<{
  years: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type GetTicketsTotalExpensesMonthlyChartQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    ticketsTotalAmountMonthlyChart: Array<{
      __typename?: 'LineChartMonthlySeriesOfTicketsTotalAmountChartDataPoint';
      year: number;
      month: number;
      dataPoint: { __typename?: 'TicketsTotalAmountChartDataPoint'; totalAmount: number };
    }>;
  };
};

export type GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    yearlyTicketAmountStatistics: {
      __typename?: 'YearlyTicketAmountStatistics';
      totalAmount: number;
      totalAmountTrend: Types.Trend;
      excludedAmount: number;
      excludedAmountTrend: Types.Trend;
      nonExcludedAmount: number;
      nonExcludedAmountTrend: Types.Trend;
    };
  };
};

export type GetIssueTicketsSlaRespectingPercentageStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Date']['input'];
  endDate: Types.Scalars['Date']['input'];
}>;

export type GetIssueTicketsSlaRespectingPercentageStatisticsQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'TicketQueries';
    issuesSLARespectingPercentageStatistics?: {
      __typename?: 'IssuesSLARespectingPercentageStatistics';
      respectingPercentage: number;
      notRespectingPercentage: number;
    } | null;
  };
};

export const GetTicketsDocument = gql`
  query getTickets(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketFilterInput
    $order: [TicketSortInput!]
  ) {
    ticket {
      listTickets(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketFragmentDoc}
`;

export function useGetTicketsQuery(options?: Omit<Urql.UseQueryArgs<GetTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketsQuery, GetTicketsQueryVariables>({ query: GetTicketsDocument, ...options });
}
export const DeleteTicketDocument = gql`
  mutation deleteTicket($id: Int!) {
    ticket {
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

export function useDeleteTicketMutation() {
  return Urql.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument);
}
export const DeleteTicketsDocument = gql`
  mutation deleteTickets($ids: [Int!]!) {
    ticket {
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

export function useDeleteTicketsMutation() {
  return Urql.useMutation<DeleteTicketsMutation, DeleteTicketsMutationVariables>(DeleteTicketsDocument);
}
export const ExportTicketsDocument = gql`
  query exportTickets($where: TicketFilterInput, $order: [TicketSortInput!]) {
    ticket {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTicketsQuery(options?: Omit<Urql.UseQueryArgs<ExportTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportTicketsQuery, ExportTicketsQueryVariables>({ query: ExportTicketsDocument, ...options });
}
export const GetTicketInternalCodeDocument = gql`
  query getTicketInternalCode($mainType: TicketMainType!) {
    ticket {
      proposeNewInternalCode(mainType: $mainType)
    }
  }
`;

export function useGetTicketInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketInternalCodeQuery, GetTicketInternalCodeQueryVariables>({
    query: GetTicketInternalCodeDocument,
    ...options,
  });
}
export const CanUseTicketInternalCodeDocument = gql`
  query canUseTicketInternalCode($internalCode: String!, $currentTicketId: Int) {
    ticket {
      canUseInternalCode(internalCode: $internalCode, currentTicketId: $currentTicketId)
    }
  }
`;

export function useCanUseTicketInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseTicketInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseTicketInternalCodeQuery, CanUseTicketInternalCodeQueryVariables>({
    query: CanUseTicketInternalCodeDocument,
    ...options,
  });
}
export const CreateIssueTicketDocument = gql`
  mutation createIssueTicket($input: TicketInput!) {
    ticket {
      addIssue(input: $input) {
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

export function useCreateIssueTicketMutation() {
  return Urql.useMutation<CreateIssueTicketMutation, CreateIssueTicketMutationVariables>(CreateIssueTicketDocument);
}
export const CreateOnConditionTicketDocument = gql`
  mutation createOnConditionTicket($input: AddOnTriggerChecklistTicketRangeInput!) {
    ticket {
      addOnTriggerChecklistTicketRange(input: $input) {
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

export function useCreateOnConditionTicketMutation() {
  return Urql.useMutation<CreateOnConditionTicketMutation, CreateOnConditionTicketMutationVariables>(
    CreateOnConditionTicketDocument,
  );
}
export const GetTicketDocument = gql`
  query getTicket($ticketId: Int!) {
    ticket {
      get(id: $ticketId) {
        ...TicketDetailFragment
      }
    }
  }
  ${TicketDetailFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${FacilityCatalogueTypeFragmentDoc}
  ${WorkTeamFragmentDoc}
  ${WorkerFragmentDoc}
  ${CraftFragmentDoc}
  ${QualificationLevelFragmentDoc}
  ${TicketUserFragmentDoc}
  ${QuoteHistoryEntryFragmentDoc}
  ${TicketPriceListArticleFragmentDoc}
  ${PriceListFragmentDoc}
  ${PriceListMeasurementUnitFragmentDoc}
  ${TicketHistoryEntryFragmentDoc}
  ${TicketChecklistFragmentDoc}
  ${FacilityContractFragmentDoc}
  ${PriceListDetailFragmentDoc}
`;

export function useGetTicketQuery(options: Omit<Urql.UseQueryArgs<GetTicketQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketQuery, GetTicketQueryVariables>({ query: GetTicketDocument, ...options });
}
export const UpdateTicketDocument = gql`
  mutation updateTicket($ticketId: Int!, $input: TicketInput!) {
    ticket {
      update(id: $ticketId, input: $input) {
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

export function useUpdateTicketMutation() {
  return Urql.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument);
}
export const AddTicketDocumentsDocument = gql`
  mutation addTicketDocuments($ticketId: Int!, $inputs: [DocumentInput!]!) {
    ticket {
      document {
        addRange(ticketId: $ticketId, inputs: $inputs) {
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

export function useAddTicketDocumentsMutation() {
  return Urql.useMutation<AddTicketDocumentsMutation, AddTicketDocumentsMutationVariables>(AddTicketDocumentsDocument);
}
export const DeleteTicketDocumentsDocument = gql`
  mutation deleteTicketDocuments($entityId: Int!, $cmisIds: [String!]!) {
    ticket {
      document {
        deleteRange(ticketId: $entityId, cmisIds: $cmisIds) {
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

export function useDeleteTicketDocumentsMutation() {
  return Urql.useMutation<DeleteTicketDocumentsMutation, DeleteTicketDocumentsMutationVariables>(
    DeleteTicketDocumentsDocument,
  );
}
export const UpdateTicketDocumentDocument = gql`
  mutation updateTicketDocument($ticketId: Int!, $input: DocumentInput!) {
    ticket {
      document {
        update(ticketId: $ticketId, input: $input) {
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

export function useUpdateTicketDocumentMutation() {
  return Urql.useMutation<UpdateTicketDocumentMutation, UpdateTicketDocumentMutationVariables>(
    UpdateTicketDocumentDocument,
  );
}
export const GetTicketDocumentsDocument = gql`
  query getTicketDocuments($ticketId: Int!, $where: DocumentFilterInput, $order: [DocumentSortInput!]) {
    ticket {
      get(id: $ticketId) {
        documents(where: $where, order: $order) {
          ...DocumentFragment
        }
      }
    }
  }
  ${DocumentFragmentDoc}
`;

export function useGetTicketDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketDocumentsQuery, GetTicketDocumentsQueryVariables>({
    query: GetTicketDocumentsDocument,
    ...options,
  });
}
export const GetTicketImagesDocument = gql`
  query getTicketImages($ticketId: Int!) {
    ticket {
      get(id: $ticketId) {
        images {
          ...DocumentFragment
        }
      }
    }
  }
  ${DocumentFragmentDoc}
`;

export function useGetTicketImagesQuery(options: Omit<Urql.UseQueryArgs<GetTicketImagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketImagesQuery, GetTicketImagesQueryVariables>({
    query: GetTicketImagesDocument,
    ...options,
  });
}
export const GetTicketRepliesDocument = gql`
  query getTicketReplies($ticketId: Int!) {
    ticket {
      get(id: $ticketId) {
        replies {
          ...ReplyFragment
        }
      }
    }
  }
  ${ReplyFragmentDoc}
  ${TicketUserFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetTicketRepliesQuery(options: Omit<Urql.UseQueryArgs<GetTicketRepliesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketRepliesQuery, GetTicketRepliesQueryVariables>({
    query: GetTicketRepliesDocument,
    ...options,
  });
}
export const SendTicketReplyDocument = gql`
  mutation sendTicketReply($ticketId: Int!, $comment: String, $inputs: [DocumentInput!]!) {
    ticket {
      sendReply(ticketId: $ticketId, comment: $comment, documentInputs: $inputs) {
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

export function useSendTicketReplyMutation() {
  return Urql.useMutation<SendTicketReplyMutation, SendTicketReplyMutationVariables>(SendTicketReplyDocument);
}
export const ConvertTicketToExcludedFromMaintenanceContractDocument = gql`
  mutation convertTicketToExcludedFromMaintenanceContract($ticketId: Int!) {
    ticket {
      convertToExcludedFromMaintenanceContract(ticketId: $ticketId) {
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

export function useConvertTicketToExcludedFromMaintenanceContractMutation() {
  return Urql.useMutation<
    ConvertTicketToExcludedFromMaintenanceContractMutation,
    ConvertTicketToExcludedFromMaintenanceContractMutationVariables
  >(ConvertTicketToExcludedFromMaintenanceContractDocument);
}
export const GetTicketProviderSubjectsDocument = gql`
  query getTicketProviderSubjects(
    $estateUnitId: Int!
    $catalogueItemIds: [Int!]!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: SubjectFilterInput
    $order: [SubjectSortInput!]
  ) {
    ticket {
      listAvailableProviderSubjects(
        estateUnitId: $estateUnitId
        catalogueItemIds: $catalogueItemIds
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...SubjectFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${SubjectFragmentDoc}
  ${AddressFragmentDoc}
  ${CityFragmentDoc}
  ${ContactFragmentDoc}
  ${BankAccountFragmentDoc}
`;

export function useGetTicketProviderSubjectsQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketProviderSubjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketProviderSubjectsQuery, GetTicketProviderSubjectsQueryVariables>({
    query: GetTicketProviderSubjectsDocument,
    ...options,
  });
}
export const GetTicketsPerEstateUnitsDocument = gql`
  query getTicketsPerEstateUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketFilterInput
    $order: [TicketsPerEstateUnitSortInput!]
  ) {
    ticket {
      listTicketsPerEstateUnits(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketsPerEstateUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketsPerEstateUnitFragmentDoc}
  ${FacilityContractTicketFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
`;

export function useGetTicketsPerEstateUnitsQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketsPerEstateUnitsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsPerEstateUnitsQuery, GetTicketsPerEstateUnitsQueryVariables>({
    query: GetTicketsPerEstateUnitsDocument,
    ...options,
  });
}
export const GetTicketsPerEstateUnitsPerYearsDocument = gql`
  query getTicketsPerEstateUnitsPerYears(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketFilterInput
    $order: [TicketsPerEstateUnitsPerYearSortInput!]
  ) {
    ticket {
      listTicketsPerEstateUnitsPerYears(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketsPerEstateUnitsPerYearFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketsPerEstateUnitsPerYearFragmentDoc}
  ${TicketsPerEstateUnitFragmentDoc}
  ${FacilityContractTicketFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
`;

export function useGetTicketsPerEstateUnitsPerYearsQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketsPerEstateUnitsPerYearsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsPerEstateUnitsPerYearsQuery, GetTicketsPerEstateUnitsPerYearsQueryVariables>({
    query: GetTicketsPerEstateUnitsPerYearsDocument,
    ...options,
  });
}
export const GetTicketsCalendarDocument = gql`
  query getTicketsCalendar($startDate: Date!, $endDate: Date!, $where: CalendarTicketOutputFilterInput) {
    ticket {
      listTicketsForCalendar(startDate: $startDate, endDate: $endDate, where: $where) {
        ...CalendarTicketOutputFragment
      }
    }
  }
  ${CalendarTicketOutputFragmentDoc}
`;

export function useGetTicketsCalendarQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketsCalendarQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsCalendarQuery, GetTicketsCalendarQueryVariables>({
    query: GetTicketsCalendarDocument,
    ...options,
  });
}
export const GetIssueTicketsExcludedFromMaintenanceContractStatisticsDocument = gql`
  query getIssueTicketsExcludedFromMaintenanceContractStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesExcludedFromMaintenanceContractStatistics(startDate: $startDate, endDate: $endDate) {
        excludedPercentage
        nonExcludedPercentage
      }
    }
  }
`;

export function useGetIssueTicketsExcludedFromMaintenanceContractStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsExcludedFromMaintenanceContractStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsExcludedFromMaintenanceContractStatisticsQuery,
    GetIssueTicketsExcludedFromMaintenanceContractStatisticsQueryVariables
  >({ query: GetIssueTicketsExcludedFromMaintenanceContractStatisticsDocument, ...options });
}
export const GetIssueTicketsPercentageByStatusStatisticsDocument = gql`
  query getIssueTicketsPercentageByStatusStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesPercentageByStatusStatistics(startDate: $startDate, endDate: $endDate) {
        newStatusPercentage
        assignedStatusPercentage
        inProgressStatusPercentage
        resolvedStatusPercentage
        completedStatusPercentage
      }
    }
  }
`;

export function useGetIssueTicketsPercentageByStatusStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsPercentageByStatusStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsPercentageByStatusStatisticsQuery,
    GetIssueTicketsPercentageByStatusStatisticsQueryVariables
  >({ query: GetIssueTicketsPercentageByStatusStatisticsDocument, ...options });
}
export const GetIssueTicketsPercentageByPriorityStatisticsDocument = gql`
  query getIssueTicketsPercentageByPriorityStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesPercentageByPriorityStatistics(startDate: $startDate, endDate: $endDate) {
        minorStatusPercentage
        normalStatusPercentage
        majorStatusPercentage
        criticalStatusPercentage
      }
    }
  }
`;

export function useGetIssueTicketsPercentageByPriorityStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsPercentageByPriorityStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsPercentageByPriorityStatisticsQuery,
    GetIssueTicketsPercentageByPriorityStatisticsQueryVariables
  >({ query: GetIssueTicketsPercentageByPriorityStatisticsDocument, ...options });
}
export const GetIssueTicketsPercentageByTypeStatisticsDocument = gql`
  query getIssueTicketsPercentageByTypeStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesPercentageByTypeStatistics(startDate: $startDate, endDate: $endDate) {
        key {
          id
          description
        }
        value
      }
    }
  }
`;

export function useGetIssueTicketsPercentageByTypeStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsPercentageByTypeStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsPercentageByTypeStatisticsQuery,
    GetIssueTicketsPercentageByTypeStatisticsQueryVariables
  >({ query: GetIssueTicketsPercentageByTypeStatisticsDocument, ...options });
}
export const GetIssueTicketsCountByStatusStatisticsDocument = gql`
  query getIssueTicketsCountByStatusStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesCountByStatusStatistics(startDate: $startDate, endDate: $endDate) {
        newStatusCount
        assignedStatusCount
        inProgressStatusCount
        resolvedStatusCount
        completedStatusCount
      }
    }
  }
`;

export function useGetIssueTicketsCountByStatusStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsCountByStatusStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsCountByStatusStatisticsQuery,
    GetIssueTicketsCountByStatusStatisticsQueryVariables
  >({ query: GetIssueTicketsCountByStatusStatisticsDocument, ...options });
}
export const GetTicketsCountStatisticsDocument = gql`
  query getTicketsCountStatistics($where: TicketFilterInput) {
    ticket {
      listTickets(where: $where) {
        totalCount
      }
    }
  }
`;

export function useGetTicketsCountStatisticsQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketsCountStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsCountStatisticsQuery, GetTicketsCountStatisticsQueryVariables>({
    query: GetTicketsCountStatisticsDocument,
    ...options,
  });
}
export const GetChecklistTicketsCountLineChartDocument = gql`
  query getChecklistTicketsCountLineChart($startDate: Date!, $endDate: Date!, $chartType: LineChartType!) {
    ticket {
      checklistTicketsCountLineChart(startDate: $startDate, endDate: $endDate, chartType: $chartType) {
        daily {
          date
          dataPoint {
            ...ChecklistTicketsCountLineChartDataPointFragment
          }
        }
        weekly {
          week
          dataPoint {
            ...ChecklistTicketsCountLineChartDataPointFragment
          }
        }
        monthly {
          month
          dataPoint {
            ...ChecklistTicketsCountLineChartDataPointFragment
          }
        }
      }
    }
  }
  ${ChecklistTicketsCountLineChartDataPointFragmentDoc}
`;

export function useGetChecklistTicketsCountLineChartQuery(
  options: Omit<Urql.UseQueryArgs<GetChecklistTicketsCountLineChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetChecklistTicketsCountLineChartQuery, GetChecklistTicketsCountLineChartQueryVariables>({
    query: GetChecklistTicketsCountLineChartDocument,
    ...options,
  });
}
export const GetIssueTicketsExcludedFromMaintenanceContractLineChartDocument = gql`
  query getIssueTicketsExcludedFromMaintenanceContractLineChart(
    $startDate: Date!
    $endDate: Date!
    $chartType: LineChartType!
  ) {
    ticket {
      issuesExcludedFromMaintenanceContractLineChart(startDate: $startDate, endDate: $endDate, chartType: $chartType) {
        daily {
          date
          dataPoint {
            ...IssuesExcludedFromMaintenanceContractLineChartDataPointFragment
          }
        }
        weekly {
          week
          dataPoint {
            ...IssuesExcludedFromMaintenanceContractLineChartDataPointFragment
          }
        }
        monthly {
          month
          dataPoint {
            ...IssuesExcludedFromMaintenanceContractLineChartDataPointFragment
          }
        }
      }
    }
  }
  ${IssuesExcludedFromMaintenanceContractLineChartDataPointFragmentDoc}
`;

export function useGetIssueTicketsExcludedFromMaintenanceContractLineChartQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsExcludedFromMaintenanceContractLineChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsExcludedFromMaintenanceContractLineChartQuery,
    GetIssueTicketsExcludedFromMaintenanceContractLineChartQueryVariables
  >({ query: GetIssueTicketsExcludedFromMaintenanceContractLineChartDocument, ...options });
}
export const GetIssueTicketsStatusLineChartDocument = gql`
  query getIssueTicketsStatusLineChart($startDate: Date!, $endDate: Date!, $chartType: LineChartType!) {
    ticket {
      issuesStatusLineChart(startDate: $startDate, endDate: $endDate, chartType: $chartType) {
        daily {
          date
          dataPoint {
            ...IssuesStatusLineChartDataPointFragment
          }
        }
        weekly {
          week
          dataPoint {
            ...IssuesStatusLineChartDataPointFragment
          }
        }
        monthly {
          month
          dataPoint {
            ...IssuesStatusLineChartDataPointFragment
          }
        }
      }
    }
  }
  ${IssuesStatusLineChartDataPointFragmentDoc}
`;

export function useGetIssueTicketsStatusLineChartQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsStatusLineChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetIssueTicketsStatusLineChartQuery, GetIssueTicketsStatusLineChartQueryVariables>({
    query: GetIssueTicketsStatusLineChartDocument,
    ...options,
  });
}
export const GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsDocument = gql`
  query getChecklistTicketsMandatoryByLawPerformedActivitiesStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      checklistTicketsMandatoryByLawPerformedActivitiesStatistics(startDate: $startDate, endDate: $endDate) {
        key
        value
      }
    }
  }
`;

export function useGetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<
    GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQuery,
    GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsQueryVariables
  >({ query: GetChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsDocument, ...options });
}
export const GetChecklistTicketsMandatoryByLawStatusStatisticsDocument = gql`
  query getChecklistTicketsMandatoryByLawStatusStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      mandatoryByLawChecklistTicketsStatusStatistics(startDate: $startDate, endDate: $endDate) {
        donePercentage
        expiredPercentage
        scheduledPercentage
      }
    }
  }
`;

export function useGetChecklistTicketsMandatoryByLawStatusStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetChecklistTicketsMandatoryByLawStatusStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetChecklistTicketsMandatoryByLawStatusStatisticsQuery,
    GetChecklistTicketsMandatoryByLawStatusStatisticsQueryVariables
  >({ query: GetChecklistTicketsMandatoryByLawStatusStatisticsDocument, ...options });
}
export const GetChecklistTicketsMandatoryByLawDocument = gql`
  query getChecklistTicketsMandatoryByLaw($startDate: Date!, $endDate: Date!) {
    ticket {
      listTickets(
        first: 5
        order: [{ dueDate: ASC }]
        where: {
          mainType: { in: [CHECKLIST_ON_TRIGGER_CONDITION, CHECKLIST_PREVENTATIVE] }
          isMandatoryByLaw: { eq: true }
          masterStatus: { neq: COMPLETED }
          dueDate: { gte: $startDate, lte: $endDate }
        }
      ) {
        nodes {
          id
          internalCode
          dueDate
          catalogueType {
            id
            name
          }
        }
      }
    }
  }
`;

export function useGetChecklistTicketsMandatoryByLawQuery(
  options: Omit<Urql.UseQueryArgs<GetChecklistTicketsMandatoryByLawQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetChecklistTicketsMandatoryByLawQuery, GetChecklistTicketsMandatoryByLawQueryVariables>({
    query: GetChecklistTicketsMandatoryByLawDocument,
    ...options,
  });
}
export const GetIssueTicketsAverageResolutionDurationByStatusStatisticsDocument = gql`
  query getIssueTicketsAverageResolutionDurationByStatusStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesAverageResolutionDurationByStatusStatistics(startDate: $startDate, endDate: $endDate) {
        newDuration
        assignedDuration
        inProgressDuration
        resolvedDuration
        completedDuration
      }
    }
  }
`;

export function useGetIssueTicketsAverageResolutionDurationByStatusStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsAverageResolutionDurationByStatusStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsAverageResolutionDurationByStatusStatisticsQuery,
    GetIssueTicketsAverageResolutionDurationByStatusStatisticsQueryVariables
  >({ query: GetIssueTicketsAverageResolutionDurationByStatusStatisticsDocument, ...options });
}
export const GetTicketsTypeLineChartDocument = gql`
  query getTicketsTypeLineChart($startDate: Date!, $endDate: Date!, $chartType: LineChartType!) {
    ticket {
      ticketsTypeLineChart(startDate: $startDate, endDate: $endDate, chartType: $chartType) {
        daily {
          date
          dataPoint {
            ...TicketsTypeLineChartDataPointFragment
          }
        }
        weekly {
          week
          dataPoint {
            ...TicketsTypeLineChartDataPointFragment
          }
        }
        monthly {
          month
          dataPoint {
            ...TicketsTypeLineChartDataPointFragment
          }
        }
      }
    }
  }
  ${TicketsTypeLineChartDataPointFragmentDoc}
`;

export function useGetTicketsTypeLineChartQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketsTypeLineChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsTypeLineChartQuery, GetTicketsTypeLineChartQueryVariables>({
    query: GetTicketsTypeLineChartDocument,
    ...options,
  });
}
export const GetTicketsCountMonthlyChartDocument = gql`
  query getTicketsCountMonthlyChart($years: [Int!]!) {
    ticket {
      ticketsCountMonthlyChart(years: $years) {
        year
        month
        dataPoint {
          ticketsCount
        }
      }
    }
  }
`;

export function useGetTicketsCountMonthlyChartQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketsCountMonthlyChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsCountMonthlyChartQuery, GetTicketsCountMonthlyChartQueryVariables>({
    query: GetTicketsCountMonthlyChartDocument,
    ...options,
  });
}
export const GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsDocument = gql`
  query getTicketsExcludedFromMaintenanceContractExpensesPercentageStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      ticketAmountPercentageByIsExcludedFromMaintenanceContractStatistics(startDate: $startDate, endDate: $endDate) {
        excludedAmountPercentage
        nonExcludedAmountPercentage
      }
    }
  }
`;

export function useGetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<
    GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQuery,
    GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQueryVariables
  >({ query: GetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsDocument, ...options });
}
export const GetTicketsExcludedFromMaintenanceContractExpensesLineChartDocument = gql`
  query getTicketsExcludedFromMaintenanceContractExpensesLineChart(
    $startDate: Date!
    $endDate: Date!
    $chartType: LineChartType!
  ) {
    ticket {
      ticketsAmountLineChart(startDate: $startDate, endDate: $endDate, chartType: $chartType) {
        daily {
          date
          dataPoint {
            ...TicketsAmountChartDataPointFragment
          }
        }
        weekly {
          week
          dataPoint {
            ...TicketsAmountChartDataPointFragment
          }
        }
        monthly {
          month
          dataPoint {
            ...TicketsAmountChartDataPointFragment
          }
        }
      }
    }
  }
  ${TicketsAmountChartDataPointFragmentDoc}
`;

export function useGetTicketsExcludedFromMaintenanceContractExpensesLineChartQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketsExcludedFromMaintenanceContractExpensesLineChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetTicketsExcludedFromMaintenanceContractExpensesLineChartQuery,
    GetTicketsExcludedFromMaintenanceContractExpensesLineChartQueryVariables
  >({ query: GetTicketsExcludedFromMaintenanceContractExpensesLineChartDocument, ...options });
}
export const GetTicketsTotalExpensesMonthlyChartDocument = gql`
  query getTicketsTotalExpensesMonthlyChart($years: [Int!]!) {
    ticket {
      ticketsTotalAmountMonthlyChart(years: $years) {
        year
        month
        dataPoint {
          totalAmount
        }
      }
    }
  }
`;

export function useGetTicketsTotalExpensesMonthlyChartQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketsTotalExpensesMonthlyChartQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketsTotalExpensesMonthlyChartQuery, GetTicketsTotalExpensesMonthlyChartQueryVariables>({
    query: GetTicketsTotalExpensesMonthlyChartDocument,
    ...options,
  });
}
export const GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsDocument = gql`
  query getTicketsExcludedFromMaintenanceContractTotalExpensesStatistics {
    ticket {
      yearlyTicketAmountStatistics {
        totalAmount
        totalAmountTrend
        excludedAmount
        excludedAmountTrend
        nonExcludedAmount
        nonExcludedAmountTrend
      }
    }
  }
`;

export function useGetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<
    GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQuery,
    GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQueryVariables
  >({ query: GetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsDocument, ...options });
}
export const GetIssueTicketsSlaRespectingPercentageStatisticsDocument = gql`
  query getIssueTicketsSLARespectingPercentageStatistics($startDate: Date!, $endDate: Date!) {
    ticket {
      issuesSLARespectingPercentageStatistics(startDate: $startDate, endDate: $endDate) {
        respectingPercentage
        notRespectingPercentage
      }
    }
  }
`;

export function useGetIssueTicketsSlaRespectingPercentageStatisticsQuery(
  options: Omit<Urql.UseQueryArgs<GetIssueTicketsSlaRespectingPercentageStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetIssueTicketsSlaRespectingPercentageStatisticsQuery,
    GetIssueTicketsSlaRespectingPercentageStatisticsQueryVariables
  >({ query: GetIssueTicketsSlaRespectingPercentageStatisticsDocument, ...options });
}

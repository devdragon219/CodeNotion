import {
  PerformedActivityStatus,
  Priority,
  QuoteMasterStatus,
  TicketMainType,
  TicketMasterStatus,
} from '@realgimm5/frontend-common/gql/types';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { FacilityContractFragment } from '../../gql/RealGimm.Web.FacilityContract.fragment';
import { TicketPriceListArticleFragment } from '../../gql/RealGimm.Web.PriceListArticle.fragment';
import { QuoteHistoryEntryFragment } from '../../gql/RealGimm.Web.QuoteHistoryEntry.fragment';
import { TicketChecklistFragment } from '../../gql/RealGimm.Web.TicketChecklist.fragment';
import { TicketHistoryEntryFragment } from '../../gql/RealGimm.Web.TicketHistoryEntry.fragment';
import { CatalogueItemFieldValue } from '../FieldValues/CatalogueItem';
import { PriceListMeasurementUnitFieldValue } from '../FieldValues/PriceListMeasurementUnit';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { TicketTypeFieldValue } from '../FieldValues/TicketType';
import { UserFieldValue } from '../FieldValues/User';
import { WorkTeamFieldValue } from '../FieldValues/WorkTeam';
import { CatalogueCategoryFormInput, CatalogueSubCategoryFormInput } from './CatalogueCategory';
import { CatalogueTypeFormInput } from './CatalogueType';
import { FloorFormInput } from './Floor';
import { WorkerFormInput } from './Worker';

export interface TicketPerformedActivityFormInput {
  activityId: number;
  name: string;
  ordering: number;
  status: PerformedActivityStatus;
}

export interface TicketQuoteArticleFormInput {
  articleId: number | null;
  guid: string;
  internalCode: string;
  isExcluded: boolean;
  measurementUnit: PriceListMeasurementUnitFieldValue | null;
  name: string;
  quantity: number | null;
  sourceArticle: TicketPriceListArticleFragment | null;
  unitPrice: number | null;
}

export interface TicketQuoteFormInput {
  articles: TicketQuoteArticleFormInput[];
  classifications: string;
  externalCode: string;
  history: QuoteHistoryEntryFragment[];
  interventionDueDate: Date | null;
  isFrameworkAgreement: boolean;
  masterStatus: QuoteMasterStatus | null;
  notes: string;
  orderNumber: string;
}

export interface TicketReminderFormInput {
  date: Date | null;
  reminderId: number | null;
  summary: string;
}

export interface TicketResolutionFormInput {
  closure: Date | null;
  diagnosis: string;
  interventionEnd: Date | null;
  interventionStart: Date | null;
  notes: string;
  operationsPerformed: string;
  partsAndSupplies: string;
}

export interface TicketFormInput {
  catalogueCategory: CatalogueCategoryFormInput | null;
  catalogueItems: CatalogueItemFieldValue[];
  catalogueSubCategory: CatalogueSubCategoryFormInput | null;
  catalogueType: CatalogueTypeFormInput | null;
  customType: TicketTypeFieldValue | null;
  description: string;
  documents: DocumentFormInput[];
  dueDate: Date | null;
  facilityContract: FacilityContractFragment | null;
  history: TicketHistoryEntryFragment[];
  images: DocumentFormInput[];
  internalCode: string;
  isExcludedFromMaintenanceContract: boolean;
  isWorkSafetyExpected: boolean;
  locationEstateUnit: EstateUnitFragment | null;
  locationFloor: FloorFormInput | null;
  locationSector: string;
  locationRoom: string;
  mainType: TicketMainType;
  masterStatus: TicketMasterStatus | null;
  performedActivities: TicketPerformedActivityFormInput[];
  plannedTeam: WorkTeamFieldValue | null;
  plannedTeamLeaderUser: UserFieldValue | null;
  priority: Priority | null;
  quote: TicketQuoteFormInput;
  reminders: TicketReminderFormInput[];
  requestDateTime: Date | null;
  requestor: string;
  requestorContactEmail: string;
  requestorContactPhone: string;
  resolution: TicketResolutionFormInput;
  summary: string;
  supplierSubject: SubjectFieldValue | null;
  ticketChecklist: TicketChecklistFragment | null;
  ticketId: number | null;
  workers: WorkerFormInput[];
  workOrderReference: string;
}

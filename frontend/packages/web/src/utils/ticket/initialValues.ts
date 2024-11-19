import { QuoteMasterStatus, TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';

import { TicketPriceListArticleFragment } from '../../gql/RealGimm.Web.PriceListArticle.fragment';
import {
  TicketFormInput,
  TicketQuoteArticleFormInput,
  TicketReminderFormInput,
} from '../../interfaces/FormInputs/Ticket';

export const getEmptyTicketQuoteArticleFormInput = (
  sourceArticle: TicketPriceListArticleFragment | null = null,
): TicketQuoteArticleFormInput => ({
  articleId: null,
  guid: crypto.randomUUID(),
  internalCode: '',
  isExcluded: false,
  measurementUnit: null,
  name: '',
  quantity: null,
  sourceArticle,
  unitPrice: null,
});

export const getEmptyTicketReminderFormInput = (): TicketReminderFormInput => ({
  date: null,
  reminderId: null,
  summary: '',
});

export const getEmptyTicketFormInput = (mainType: TicketMainType): TicketFormInput => ({
  catalogueCategory: null,
  catalogueItems: [],
  catalogueSubCategory: null,
  catalogueType: null,
  customType: null,
  description: '',
  documents: [],
  dueDate: null,
  facilityContract: null,
  history: [],
  images: [],
  internalCode: '',
  isExcludedFromMaintenanceContract: false,
  isWorkSafetyExpected: false,
  locationEstateUnit: null,
  locationFloor: null,
  locationSector: '',
  locationRoom: '',
  mainType,
  masterStatus: TicketMasterStatus.New,
  quote: {
    articles: [],
    classifications: '',
    externalCode: '',
    history: [],
    interventionDueDate: null,
    isFrameworkAgreement: false,
    masterStatus: QuoteMasterStatus.New,
    notes: '',
    orderNumber: '',
  },
  performedActivities: [],
  plannedTeam: null,
  plannedTeamLeaderUser: null,
  priority: null,
  reminders: [],
  requestDateTime: null,
  requestor: '',
  requestorContactEmail: '',
  requestorContactPhone: '',
  resolution: {
    closure: null,
    diagnosis: '',
    interventionEnd: null,
    interventionStart: null,
    notes: '',
    operationsPerformed: '',
    partsAndSupplies: '',
  },
  summary: '',
  supplierSubject: null,
  ticketChecklist: null,
  ticketId: null,
  workers: [],
  workOrderReference: '',
});

import { QuoteMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { TicketDetailFragment } from '../../gql/RealGimm.Web.Ticket.fragment';
import { TicketFormInput } from '../../interfaces/FormInputs/Ticket';
import {
  parseCatalogueCategoryToCatalogueCategoryFormInput,
  parseCatalogueSubCategoryToCatalogueSubCategoryFormInput,
} from '../catalogueCategory/parseCatalogueCategoryFragment';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../catalogueType/parseCatalogueTypeFragment';
import { parseFloorToFloorFormInput } from '../components/floorField/parseFloorFragment';
import { parseWorkerToWorkerFormInput } from '../components/worker/parseWorkerFragment';
import { parseUserToUserFieldValue } from '../user/parseUserFragment';

export const parseTicketToTicketFormInput = (ticket: TicketDetailFragment): TicketFormInput => ({
  catalogueCategory: parseCatalogueCategoryToCatalogueCategoryFormInput(ticket.catalogueType.category),
  catalogueItems: ticket.catalogueItems,
  catalogueSubCategory: ticket.catalogueType.subCategory
    ? parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(ticket.catalogueType.subCategory)
    : null,
  catalogueType: parseCatalogueTypeToCatalogueTypeFormInput(ticket.catalogueType),
  customType: ticket.customType ?? null,
  description: ticket.description ?? '',
  documents: [],
  dueDate: parseStringToDate(ticket.dueDate),
  facilityContract: ticket.contract ?? null,
  history: ticket.history,
  images: [],
  internalCode: ticket.internalCode,
  isExcludedFromMaintenanceContract: ticket.isExcludedFromMaintenanceContract,
  isWorkSafetyExpected: ticket.isWorkSafetyExpected,
  locationEstateUnit: ticket.locationEstateUnit,
  locationFloor: ticket.locationFloor ? parseFloorToFloorFormInput(ticket.locationFloor) : null,
  locationSector: ticket.locationSector ?? '',
  locationRoom: ticket.locationRoom ?? '',
  mainType: ticket.mainType,
  masterStatus: ticket.masterStatus,
  performedActivities: ticket.performedActivities.map((activity) => ({
    activityId: activity.id,
    name: activity.name,
    ordering: activity.ordering,
    status: activity.status,
  })),
  plannedTeam: ticket.plannedTeam
    ? {
        description: ticket.plannedTeam.description,
        id: ticket.plannedTeam.id,
        leaderUser: parseUserToUserFieldValue(ticket.plannedTeam.leaderUser),
        workers: ticket.plannedTeam.workers.map(parseWorkerToWorkerFormInput),
      }
    : null,
  plannedTeamLeaderUser: ticket.plannedTeamLeaderUser ? parseUserToUserFieldValue(ticket.plannedTeamLeaderUser) : null,
  priority: ticket.priority,
  quote: {
    articles:
      ticket.quote?.articles
        .sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        .map((article) => ({
          articleId: article.id,
          guid: crypto.randomUUID(),
          internalCode: article.internalCode,
          isExcluded: article.isExcluded,
          measurementUnit: article.measurementUnit,
          name: article.name,
          quantity: article.quantity,
          sourceArticle: article.sourceArticle ?? null,
          unitPrice: article.unitPrice,
        })) ?? [],
    classifications: ticket.quote?.classifications ?? '',
    externalCode: ticket.quote?.externalCode ?? '',
    history: ticket.quote?.history ?? [],
    interventionDueDate: parseStringToDate(ticket.quote?.interventionDueDate),
    isFrameworkAgreement: ticket.quote?.isFrameworkAgreement ?? false,
    masterStatus: ticket.quote?.masterStatus ?? QuoteMasterStatus.New,
    notes: ticket.quote?.notes ?? '',
    orderNumber: ticket.quote?.orderNumber ?? '',
  },
  reminders: ticket.reminders.map((reminder) => ({
    date: parseStringToDate(reminder.date),
    reminderId: reminder.id,
    summary: reminder.summary,
  })),
  requestDateTime: parseStringToDate(ticket.requestDateTime),
  requestor: ticket.requestor ?? '',
  requestorContactEmail: ticket.requestorContactEmail ?? '',
  requestorContactPhone: ticket.requestorContactPhone ?? '',
  resolution: {
    closure: parseStringToDate(ticket.resolution?.closure),
    diagnosis: ticket.resolution?.diagnosis ?? '',
    interventionEnd: parseStringToDate(ticket.resolution?.interventionEnd),
    interventionStart: parseStringToDate(ticket.resolution?.interventionStart),
    notes: ticket.resolution?.resolutionNotes ?? '',
    operationsPerformed: ticket.resolution?.operationsPerformed ?? '',
    partsAndSupplies: ticket.resolution?.partsAndSupplies ?? '',
  },
  summary: ticket.summary ?? '',
  supplierSubject: ticket.supplierSubject,
  ticketChecklist: ticket.checklist ?? null,
  ticketId: ticket.id,
  workers: ticket.workers.map(parseWorkerToWorkerFormInput),
  workOrderReference: ticket.workOrderReference ?? '',
});

import { FormMode } from '@realgimm5/frontend-common/enums';
import { AddOnTriggerChecklistTicketRangeInput, TicketInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { TicketFormInput } from '../../interfaces/FormInputs/Ticket';
import { parseWorkerFormInputToWorkerInput } from '../components/worker/parseWorkerFormInput';

export const parseTicketFormInputToTicketInput = (ticket: TicketFormInput, mode: FormMode): TicketInput => ({
  catalogueItemIds: ticket.catalogueItems.map(({ id }) => id),
  catalogueTypeId: ticket.catalogueType!.catalogueTypeId!,
  customTypeId: ticket.customType?.id,
  description: getStringOrNull(ticket.description),
  dueDate: parseDateToString(ticket.dueDate)!,
  internalCode: ticket.internalCode,
  isWorkSafetyExpected: ticket.isWorkSafetyExpected,
  locationEstateUnitId: ticket.locationEstateUnit!.id,
  locationFloorId: ticket.locationFloor?.floorId,
  locationRoom: getStringOrNull(ticket.locationRoom),
  locationSector: getStringOrNull(ticket.locationSector),
  masterStatus: ticket.masterStatus!,
  performedActivityInputs: ticket.performedActivities.map((activity) => ({
    id: activity.activityId,
    status: activity.status,
  })),
  plannedTeamId: ticket.plannedTeam?.id,
  plannedTeamLeaderUserId: ticket.plannedTeamLeaderUser?.id,
  priority: ticket.priority!,
  quote:
    mode === FormMode.Edit && ticket.isExcludedFromMaintenanceContract
      ? {
          articles: ticket.quote.articles.map((article, index) => ({
            id: article.articleId,
            internalCode: article.internalCode,
            isExcluded: article.isExcluded,
            measurementUnitId: article.measurementUnit!.id,
            name: article.name,
            ordering: index,
            quantity: article.quantity!,
            sourceArticleId: article.sourceArticle?.id,
            unitPrice: article.unitPrice!,
          })),
          classifications: getStringOrNull(ticket.quote.classifications),
          externalCode: getStringOrNull(ticket.quote.externalCode),
          interventionDueDate: parseDateToString(ticket.quote.interventionDueDate)!,
          isFrameworkAgreement: ticket.quote.isFrameworkAgreement,
          masterStatus: ticket.quote.masterStatus!,
          notes: getStringOrNull(ticket.quote.notes),
          orderNumber: getStringOrNull(ticket.quote.orderNumber),
        }
      : undefined,
  reminders: ticket.reminders.map((reminder) => ({
    date: parseDateToString(reminder.date)!,
    id: reminder.reminderId,
    summary: reminder.summary,
  })),
  requestDateTime: parseDateToString(ticket.requestDateTime, 'complete')!,
  requestor: getStringOrNull(ticket.requestor),
  requestorContactEmail: getStringOrNull(ticket.requestorContactEmail),
  requestorContactPhone: getStringOrNull(ticket.requestorContactPhone),
  resolution: {
    closure: parseDateToString(ticket.resolution.closure),
    diagnosis: getStringOrNull(ticket.resolution.diagnosis),
    interventionEnd: parseDateToString(ticket.resolution.interventionEnd),
    interventionStart: parseDateToString(ticket.resolution.interventionStart),
    operationsPerformed: getStringOrNull(ticket.resolution.operationsPerformed),
    partsAndSupplies: getStringOrNull(ticket.resolution.partsAndSupplies),
    resolutionNotes: getStringOrNull(ticket.resolution.notes),
  },
  summary: getStringOrNull(ticket.summary),
  supplierSubjectId: ticket.supplierSubject!.id,
  workOrderReference: getStringOrNull(ticket.workOrderReference),
  workers: ticket.workers.map(parseWorkerFormInputToWorkerInput),
});

export const parseTicketFormInputToOnConditionTicketInput = (
  ticket: TicketFormInput,
): AddOnTriggerChecklistTicketRangeInput => ({
  catalogueItemIds: ticket.catalogueItems.map(({ id }) => id),
  contractId: ticket.facilityContract!.id,
  ticketChecklistId: ticket.ticketChecklist!.id,
});

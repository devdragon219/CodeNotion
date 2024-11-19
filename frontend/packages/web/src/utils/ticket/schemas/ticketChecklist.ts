import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getTicketTicketChecklistSchema = (t: TFunction) =>
  object().shape({
    ticketChecklist: object()
      .nullable()
      .when('mainType', {
        is: TicketMainType.ChecklistOnTriggerCondition,
        then: (schema) => schema.required(t('ticket.error.no_ticket_checklist_selected')),
      }),
  });

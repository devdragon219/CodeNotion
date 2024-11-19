import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getTicketChecklistOnConditionMaintenanceSchema = (
  t: TFunction,
  type: TicketChecklistTemplateType | null = TicketChecklistTemplateType.OnTriggerCondition,
) =>
  object().shape({
    ...(type &&
    [
      TicketChecklistTemplateType.OnTriggerCondition,
      TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
    ].includes(type)
      ? {
          onCondition: object().shape({
            activities: array().min(1, t('ticket_checklist.error.no_selected_activities')),
          }),
        }
      : {}),
  });

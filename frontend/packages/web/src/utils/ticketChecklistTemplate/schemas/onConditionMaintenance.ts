import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getTicketChecklistTemplateOnConditionMaintenanceSchema = (
  t: TFunction,
  validate: 'all' | 'activities' | 'fields' = 'all',
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
            ...(['all', 'fields'].includes(validate)
              ? {
                  interventionType: object().required(
                    getRequiredTranslation('ticket_checklist_template.field.intervention_type', t),
                  ),
                  craft: object().required(getRequiredTranslation('ticket_checklist_template.field.craft', t)),
                }
              : {}),
            ...(['all', 'activities'].includes(validate)
              ? {
                  activities: array().min(1, t('ticket_checklist_template.error.no_selected_activities')),
                }
              : {}),
          }),
        }
      : {}),
  });

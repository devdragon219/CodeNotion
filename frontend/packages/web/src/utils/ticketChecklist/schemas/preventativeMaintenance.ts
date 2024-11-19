import { PlannedPeriod, TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getTicketChecklistPreventativeMaintenanceSchema = (
  t: TFunction,
  type: TicketChecklistTemplateType | null = TicketChecklistTemplateType.Preventative,
) =>
  object().shape({
    ...(type &&
    [TicketChecklistTemplateType.Preventative, TicketChecklistTemplateType.PreventativeAndOnTriggerCondition].includes(
      type,
    )
      ? {
          preventative: object().shape({
            plannedPeriod: string().required(
              getRequiredTranslation('ticket_checklist_template.field.planned_period', t),
            ),
            daysOfWeek: array().when('plannedPeriod', {
              is: PlannedPeriod.Midweek,
              then: (schema) => schema.min(1, t('ticket_checklist_template.error.no_selected_days_of_week')),
            }),
            toleranceDays: number().required(
              getRequiredTranslation('ticket_checklist_template.field.tolerance_days', t),
            ),
            activities: array().min(1, t('ticket_checklist_template.error.no_selected_activities')),
          }),
        }
      : {}),
  });

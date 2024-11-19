import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getTicketChecklistTemplateCostsSchema = (t: TFunction) =>
  object().shape({
    costBaseFactor: string().required(getRequiredTranslation('ticket_checklist_template.field.measurement_unit', t)),
    rawWorkCost: number().required(getRequiredTranslation('ticket_checklist_template.field.raw_work_cost', t)),
    safetyCost: number().required(getRequiredTranslation('ticket_checklist_template.field.safety_cost', t)),
  });
